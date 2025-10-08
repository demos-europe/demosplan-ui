import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Extension } from '@tiptap/core'

export default Extension.create({
  name: 'PreventEditing',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('eventPreventer'),

        props: {
          handleClick() {
            return true
          },
          handlePaste() {
            return true
          },
          handleKeyDown() {
            return true
          },
          handleDOMEvents: {
            drop (_view, event) {
              event.preventDefault()

              return true
            },
          },
        },
      }),
    ]
  },
})
