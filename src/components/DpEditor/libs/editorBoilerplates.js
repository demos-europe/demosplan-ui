import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import DpLinkedBoilerplate from './../DpLinkedBoilerplate.vue'
import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model'
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

  addAttributes() {
    return {
      boilerplateId: {
        default: null,
        keepOnSplit: false,
        // `dataset.boilerplateId` is the DOM's camelCase view of `data-boilerplate-id`.
        parseHTML: element => element.dataset.boilerplateId,
        renderHTML: attributes => ({
          'data-boilerplate-id': attributes.boilerplateId,
        }),
      },
    }
  },

  /**
   * Configuration the consuming app injects via `Boilerplate.configure({ … })`, since the
   * library has no access to demosplan's store or translations.
   *
   * getBoilerplateTitle: resolves an id to the boilerplate's current title. Looked up on every
   *   render rather than stored as a node attribute — a stored title would go stale, and per
   *   DPLAN-18150 editing a boilerplate can even re-link a segment to a different id.
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
           * Transactions from undo/redo are trusted: nothing that violates this
           * protection could have entered the history stack in the first place,
           * since it would have been rejected here at the time it was attempted.
           * 'history$' is the internal meta key prosemirror-history tags undo/redo
           * transactions with (verified in prosemirror-history/dist/index.js).
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
   * Inserts a boilerplate node followed by an empty paragraph, and moves the cursor
   * into that paragraph. The trailing paragraph guarantees a real, editable position
   * right after the node — without it, ProseMirror has no valid cursor position between
   * two adjacent boilerplate nodes, or after one that ends up being the last node in the
   * document. Tried and rejected for that gap: `contenteditable="false"` on the node view
   * (breaks native cursor placement at the node's edges) and prosemirror-gapcursor with
   * `selectable: false` (no caret appears between two adjacent nodes either way). Keeping
   * a real paragraph around is what actually works — don't replace it with either of those.
   * 
   * Built on the built-in `insertContent` command rather than raw `tr.insert()` at a
   * hand-computed position: when the cursor sits inside an existing empty paragraph
   * (e.g. right after pressing Enter), a plain position + nodeSize offset doesn't account
   * for ProseMirror splitting that paragraph to fit the new block, and the trailing
   * paragraph ends up nested inside the boilerplate instead of after it. `insertContent`
   * already handles this (replacing an empty textblock at the cursor instead of splitting
   * it) and places the selection via `Selection.near`, which reliably lands inside the
   * new empty paragraph.
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
          .insertContent([
            { type: this.name, attrs: { boilerplateId }, content },
            { type: 'paragraph' },
          ])
          .run()
      },
    }
  },

  /**
   * Recognises a boilerplate when HTML is loaded into the editor. The attribute selector
   * matches any div carrying the marker, whatever its id value.
   *
   * Mirror image of renderHTML below — if the two disagree, the node survives editing but
   * silently disappears on the next reload.
   */
  parseHTML () {
    return [
      { tag: 'div[data-boilerplate-id]' },
    ]
  },

  /**
   * Serialises the node back to HTML. `mergeAttributes(HTMLAttributes)` passes through what
   * addAttributes produced — hardcoding an attribute object here instead (as some older
   * extensions in this folder do) would silently drop the boilerplate id. The trailing `0`
   * is ProseMirror's "hole": the place the node's content is rendered into.
   */
  renderHTML ({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
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
