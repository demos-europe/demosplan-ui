import { de } from '../../shared/translations'
import {
  Mark,
} from '@tiptap/core'

export default Mark.create({
  name: 'delete',

  parseHTML () {
    return [{ tag: 'del' }]
  },

  renderHTML () {
    return ['del', { title: de.text.deleted }, 0]
  },

  addCommands () {
    return {
      setDelete: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleDelete: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetDelete: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },
})
