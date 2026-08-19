import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import DpLinkedBoilerplate from './../DpLinkedBoilerplate.vue'

export default Node.create({
  name: 'boilerplate',

  group: 'block',

  content: 'block+',

  addAttributes() {
    return {
      boilerplateId: {
        default: null,
        keepOnSplit: false,
        parseHTML: element => element.dataset.boilerplateId,
        renderHTML: attributes => ({
          'data-boilerplate-id': attributes.boilerplateId,
        }),
      }
    }
  },

  // sachen die von außen kommen, z.B. title, id, etc. können hier definiert werden
  addOptions() {
    return {
      getBoilerplateTitle: () => '',
    }
  },

  parseHTML () {
    return [
      { tag: 'div[data-boilerplate-id]' },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },

  // Return a vue component
  addNodeView() {
    return VueNodeViewRenderer(DpLinkedBoilerplate)
  },

})
