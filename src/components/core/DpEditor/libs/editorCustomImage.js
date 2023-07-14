import DpResizableImage from './DpResizableImage'
import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'


/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export default Node.create({
  name: 'image',

  inline: true,

  addOptions() {
    return {
      HTMLAttributes: {
        style: 'width: ',
        class: null,
      }
    }
  },

  addAttributes() {
    return {
      alt: {
        default: '',
        keepOnSplit: false,
        parseHTML: element => element.getAttribute('alt'),
        renderHTML: attributes => ({
          'alt': attributes.alt
        })
      },

      height: {
        default: '',
        keepOnSplit: false,
        parseHTML: element => {
          return element.height || element.style.height
        },
        renderHTML: attributes => ({
          'height': attributes.height
        })
      },

      src: {
        default: '',
        keepOnSplit: false,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes => ({
          'src': attributes.src
        })
      },

      title: {
        default: '',
        keepOnSplit: false,
        parseHTML: element => element.getAttribute('title'),
        renderHTML: attributes => ({
          'title': attributes.title
        })
      },

      width: {
        default: '',
        keepOnSplit: false,
        parseHTML: element => element.width || element.style.width,
        renderHTML: attributes => {
          return {
            'width': attributes.width
          }
        }
      }
    }
  },

  group: 'inline',

  draggable: true,

  atom: true,

  parseHTML () {
    return [{
      tag: `dp-resizable-image[style="width:${this.att}"]`
    }, {
      tag: 'img[src]'
    }]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { unselectable: 'on' })]
  },

  addCommands () {
    return {
      insertImage: attributes => ({ state, dispatch }) => {
        const { selection } = state
        const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
        const node = this.type.create(attributes)
        const transaction = state.tr.insert(position, node)

        dispatch(transaction)
      }
    }
  },

  addInputRules () {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type
      })
    ]
  },

  // Return a vue component
  addNodeView() {
    return VueNodeViewRenderer(DpResizableImage, { as: 'img' })
  }
})
