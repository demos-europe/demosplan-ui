import debounce from '~/utils/debounce'

describe('debounce', () => {
  beforeEach(() => {
    /*
     * Jest.useFakeTimers() enables fake timers.
     * This is replacing the original implementation of setTimeout() and other timer functions.
     * Timers can be restored to their normal behavior with vi.useRealTimers().
     */
    vi.useFakeTimers()
  })
  it('does not call the function if the debounce is reset within the cooldown time', () => {
    const callback = vi.fn()
    const debounced = debounce(callback, 500)

    debounced()
    vi.advanceTimersByTime(400)

    debounced() // reset

    vi.advanceTimersByTime(499) // still in cooldown (1ms left)
    expect(callback).not.toBeCalled()

    vi.advanceTimersByTime(1) // cooldown finished
    expect(callback).toBeCalledTimes(1)
  })

  it('fires immediately and ignores calls within the cooldown time when immediate is true', () => {
    const callback = vi.fn()
    const debounced = debounce(callback, 500, true)

    debounced()
    expect(callback).toBeCalledTimes(1) // immediate execution

    debounced()
    vi.advanceTimersByTime(100) // still in cooldown (400ms left)
    expect(callback).toBeCalledTimes(1)

    vi.advanceTimersByTime(399) // just before cooldown ends (1ms left)
    expect(callback).toBeCalledTimes(1)

    vi.advanceTimersByTime(1) // cooldown finished
    debounced()
    expect(callback).toBeCalledTimes(2)
  })
})
