import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

import { checkTextWithLanguageTool } from './languageTool'
import { debounce } from './debounce'
import {
  buildTextSegments,
  plainOffsetToPmPos,
} from './textOffsetMapper'
import { createLanguageToolTooltip } from './languageToolTooltip'

const languageToolPluginKey = new PluginKey('languageTool')

export const LanguageToolExtension = Extension.create({
  name: 'languageTool',

  addStorage() {
    return {
      matches: [],
      runCheck: null,
      requestId: 0,
      scheduleCheck: null,
    }
  },

  onCreate() {
    const editor = this.editor
    const extension = this

    const refreshLanguageToolDecorations = function () {
      editor.view.dispatch(editor.state.tr.setMeta(languageToolPluginKey, { refresh: true }))
    }

    const resetLanguageToolMatches = function () {
      extension.storage.matches = []
      refreshLanguageToolDecorations()
    }

    extension.storage.runCheck = function () {
      const { plainText, textSegments } = buildTextSegments(editor.state.doc)
      const isTextEmpty = !plainText.trim()

      console.log('Plain text for LanguageTool:', plainText)
      console.log('Text segments:', textSegments)

      if (isTextEmpty) {
        resetLanguageToolMatches()
        return
      }

      const currentRequestId = ++extension.storage.requestId

      checkTextWithLanguageTool(plainText)
        .then(result => {
          if (currentRequestId !== extension.storage.requestId) {
            return
          }

          const matches = result.matches || []
          extension.storage.matches = matches

          refreshLanguageToolDecorations()
        })
        .catch(error => {
          if (currentRequestId !== extension.storage.requestId) {
            return
          }

          console.error('LanguageTool error:', error)
        })
    }

    extension.storage.scheduleCheck = debounce(function () {
      extension.storage.runCheck()
    }, 1000)

    /** Wait until the next paint so the editor is fully rendered before the initial check */
    requestAnimationFrame(() => {
      extension.storage.runCheck()
    })
  },

  onUpdate() {
    if (this.storage.scheduleCheck) {
      this.storage.scheduleCheck()
    }
  },

  addProseMirrorPlugins () {
    const extension = this

    const createMatchDecorations = function (doc) {
      const matches = extension.storage.matches || []
      const { textSegments } = buildTextSegments(doc)
      const decorations = []

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]

        const start = plainOffsetToPmPos(textSegments, match.offset)
        const end = plainOffsetToPmPos(textSegments, match.offset + match.length, true)

        if (start == null || end == null || end <= start) {
          continue
        }

        decorations.push(
          Decoration.inline(start, end, {
            class: 'lt-error',
            'data-lt-match-index': String(i),
          })
        )
      }

      return DecorationSet.create(doc, decorations)
    }

    const getMatchFromElement = function (errorEl) {
      const matchIndex = Number(errorEl.dataset.ltMatchIndex)

      return extension.storage.matches[matchIndex] || null
    }

    const getMatchSuggestions = function (match) {
      return (match.replacements || [])
        .slice(0, 5)
        .map(replacement => replacement.value)
    }

    const replaceErrorText = function (view, errorEl, selectedSuggestion) {
      // Use the current DOM position to avoid stale offsets if multiple replacements
      const from = view.posAtDOM(errorEl, 0)
      const textLength = errorEl.textContent?.length || 0
      const to = from + textLength

      if (to <= from) {
        return
      }

      const tr = view.state.tr.replaceWith(
        from,
        to,
        view.state.schema.text(selectedSuggestion)
      )

      view.dispatch(tr)
      view.focus()
    }

    return [
      new Plugin({
        key: languageToolPluginKey,

        state: {
          init() {
            return DecorationSet.empty
          },

          apply(tr, oldDecorationSet) {
            const meta = tr.getMeta(languageToolPluginKey)

            if (meta?.refresh) {
              return createMatchDecorations(tr.doc)
            }

            return oldDecorationSet.map(tr.mapping, tr.doc)
          },
        },

        props: {
          decorations (state) {
            return this.getState(state)
          },

          handleClick (view, _pos, event) {
            const target = event.target

            if (!(target instanceof Element)) {
              return false
            }

            const errorEl = target.closest('.lt-error')

            if (!errorEl) {
              return false
            }

            const match = getMatchFromElement(errorEl)

            if (!match) {
              return false
            }

            const message = match.message || ''
            const suggestions = getMatchSuggestions()

            createLanguageToolTooltip(
              message,
              suggestions,
              errorEl,
              function (selectedSuggestion) {
                replaceErrorText(view, errorEl, selectedSuggestion)
              }
            )

            return true
          },
        },
      }),
    ]
  },
})
