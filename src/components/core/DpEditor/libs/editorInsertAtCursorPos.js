import { DOMParser } from 'prosemirror-model'
import { Node } from 'tiptap'

export default class EditorInsertAtCursorPos extends Node {
  get name () {
    return 'insertHTML'
  }

  get schema () {
    return {
      inline: false,
      attrs: {},
      group: 'block',
      draggable: true,
      parseDOM: []
    }
  }

  commands ({ type }) {
    return {
      insertHTML: string =>
        (state, dispatch) => {
          const { selection } = state
          const element = document.createElement('div')
          element.innerHTML = string.trim()
          const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
          const transaction = state.tr.insert(selection.anchor, slice.content)
          dispatch(transaction)
        }
    }
  }
}
