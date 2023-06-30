import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export const EventHandler = Extension.create({
  name: 'eventPreventer',

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
            }
          }
        },
      }),
    ]
  },
})
