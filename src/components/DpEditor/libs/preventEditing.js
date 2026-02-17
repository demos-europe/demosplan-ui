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
          handleKeyDown(view, event) {
            // Allow arrow keys, shift, control/command, and tab for text selection and navigation
            const allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Shift', 'Control', 'Meta', 'Tab']
            return !(allowedKeys.includes(event.key))}
          ,
          handleDOMEvents: {
            drop(_view, event) {
              event.preventDefault()

              return true
            },
          },
        },
      }),
    ]
  },
})
