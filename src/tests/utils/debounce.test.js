import { debounce } from '../../index'

describe('debounce', () => {
    beforeEach(() => {
        /*
        * jest.useFakeTimers() enables fake timers.
        * This is replacing the original implementation of setTimeout() and other timer functions.
        * Timers can be restored to their normal behavior with jest.useRealTimers().
        */
        jest.useFakeTimers()
    })
    it('doesnt call the function if it has a waiting time', () => {
        const callback = jest.fn()
        const debounced = debounce(callback, 500)
        debounced(callback)
        expect(callback).not.toBeCalled()

        jest.advanceTimersByTime(100)
        debounced();
        expect(callback).not.toBeCalled()

        jest.advanceTimersByTime(499)
        expect(callback).not.toBeCalled()

        jest.advanceTimersByTime(300)
        expect(callback).toBeCalledTimes(1)
    })

    it('fires the callback, when immediate is true, no matter of the waiting time', () => {
        const callback = jest.fn();
        const debounced = debounce(callback, 500, true)
        expect(callback).not.toBeCalled()
        debounced()
        expect(callback).toBeCalledTimes(1)

        jest.advanceTimersByTime(100)
        debounced()
        expect(callback).toBeCalledTimes(1)

        jest.advanceTimersByTime(499)
        expect(callback).toBeCalledTimes(1)

        jest.advanceTimersByTime(1)
        expect(callback).toBeCalledTimes(1)

        jest.advanceTimersByTime(700)
        debounced()
        expect(callback).toBeCalledTimes(2)
    })
})