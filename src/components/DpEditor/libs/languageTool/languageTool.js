export function checkTextWithLanguageTool (text) {
  if (!text.trim()) {
    return Promise.resolve({ matches: [] })
  }

  const params = new URLSearchParams({
    text: text,
    language: 'auto',
    preferredVariants: 'de-DE,en-US',
  })

  return fetch('https://api.languagetool.org/v2/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
    .then(function (response) {

      if (!response.ok) {
        throw new Error('LanguageTool request failed: ' + response.status)
      }

      return response.json()
    })
    .then(function (data) {
      console.log('LanguageTool response:', data)

      return data
    })
}
