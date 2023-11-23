import { mergeAttributes } from '@tiptap/core'
import { Mention } from '@tiptap/extension-mention'

export default Mention.extend({
  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-type': this.name, 'data-suggestion-id': node.attrs.id }, this.options.HTMLAttributes, HTMLAttributes),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ]
  },
})
