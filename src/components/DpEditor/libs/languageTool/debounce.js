export function debounce(fn, delay) {
  let timeout

  return function () {
    const args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(function () {
      fn.apply(null, args)
    }, delay)
  }
}
