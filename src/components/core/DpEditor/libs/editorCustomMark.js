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

  renderHTML: () => ['mark', { title: Translator.trans('text.mark') }, 0],

  addCommands() {
    return {
      toggleMarkText: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      }
    }
  },
})
