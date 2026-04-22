import { dpApi } from '~/lib/DpApi'

export function checkTextWithLanguageTool (text = '') {
  const isEmpty = !text.trim()

  if (isEmpty) {
    return Promise.resolve({ matches: [] })
  }

  const data = {
    text,
    language: 'auto',
    preferredVariants: 'de-DE,en-US',
  }

  return dpApi.post(Routing.generate('core_spellcheck_check'), {}, data)
    .then(response => {

      return response.data
    })
}
