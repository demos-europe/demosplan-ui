import { de } from '../../../shared/translations'
import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class EditorCustomDelete extends Mark {
  get name () {
    return 'delete'
  }

  get schema () {
    return {
      parseDOM: [
        {
          tag: 'del'
        }
      ],
      toDOM: () => ['del', { title: de.text.deleted }, 0]
    }
  }

  commands ({ type }) {
    return () => toggleMark(type)
  }
}
