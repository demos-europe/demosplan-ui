import { Extension, Plugin } from 'tiptap'

export default class preventPaste extends Extension {
  get name () {
    return 'PreventProp'
  }

  get plugins () {
    return [
      new Plugin({
        props: {
          handlePaste () {
            return true
          }
        }
      })
    ]
  }
}
