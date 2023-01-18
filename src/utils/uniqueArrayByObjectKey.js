import hasOwnProp from './hasOwnProp'

/**
 * Filter array of objects to hold unique values, using an object property.
 * @param array The array of objects that should be "de-duplicated"
 * @param key   The property in the objects, that should be unique
 * @return {*}
 */
export default function uniqueArrayByObjectKey (array, key) {
  const a = array.concat()
  if (a && hasOwnProp(a[0], key)) {
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i][key] === a[j][key]) {
          a.splice(j--, 1)
        }
      }
    }
  }

  return a
}
