import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

import { checkTextWithLanguageTool } from './languageTool'
import { debounce } from './debounce'
import {
  buildTextSegments,
  plainOffsetToPmPos,
} from './textOffsetMapper'
import { createLanguageToolTooltip, removeLanguageToolTooltip } from './languageToolTooltip'

const languageToolPluginKey = new PluginKey('languageTool')

export const LanguageToolExtension = Extension.create({
  name: 'languageTool',

  addStorage() {
    return {
      matches: [],
      runCheck: null,
    }
  },

  onCreate() {
    const editor = this.editor
    const extension = this

    extension.storage.runCheck = debounce(function () {
      const { plainText, segments } = buildTextSegments(editor.state.doc)

      console.log('Plain text for LanguageTool:', plainText)
      console.log('Text segments:', segments)

      if (!plainText.trim()) {
        extension.storage.matches = []

        editor.view.dispatch(
          editor.state.tr.setMeta(languageToolPluginKey, { refresh: true })
        )
        return
      }

      checkTextWithLanguageTool(plainText)
        .then(function (result) {
          extension.storage.matches = result.matches || []

          editor.view.dispatch(
            editor.state.tr.setMeta(languageToolPluginKey, { refresh: true })
          )
        })
        .catch(function (error) {
          console.error('LanguageTool error:', error)
        })
    }, 1000)

    // erste Prüfung nach Init
    setTimeout(function () {
      extension.storage.runCheck()
    }, 500)
  },

  onUpdate() {
    if (this.storage.runCheck) {
      this.storage.runCheck()
    }
  },

  addProseMirrorPlugins() {
    const extension = this

    return [
      new Plugin({
        key: languageToolPluginKey,

        state: {
          init: function () {
            return DecorationSet.empty
          },

          apply: function (tr, oldDecorationSet) {
            let decorations = oldDecorationSet.map(tr.mapping, tr.doc)
            const meta = tr.getMeta(languageToolPluginKey)

            if (meta && meta.refresh) {
              const matches = extension.storage.matches || []
              const { segments } = buildTextSegments(tr.doc)
              const newDecorations = []

              for (let i = 0; i < matches.length; i++) {
                const match = matches[i]

                const start = plainOffsetToPmPos(segments, match.offset)
                const end = plainOffsetToPmPos(
                  segments,
                  match.offset + match.length
                )

                if (start == null || end == null || end <= start) {
                  continue
                }

                newDecorations.push(
                  Decoration.inline(start, end, {
                    class: 'lt-error',
                    'data-lt-message': match.message || '',
                    'data-lt-suggestions': JSON.stringify(
                      (match.replacements || []).slice(0, 5).map(function (r) {
                        return r.value
                      })
                    ),
                    title: match.message || '',
                  })
                )
              }

              decorations = DecorationSet.create(tr.doc, newDecorations)
            }

            return decorations
          },
        },

        props: {
          decorations: function (state) {
            return this.getState(state)
          },

          handleClick: function (view, pos, event) {
            const target = event.target

            if (target && target.classList && target.classList.contains('lt-error')) {
              const message = target.dataset.ltMessage
              const suggestions = JSON.parse(target.dataset.ltSuggestions || '[]')

              // Create tooltip with suggestions
              createLanguageToolTooltip(
                message,
                suggestions,
                target,
                function (selectedSuggestion) {
                  // Find the position of the error in the document
                  const from = view.posAtDOM(target, 0)
                  const to = from + target.textContent.length

                  // Replace the error text with the selected suggestion
                  const tr = view.state.tr.replaceWith(
                    from,
                    to,
                    view.state.schema.text(selectedSuggestion),
                  )

                  view.dispatch(tr)
                  view.focus()
                }
              )

              return true
            }

            return false
          },
        },
      }),
    ]
  },
})
