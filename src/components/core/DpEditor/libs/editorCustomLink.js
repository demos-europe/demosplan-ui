import { mergeAttributes } from '@tiptap/core'
import { Link } from '@tiptap/extension-link'

export default Link.extend({
  name: 'customLink',

  addOptions () {
    return {
      ...this.parent?.(),
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
  },

  addCommands () {
    return {
      setCustomLink: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleCustomLink: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetCustomLink: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  }
})
