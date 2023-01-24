/**
 * Returns the scroll offset aka. the distance between the upper document position and the upper viewport position.
 * @return {number}
 * @private
 */
export default function getScrollTop () {
  return Math.abs(parseInt(window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop, 10))
}
