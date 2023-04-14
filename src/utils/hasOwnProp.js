/**
 * Shorthand for Object.prototype.hasOwnProperty.call
 * @param obj
 * @param prop
 * @return {boolean}
 */
export default function (obj, prop) {
  if (typeof obj !== 'object') {
    console.warn('Cannot check for property on a non-object, got type: ' + typeof obj)

    return false
  }

  if (obj === null) {
    return false
  }

  return Object.prototype.hasOwnProperty.call(obj, prop)
}
