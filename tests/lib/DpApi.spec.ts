import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { dpApi as dpApiModule } from '~/lib/DpApi'

type RequestOptions = { signal?: AbortSignal }
type DpApiGet = (url: string, params?: Record<string, unknown>, options?: RequestOptions) => Promise<unknown>

// The get helper exists on dpApi at runtime but not in the type inferred from DpApi.js, so typecheck would fail without this
const dpApi = dpApiModule as unknown as { get: DpApiGet }

const url = '/api/1.0/example'

const okResponse = (): Partial<Response> => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  url,
  headers: new Headers({ 'Content-Type': 'application/json' }),
  json: () => Promise.resolve({ data: {} }),
})

describe('dpApi request abort handling', () => {
  const fetchMock = vi.fn<typeof fetch>()

  beforeEach(() => {
    fetchMock.mockReset()
    fetchMock.mockImplementation(() => Promise.resolve(okResponse() as Response))
    vi.stubGlobal('fetch', fetchMock)
    vi.stubGlobal('dplan', { debug: false, notify: { notify: vi.fn() } })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('forwards the abort signal to fetch', async () => {
    const { signal } = new AbortController()

    await dpApi.get(url, {}, { signal })

    expect(fetchMock.mock.calls[0][1].signal).toBe(signal)
  })

  it('does not set a signal on fetch when none is given', async () => {
    await dpApi.get(url)

    expect(fetchMock.mock.calls[0][1]).not.toHaveProperty('signal')
  })

  it('rejects with the AbortError itself when the request is aborted', async () => {
    fetchMock.mockImplementation(() => Promise.reject(new DOMException('Aborted', 'AbortError')))
    const { signal } = new AbortController()

    const error = await dpApi.get(url, {}, { signal }).catch(caught => caught)

    expect(error).toBeInstanceOf(DOMException)
    expect(error).toMatchObject({ name: 'AbortError' })
  })

  it('keeps mapping other fetch failures to the synthetic 400 response', async () => {
    fetchMock.mockImplementation(() => Promise.reject(new TypeError('Failed to fetch')))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const error = await dpApi.get(url).catch(caught => caught)

    expect(error).toMatchObject({ status: '400', data: null })
  })
})
