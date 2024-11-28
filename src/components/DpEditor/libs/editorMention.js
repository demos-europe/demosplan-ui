import { mergeAttributes } from '@tiptap/core'
// THIS IS A WORKAROUND.
// In our setup per default the cjs-file is used. That file for some reason has a problem to resolve an internal dependency (Suggestion) properly.
import { Mention } from '../../../../node_modules/@tiptap/extension-mention/dist/index.js'

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
