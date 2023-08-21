import { de } from '../../../shared/translations'
import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class EditorCustomInsert extends Mark {
  get name () {
    return 'insert'
  }

  get schema () {
    return {
      parseDOM: [
        {
          tag: 'ins'
        }
      ],
      toDOM: () => ['ins', { title: de.text.inserted }, 0]
    }
  }

  commands ({ type }) {
    return () => toggleMark(type)
  }
}
