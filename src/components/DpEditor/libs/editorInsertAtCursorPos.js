import { DOMParser } from 'prosemirror-model'
import { Node } from '@tiptap/core'

export default Node.create({
  name: 'insertHTML',

  inline: false,

  attrs: {},

  group: 'block',

  draggable: true,

  parseHTML () {
    return []
  },

  insertHTML: string => (state, dispatch) => {
    const { selection } = this.editor.state
    const element = document.createElement('div')

    element.innerHTML = string.trim()

    const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
    const transaction = state.tr.insert(selection.anchor, slice.content)

    dispatch(transaction)
  }
})
