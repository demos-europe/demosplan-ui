import { mergeAttributes } from '@tiptap/core'
import { Mention } from '@tiptap/extension-mention'

export default Mention.extend({
  renderHTML({ node, options }) {
    return [
      'span',
      mergeAttributes({ 'data-type': this.name, 'data-suggestion-id': node.attrs.id }, options.HTMLAttributes),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ]
  },
})
