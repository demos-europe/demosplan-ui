import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import DpLinkedBoilerplate from './../DpLinkedBoilerplate.vue'
import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model'
import { GapCursor } from '@tiptap/pm/gapcursor'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

/**
 * Whether a resolved position sits inside a boilerplate node. Walks the ancestor chain
 * instead of `editor.isActive()`, which also reports true at a node boundary and
 * previously blocked navigation right next to a boilerplate.
 *
 * @param {ResolvedPos} $pos
 * @param {String} nodeName
 * @return {Boolean}
 */
const isInsideBoilerplate = ($pos, nodeName) => {
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === nodeName) {
      return true
    }
  }

  return false
}

/**
 * Whether a boilerplate with this id is already linked anywhere in the document. Inserting
 * the same one twice makes no sense from a usage perspective (BE-Plan Decision 13) — the
 * backend model tolerates it (the relation just dedups), but there is no reason to allow it.
 *
 * @param {Node} doc
 * @param {String} nodeName
 * @param {String} boilerplateId
 * @return {Boolean}
 */
const isAlreadyLinked = (doc, nodeName, boilerplateId) => {
  let found = false

  doc.descendants(node => {
    if (node.type.name !== nodeName) {
      return true
    }

    if (node.attrs.boilerplateId === boilerplateId) {
      found = true
    }

    // Boilerplates never nest, so there is nothing worth checking inside this one.
    return false
  })

  return found
}

/**
 * Wraps boilerplate text in a node carrying its id, so the link survives saving and
 * reloading. A node, not a mark: boilerplate texts contain whole paragraphs/lists, and a
 * mark can only decorate text inside a single textblock.
 */
