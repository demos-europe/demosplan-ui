import { de } from '../../../shared/translations'
import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class EditorCustomMark extends Mark {
  get name () {
    return 'mark'
  }

  get schema () {
    return {
      parseDOM: [
        {
          tag: 'mark'
        }
      ],
      toDOM: () => ['mark', { title: de.text.marked }, 0]
    }
  }

  commands ({ type }) {
    return () => toggleMark(type)
  }
}
