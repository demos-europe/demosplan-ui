/*
 * This is the anonymize-extension for tiptap, built on the basis of tiptap bold-extension.
 * On mark-anonymize in tiptap, we wrap up the marked content in <span class='anonymize'></span> tags, and then before
 * saving the changes we convert them to <dp-obscure>, so that they are correctly saved in BE. But to display the
 * <span class='u-obscure'> tags in the editor we need to use the toDOM function provided by tiptap/prosemirror.
 *
 * InputRules and pasteRules help to handle diverse behaviour when we want to obscure only part of words or we want to
 * use more than one tool (e.g. obscure and bold) simultaneously, etc.
 */
import { Mark, mergeAttributes } from '@tiptap/core'

export default Mark.create({
  name: 'anonymize',

  spanning: false,

  addAttributes () {
    return {
      title: {
        default: null
      }
    }
  },

  addOptions () {
    return {
      HTMLAttributes: {
        title: null,
      }
    }
  },

  parseHTML () {
    return [{
      tag: 'span.anonymize-me'
    }]
  },

  renderHTML: ({ HTMLAttributes, options }) => {
    return ['span', mergeAttributes(
      HTMLAttributes,
      { class: 'anonymize-me' }
    ), 0]
  },

  addCommands () {
    return {
      toggleAnonymize: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      }
    }
  }
})
