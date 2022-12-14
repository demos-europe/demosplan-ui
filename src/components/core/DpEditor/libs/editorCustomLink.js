import { Link } from 'tiptap-extensions'

export default class EditorCustomLink extends Link {
  get defaultOptions () {
    return {
      openOnClick: false,
      target: null
    }
  }

  get schema () {
    return {
      attrs: {
        href: {
          default: null
        },
        target: {
          default: null
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: dom => ({
            href: dom.getAttribute('href'),
            target: dom.getAttribute('target')
          })
        }
      ],
      toDOM: node => ['a', {
        ...node.attrs,
        rel: 'noopener noreferrer nofollow'
      }, 0]
    }
  }
}
