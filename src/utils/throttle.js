/**
 * Throttle calls to a function. Arguments and context are preserved.
 * @param func
 * @param limit the interval to allow execution in
 * @return {Function}
 */
export default function throttle (func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
