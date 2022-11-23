import { Extension, Plugin } from 'tiptap'

export default class preventKeyboardInput extends Extension {
  get name () {
    return 'PreventDrop'
  }

  get plugins () {
    return [
      new Plugin({
        props: {
          handleKeyDown: (view, event) => true,
          handleTextInput: (view, event) => true
        }
      })
    ]
  }
}
