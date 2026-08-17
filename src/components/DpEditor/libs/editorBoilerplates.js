import { mergeAttributes, Node } from '@tiptap/core'

export default Node.create({
  name: 'boilerplate',

  group: 'block',

  content: 'block+',

  addAttributes() {
    return {
      boilerplateId: {
        default: null,
        keepOnSplit: false,
        parseHTML: element => element.dataset.boilerplateId,
        renderHTML: attributes => ({
          'data-boilerplate-id': attributes.boilerplateId,
        }),
      }
    }
  },

  parseHTML () {
    return [
      { tag: 'div[data-boilerplate-id]' },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },
})
