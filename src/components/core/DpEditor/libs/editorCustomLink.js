import { mergeAttributes } from '@tiptap/core'
import { Link } from '@tiptap/extension-link'

export default Link.extend({
  addOptions () {
    return {
      openOnClick: true,
      HTMLAttributes: {
        target: null,
        rel: 'noopener noreferrer nofollow'
      }
    }
  },

  addAttributes () {
    return {
      href: {
        default: null
      },
      target: {
        default: null
      }
    }
  },

  inclusive: false,

  parseHTML () {
    return [
      {
        tag: 'a[href]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['a', mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes
    ), 0]
  }
})
