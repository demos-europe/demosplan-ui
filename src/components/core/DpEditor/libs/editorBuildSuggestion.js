import tippy, { sticky } from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-2'
import MentionList from '../MentionList.vue'

export default ({ suggestions, matcher }) => ({
  ...matcher,

  items: ({ query }) => {
    return suggestions.filter(item => item.label.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new VueRenderer(MentionList, {
          // using vue 2:
          parent: this,
          propsData: props,
          // using vue 3:
          // props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          interactive: true,
          sticky: true, // Make sure position of tippy is updated when content changes
          plugins: [sticky],
          content: component.element,
          trigger: 'manual', // Manual
          showOnCreate: true,
          theme: 'dark',
          placement: 'top-start',
          inertia: true,
          duration: [400, 200]
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
})
