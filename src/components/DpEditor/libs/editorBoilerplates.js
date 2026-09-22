import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import DpLinkedBoilerplate from './../DpLinkedBoilerplate.vue'
import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model'
import { GapCursor } from '@tiptap/pm/gapcursor'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

/**
 * Whether a resolved position sits inside a boilerplate. Uses the ancestor chain, not
 * `editor.isActive()`, which also matches at node boundaries.
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
 * Whether a boilerplate with this id is already linked anywhere in the document. Duplicate
 * links make no sense for users, even though the BE model tolerates them (unique constraint
 * dedups the relation).
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
 * Wraps boilerplate text in a node (not a mark, since content can be whole paragraphs/lists)
 * carrying its id, so the link survives saving and reloading.
 */
export default Node.create({
  name: 'boilerplate',

  // Sits next to paragraphs and lists at the top level of the document.
  group: 'block',

  /*
   * Holds real block nodes, not an HTML string, so exports/search still see the text and
   * unlinking is just dropping the wrapper.
   */
  content: 'block+',

  /*
   * Both give Gapcursor a cursor position directly before/after the block. isolating stops
   * two boilerplates merging via a deleted paragraph; selectable: false makes a click place a
   * caret, not a node selection.
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
   * Injected via `Boilerplate.configure({ … })`, since the library has no access to the host's
   * store. getBoilerplateTitle resolves live, so a re-linked title can't go stale.
   */
  addOptions() {
    return {
      getBoilerplateTitle: () => '',
      onUnlinkRequest: () => {},
    }
  },

  /*
   * Rejects transactions that edit inside a boilerplate. Not `contenteditable="false"`, which
   * breaks cursor placement after the node; legitimate restructuring bypasses this via
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
          // Rejects the DOM edit itself, so a blocked character can't linger visually.
          handleTextInput (view, from) {
            return isInsideBoilerplate(view.state.doc.resolve(from), nodeName)
          },
        },
      }),
    ]
  },

  /*
   * Uses `insertContent`, not raw `tr.insert()`, so a cursor in an empty paragraph splits
   * correctly instead of nesting the trailing paragraph inside the node.
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
           * `insertContent` lands inside the boilerplate (typing blocked) — move the caret to
           * the gap right behind the node instead.
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
       * Dissolves the link by replacing the node at `pos` with its own content.
       * `editor.commands.undo()` reverses it.
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
   * Recognises a boilerplate on load; must mirror `renderHTML` below or the node silently
   * disappears on reload.
   */
  parseHTML () {
    return [
      { tag:  'dp-boilerplate[boilerplate-id]' },
    ]
  },

  // Serialises back to HTML; the trailing `0` is ProseMirror's "hole" for the node's content.
  renderHTML ({ HTMLAttributes }) {
    return ['dp-boilerplate', mergeAttributes(HTMLAttributes), 0]
  },

  // Renders as a Vue component for the header UI; renderHTML above is what's actually saved.
  addNodeView() {
    return VueNodeViewRenderer(DpLinkedBoilerplate)
  },
})
