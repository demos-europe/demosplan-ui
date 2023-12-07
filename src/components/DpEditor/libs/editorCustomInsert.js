import {
  Mark,
  markInputRule,
  markPasteRule,
} from '@tiptap/core'
import { de } from '../../shared/translations'

export default Mark.create({
  name: 'insert',

  parseHTML () {
    return [{ tag: 'ins' }]
  },

  renderHTML () {
    return ['ins', { title: de.text.inserted }, 0]
  },

  addCommands () {
    return {
      setInsert: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleInsert: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetInsert: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  }
})
