import { Extension, Plugin } from 'tiptap'

export default class preventDrop extends Extension {
  get name () {
    return 'PreventDrop'
  }

  get plugins () {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop (view, event) {
              event.preventDefault()
              return true
            }
          }
        }
      })
    ]
  }
}
