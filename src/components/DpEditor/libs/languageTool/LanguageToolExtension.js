import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

import { buildTextSegments, plainOffsetToPmPos } from './textOffsetMapper'
import { checkTextWithLanguageTool } from './languageTool'
import { createLanguageToolTooltip } from './languageToolTooltip'
import { debounce } from '~/utils'

const languageToolPluginKey = new PluginKey('languageTool')

const getMatchSuggestions = (match) => {
  return (match.replacements || [])
    .slice(0, 5)
    .map(replacement => replacement.value)
}

const LanguageToolExtension = Extension.create({
  name: 'languageTool',

  addStorage () {
    return {
      matches: [],
      runCheck: null,
      abortController: null,
      scheduleCheck: null,
    }
  },

  onCreate () {
    const editor = this.editor

    const refreshLanguageToolDecorations = () => {
      editor.view.dispatch(editor.state.tr.setMeta(languageToolPluginKey, { refresh: true }))
    }

    const resetLanguageToolMatches = () => {
      this.storage.matches = []
      refreshLanguageToolDecorations()
    }

    this.storage.runCheck = () => {
      const { plainText } = buildTextSegments(editor.state.doc)
      const isTextEmpty = !plainText.trim()

      if (isTextEmpty) {
        resetLanguageToolMatches()

        return
      }

      /* A check still in flight is obsolete the moment a newer one starts. */
      this.storage.abortController?.abort()

      const abortController = new AbortController()
      this.storage.abortController = abortController

      checkTextWithLanguageTool(plainText, { signal: abortController.signal })
        .then(result => {
          if (abortController !== this.storage.abortController) {
            return
          }

          /*
           * Match offsets refer to the text that was sent. Applying them to a
           * document that has changed since would underline the wrong words,
           * and editing already scheduled the next check.
           */
          const { plainText: currentText } = buildTextSegments(editor.state.doc)

          if (currentText !== plainText) {
            return
          }

          this.storage.matches = result.matches || []

          refreshLanguageToolDecorations()
        })
        .catch(error => {
          if (error.name === 'AbortError' || abortController !== this.storage.abortController) {
            return
          }

          console.error('LanguageTool error:', error)
        })
    }

    this.storage.scheduleCheck = debounce(() => {
      this.storage.runCheck()
    }, 1000)

    /** Wait until the next paint so the editor is fully rendered before the initial check */
    requestAnimationFrame(() => {
      this.storage.runCheck()
    })
  },

  onDestroy () {
    this.storage.abortController?.abort()
  },

  onUpdate () {
    if (this.storage.scheduleCheck) {
      this.storage.scheduleCheck()
    }
  },

  addProseMirrorPlugins () {
    const createMatchDecorations = (doc) => {
      const matches = this.storage.matches || []
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
          }),
        )
      }

      return DecorationSet.create(doc, decorations)
    }

    const getMatchFromElement = (errorEl) => {
      const matchIndex = Number(errorEl.dataset.ltMatchIndex)

      return this.storage.matches[matchIndex] || null
    }

    const applySelectedSuggestion = (view, errorEl, selectedSuggestion) => {
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
        view.state.schema.text(selectedSuggestion),
      )

      // Mark this decoration for immediate removal
      tr.setMeta(languageToolPluginKey, { removeDecoration: { from, to } })

      view.dispatch(tr)
      view.focus()
    }

    return [
      new Plugin({
        key: languageToolPluginKey,

        state: {
          init () {
            return DecorationSet.empty
          },

          apply (tr, oldDecorationSet) {
            const meta = tr.getMeta(languageToolPluginKey)

            if (meta?.refresh) {
              return createMatchDecorations(tr.doc)
            }

            if (meta?.removeDecoration) {
              const { from, to } = meta.removeDecoration
              const toRemove = []

              oldDecorationSet.find(from, to).forEach((deco) => {
                toRemove.push(deco)
              })

              let decorations = oldDecorationSet.remove(toRemove)

              return decorations.map(tr.mapping, tr.doc)
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
            const suggestions = getMatchSuggestions(match)

            createLanguageToolTooltip(
              message,
              suggestions,
              errorEl,
              function (selectedSuggestion) {
                applySelectedSuggestion(view, errorEl, selectedSuggestion)
              },
            )

            return true
          },
        },
      }),
    ]
  },
})

export default LanguageToolExtension