export default Node.create({
  name: 'boilerplate',

  // Sits next to paragraphs and lists at the top level of the document.
  group: 'block',

  /*
   * Holds real block nodes rather than an HTML string in an attribute. That keeps the text
   * visible to everything that consumes the saved HTML — exports, search indexing — and makes
   * unlinking a plain structural change (drop the wrapper, keep the paragraphs).
   */
  content: 'block+',

  /*
   * Both flags give Gapcursor a valid cursor position directly before/after this block,
   * without a real paragraph sitting there. isolating: without it, deleting the paragraph
   * between two boilerplates would merge them and silently drop one id. selectable: false
   * makes a click next to the block place a caret instead of a node selection (whole-node
   * deletion is out of scope for DPLAN-18271).
   */
  isolating: true,

  selectable: false,

  addAttributes() {
    return {
      boilerplateId: {
        default: null,
        keepOnSplit: false,
        // Not a `data-*` attribute, so `.dataset` wouldn't see it — read it explicitly instead.
        parseHTML: element => element.getAttribute('boilerplate-id'),
        renderHTML: attributes => ({
          'boilerplate-id': attributes.boilerplateId,
        }),
      },
    }
  },

  /**
   * Configuration the consuming app injects via `Boilerplate.configure({ … })`, since the
   * library has no access to demosplan's store/translations. getBoilerplateTitle resolves
   * an id to a title on every render rather than storing it (it would go stale — DPLAN-18150
   * can even re-link the id). onUnlinkRequest fires when the user clicks the pencil.
   */
  addOptions() {
    return {
      getBoilerplateTitle: () => '',
      onUnlinkRequest: () => {},
    }
  },

  /*
   * Rejects transactions that would change content inside a boilerplate node. Not done via
   * `contenteditable="false"`: that breaks native cursor placement right after the node
   * (e.g. as the doc's last node). Commands that legitimately restructure a boilerplate
   * (e.g. unlinking) bypass this via `tr.setMeta('boilerplateEdit', true)`.
   */
  addProseMirrorPlugins () {
    const nodeName = this.name

    return [
      new Plugin({
        key: new PluginKey('boilerplateProtection'),

        filterTransaction (tr) {
          if (!tr.docChanged || tr.getMeta('boilerplateEdit')) {
            return true
          }

          /*
           * Undo/redo transactions are trusted: anything violating this protection would
           * have been rejected here when first attempted, so it can't be in the history
           * stack. 'history$' is prosemirror-history's internal meta key for these.
           */
          if (tr.getMeta('history$')) {
            return true
          }

          let touchesProtectedContent = false

          /*
           * A transaction is a list of steps; for each, `tr.docs[index]` gives the doc before
           * that step and `step.getMap()` gives its changed range. If a boilerplate node lies
           * in that range, the edit reaches into protected content.
           */
          tr.steps.forEach((step, index) => {
            const docBefore = tr.docs[index]

            step.getMap().forEach((oldStart, oldEnd) => {
              docBefore.nodesBetween(oldStart, oldEnd, node => {
                if (node.type.name === nodeName) {
                  touchesProtectedContent = true
                }
              })
            })
          })

          return !touchesProtectedContent
        },

        props: {
          /*
           * `filterTransaction` alone rejects the change, but the browser already wrote the
           * character into the DOM, so it stays visible while absent from the document.
           * Refusing the input here prevents that DOM/doc mismatch.
           */
          handleTextInput (view, from) {
            return isInsideBoilerplate(view.state.doc.resolve(from), nodeName)
          },
        },
      }),
    ]
  },

  /*
   * Uses `insertContent` rather than raw `tr.insert()`: at a hand-computed position, a cursor
   * in an empty paragraph would get split incorrectly and the trailing paragraph would end up
   * nested inside the boilerplate instead of after it. `insertContent` splits correctly; the
   * cursor position afterwards is fixed up below.
   */
  addCommands () {
    return {
      insertBoilerplate: ({ boilerplateId, html }) => ({ editor, chain }) => {
        /*
         * Boilerplates must not be nested. The `boilerplateEdit` meta below lifts the
         * protection for this transaction, which would otherwise let an insertion land
         * inside an existing boilerplate — so refuse that case explicitly here.
         */
        if (isInsideBoilerplate(editor.state.selection.$from, this.name)) {
          return false
        }

        if (isAlreadyLinked(editor.state.doc, this.name, boilerplateId)) {
          return false
        }

        /*
         * The boilerplate arrives as an HTML string. Parse it through the editor's schema so
         * it becomes real paragraph nodes that can be nested into the boilerplate node —
         * `toJSON()` because insertContent below takes plain node descriptions.
         */
        const wrapper = document.createElement('div')
        wrapper.innerHTML = html
        const content = ProseMirrorDOMParser.fromSchema(editor.schema).parse(wrapper).content.toJSON()

        return chain()
          /*
           * Our own controlled insertion — not a user edit inside existing protected
           * content, so it bypasses the filterTransaction guard above.
           */
          .command(({ tr }) => {
            tr.setMeta('boilerplateEdit', true)

            return true
          })
          .insertContent({ type: this.name, attrs: { boilerplateId }, content })
          /*
           * `insertContent` ends with `Selection.near`, landing *inside* the boilerplate where
           * typing is blocked — move the caret to the gap right behind the node instead. No
           * trailing paragraph is added for this: it would end up in the saved HTML and as an
           * empty line in every DOCX/PDF export.
           */
          .command(({ dispatch, tr }) => {
            if (dispatch) {
              const { $from } = tr.selection

              for (let depth = $from.depth; depth > 0; depth--) {
                if ($from.node(depth).type.name === this.name) {
                  const $after = tr.doc.resolve($from.after(depth))

                  if (GapCursor.valid($after)) {
                    tr.setSelection(new GapCursor($after))
                  }

                  break
                }
              }
            }

            return true
          })
          .run()
      },

      /**
       * Dissolves the link: the boilerplate node at `pos` is replaced by its own content, so
       * the text stays as plain paragraphs — a structural change, which is why the node holds
       * real paragraphs rather than an HTML string. `editor.commands.undo()` is the way back,
       * since `History` is always registered.
       */
      unlinkBoilerplate: pos => ({ tr, dispatch }) => {
        const node = tr.doc.nodeAt(pos)

        if (node?.type.name !== this.name) {
          return false
        }

        if (dispatch) {
          tr.setMeta('boilerplateEdit', true)
          tr.replaceWith(pos, pos + node.nodeSize, node.content)
        }

        return true
      },
    }
  },

  /**
   * Recognises a boilerplate when HTML is loaded: matches any `<dp-boilerplate>` tag
   * carrying the marker attribute. Mirror image of `renderHTML` below — if the two disagree,
   * the node survives editing but silently disappears on the next reload.
   */
  parseHTML () {
    return [
      { tag:  'dp-boilerplate[boilerplate-id]' },
    ]
  },

  /**
   * Serialises the node back to HTML. `mergeAttributes(HTMLAttributes)` passes through what
   * `addAttributes` produced — hardcoding an attribute object instead would silently drop
   * the boilerplate id. The trailing `0` is ProseMirror's "hole": where the node's content
   * is rendered.
   */
  renderHTML ({ HTMLAttributes }) {
    return ['dp-boilerplate', mergeAttributes(HTMLAttributes), 0]
  },

  /**
   * Renders the node as a Vue component instead of plain HTML, which is what makes the
   * header with title and pencil button possible. Display only — the node view is never
   * saved, renderHTML above is what ends up in the database.
   */
  addNodeView() {
    return VueNodeViewRenderer(DpLinkedBoilerplate)
  },
})
