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
 * Whether a boilerplate with this id is already linked anywhere in the document. Linking the
 * same boilerplate twice in one recommendation makes no sense from a usage perspective, so the
 * FE prevents it — the backend model is safe either way, since its unique constraint dedups
 * the relation.
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
   * Both give Gapcursor a valid cursor position directly before/after this block, without a
   * real paragraph sitting there. isolating prevents merging two boilerplates by deleting the
   * paragraph between them. selectable: false turns a click next to the block into a caret
   * instead of a node selection.
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
   * library has no access to the host's store/translations. getBoilerplateTitle resolves an
   * id to a title on every render rather than storing it, so a re-linked title can't go stale.
   */
  addOptions() {
    return {
      getBoilerplateTitle: () => '',
      onUnlinkRequest: () => {},
    }
  },

  /*
   * Rejects transactions that would change content inside a boilerplate node. Not done via
   * `contenteditable="false"`, which breaks native cursor placement right after the node.
   * Commands that legitimately restructure a boilerplate bypass this via
   * `tr.setMeta('boilerplateEdit', true)`.
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

          // Undo/redo is trusted: a violating change would already have been rejected once.
          if (tr.getMeta('history$')) {
            return true
          }

          let touchesProtectedContent = false

          // For each step, check whether its changed range touches a boilerplate node.
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
           * Rejects the DOM edit itself, so a blocked character can't stay visible in the DOM
           * while it's absent from the document.
           */
          handleTextInput (view, from) {
            return isInsideBoilerplate(view.state.doc.resolve(from), nodeName)
          },
        },
      }),
    ]
  },

  /*
   * Uses `insertContent` rather than raw `tr.insert()` so a cursor sitting in an empty
   * paragraph gets split correctly instead of nesting the trailing paragraph inside the node.
   */
  addCommands () {
    return {
      insertBoilerplate: ({ boilerplateId, html }) => ({ editor, chain }) => {
        // Boilerplates must not nest, and the same one must not be linked twice.
        if (isInsideBoilerplate(editor.state.selection.$from, this.name)) {
          return false
        }

        if (isAlreadyLinked(editor.state.doc, this.name, boilerplateId)) {
          return false
        }

        // Parse the incoming HTML through the editor's schema into real paragraph nodes.
        const wrapper = document.createElement('div')
        wrapper.innerHTML = html
        const content = ProseMirrorDOMParser.fromSchema(editor.schema).parse(wrapper).content.toJSON()

        return chain()
          // Marks this as our own controlled insertion, so it bypasses filterTransaction above.
          .command(({ tr }) => {
            tr.setMeta('boilerplateEdit', true)

            return true
          })
          .insertContent({ type: this.name, attrs: { boilerplateId }, content })
          /*
           * `insertContent` ends with `Selection.near`, landing inside the boilerplate where
           * typing is blocked — move the caret to the gap right behind the node instead.
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

      /*
       * Dissolves the link: the boilerplate node at `pos` is replaced by its own content, so
       * the text stays as plain paragraphs. `editor.commands.undo()` is the way back.
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

  /*
   * Recognises a boilerplate when HTML is loaded. Mirror image of `renderHTML` below — if the
   * two disagree, the node survives editing but silently disappears on the next reload.
   */
  parseHTML () {
    return [
      { tag:  'dp-boilerplate[boilerplate-id]' },
    ]
  },

  /*
   * Serialises the node back to HTML. `mergeAttributes(HTMLAttributes)` passes through what
   * `addAttributes` produced. The trailing `0` is ProseMirror's "hole" for the node's content.
   */
  renderHTML ({ HTMLAttributes }) {
    return ['dp-boilerplate', mergeAttributes(HTMLAttributes), 0]
  },

  /*
   * Renders the node as a Vue component for the header UI. Display only — renderHTML above is
   * what ends up in the database.
   */
  addNodeView() {
    return VueNodeViewRenderer(DpLinkedBoilerplate)
  },
})
