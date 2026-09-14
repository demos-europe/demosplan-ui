import { beforeEach, describe, expect, it, vi } from 'vitest'
import { checkTextWithLanguageTool } from '~/components/DpEditor/libs/languageTool/languageTool'
import { dpApi } from '~/lib/DpApi'

vi.mock('~/lib/DpApi', () => ({
  dpApi: { post: vi.fn(() => Promise.resolve({ data: { matches: [] } })) },
}))

describe('checkTextWithLanguageTool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.Routing = { generate: vi.fn(() => '/api/1.0/spellcheck/check') }
  })

  it('resolves without a request when the text is blank', async () => {
    const result = await checkTextWithLanguageTool('   ')

    expect(result).toEqual({ matches: [] })
    expect(dpApi.post).not.toHaveBeenCalled()
  })

  it('sends the text and forwards the abort signal', async () => {
    const { signal } = new AbortController()

    await checkTextWithLanguageTool('Ein Satz', { signal })

    expect(dpApi.post).toHaveBeenCalledWith(
      '/api/1.0/spellcheck/check',
      {},
      { text: 'Ein Satz', language: 'de-DE' },
      { signal },
    )
  })

  it('passes an undefined signal when none is given', async () => {
    await checkTextWithLanguageTool('Ein Satz')

    expect(dpApi.post.mock.calls[0][3]).toEqual({ signal: undefined })
  })
})
