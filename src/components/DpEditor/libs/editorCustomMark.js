import { de } from '../../shared/translations'
import { Mark } from '@tiptap/core'

export default Mark.create({
  name: 'markText',

  parseHTML () {
    return [{ tag: 'mark' }]
  },

  renderHTML () {
    return ['mark', { title: de.text.marked }, 0]
  },

  addCommands () {
    return {
      setMarkText: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleMarkText: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetMarkText: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  }
})

