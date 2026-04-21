import { dpApi } from '~/lib/DpApi'

export function checkTextWithLanguageTool (text) {
  if (!text.trim()) {
    return Promise.resolve({ matches: [] })
  }

  const data = {
    text: text,
    language: 'auto',
    preferredVariants: 'de-DE,en-US',
  }

  return dpApi.post(Routing.generate('core_spellcheck_check'), {}, data)
    .then(response => {
      console.log('LanguageTool response:', response.data)

      return response.data
    })
}
