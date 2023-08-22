import { de } from '../../../shared/translations'
import { Mark } from '@tiptap/core'

export default Mark.create({
  name: 'markText',

  parseHTML () {
    return [
      {
        tag: 'mark'
      }
    ]
  },

  renderHTML: () => ['mark', { title: de.text.marked }, 0],

  addCommands() {
    return {
      toggleMarkText: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      }
    }
  },
})
