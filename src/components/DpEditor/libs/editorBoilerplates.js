import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import DpLinkedBoilerplate from './../DpLinkedBoilerplate.vue'
import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model'
import { GapCursor } from '@tiptap/pm/gapcursor'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

/**
 * Whether a resolved position sits inside a boilerplate node.
 *
 * Walks the ancestor chain instead of using `editor.isActive()`, which also reports true
 * when the cursor merely sits at a node boundary — that imprecision previously blocked
 * navigation right next to a boilerplate.
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
    if (node.type.name === nodeName && node.attrs.boilerplateId === boilerplateId) {
      found = true
    }
  })

  return found
}

/**
 * Wraps text inserted from a boilerplate in a node that carries the boilerplate's id, so
 * the link between boilerplate and recommendation survives saving and reloading.
 *
 * A node, not a mark: boilerplate texts contain whole paragraphs and lists, and a mark can
 * only decorate text inside a single textblock.
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
   * Both flags exist so the Gapcursor extension gives a cursor position directly before/after
   * this block, without a real paragraph sitting there.
   *
   * isolating: without it, GapCursor never considers the gap next to a boilerplate valid (a
   *   node ending in a paragraph doesn't qualify), and deleting the paragraph between two
   *   boilerplates would merge them, silently dropping one id.
   * selectable: false, so a click next to the block places a caret instead of selecting the
   *   whole node — whole-node deletion isn't in scope for DPLAN-18271.
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
   * library has no access to demosplan's store or translations.
   *
   * getBoilerplateTitle: resolves an id to the boilerplate's title on every render, not stored
   *   as a node attribute — it would go stale (DPLAN-18150: editing can even re-link the id).
   * onUnlinkRequest: called when the user clicks the pencil in the node view.
   */
  addOptions() {
    return {
      getBoilerplateTitle: () => '',
      onUnlinkRequest: () => {},
    }
  },

  /*
   * Rejects any transaction that would change content inside an existing boilerplate
   * node. Deliberately not done via `contenteditable="false"` in the node view: that
   * marks the whole DOM subtree non-editable for the browser, which also breaks native
   * cursor placement right after the node (e.g. when it's the last node in the doc).
   * Own commands that legitimately need to restructure a boilerplate node (e.g. unlinking
   * it) must mark their transaction with `tr.setMeta('boilerplateEdit', true)` to bypass this.
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
           * A transaction is a list of steps. For each one, look at the document as it was
           * *before* that step (`tr.docs[index]`) and at the ranges the step changes
           * (`step.getMap()`, which reports them as old/new position pairs). If a boilerplate
           * node lies in any changed range, the edit reaches into protected content.
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
           * FilterTransaction alone rejects the change, but the browser has already
           * written the character into the DOM by then — it stays visible while being
           * absent from the document. Refusing the input here prevents the DOM change
           * in the first place, so what the user sees matches what gets saved.
           */
          handleTextInput (view, from) {
            return isInsideBoilerplate(view.state.doc.resolve(from), nodeName)
          },
        },
      }),
    ]
  },

  /*
   * Built on the built-in `insertContent` command rather than raw `tr.insert()` at a
   * hand-computed position: if the cursor sits in an existing empty paragraph, a plain
   * position + nodeSize offset doesn't account for ProseMirror splitting that paragraph to
   * fit the new block, and the trailing paragraph would end up nested inside the boilerplate
   * instead of after it. `insertContent` handles that split correctly; where the cursor ends
   * up afterwards is fixed up below.
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
           * `insertContent` ends with `Selection.near`, which can only produce a text or node
           * selection and therefore lands *inside* the boilerplate — where typing is blocked.
           * Move the caret to the gap right behind the node instead, so the user can keep
           * writing. Deliberately no trailing paragraph for this: it would end up in the
           * saved HTML and as an empty line in every DOCX/PDF export.
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
       * the text stays in place as plain paragraphs. A structural change, which is why the
       * node holds real paragraphs rather than an HTML string attribute in the first place.
       *
       * `editor.commands.undo()` is the way back — `History` is always registered, so no
       * separate snapshot mechanism is needed here.
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
   * Recognises a boilerplate when HTML is loaded into the editor. The selector matches any
   * `<dp-boilerplate>` tag carrying the marker attribute, whatever its id value.
   *
   * Mirror image of renderHTML below — if the two disagree, the node survives editing but
   * silently disappears on the next reload.
   */
  parseHTML () {
    return [
      { tag:  'dp-boilerplate[boilerplate-id]' },
    ]
  },

  /**
   * Serialises the node back to HTML. `mergeAttributes(HTMLAttributes)` passes through what
   * addAttributes produced — hardcoding an attribute object here instead (as some older
   * extensions in this folder do) would silently drop the boilerplate id. The trailing `0`
   * is ProseMirror's "hole": the place the node's content is rendered into.
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
