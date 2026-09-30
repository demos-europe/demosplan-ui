import { dpApi } from '~/lib/DpApi'

export function checkTextWithLanguageTool (text = '', { signal } = {}) {
  const isEmpty = !text.trim()

  if (isEmpty) {
    return Promise.resolve({ matches: [] })
  }

  const data = {
    text,
    language: 'de-DE',
  }

  return dpApi.post(Routing.generate('core_spellcheck_check'), {}, data, { signal })
    .then(response => {

      return response.data
    })
}
