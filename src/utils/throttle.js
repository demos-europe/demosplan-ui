/**
 * Throttle calls to a function. Arguments and context are preserved.
 * @param func
 * @param limit the interval to allow execution in
 * @return {Function}
 */
export default function throttle (func, limit) {
  let inThrottle

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
