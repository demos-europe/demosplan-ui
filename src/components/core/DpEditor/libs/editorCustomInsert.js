import {
  Mark,
  markInputRule,
  markPasteRule,
} from '@tiptap/core'

export default Mark.create({
  name: 'insert',

  parseHTML () {
    return [{ tag: 'ins' }]
  },

  renderHTML () {
    return ['ins', { title: Translator.trans('text.inserted') }, 0]
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
