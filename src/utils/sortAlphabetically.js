import hasOwnProp from './hasOwnProp'

/**
 * Sort array of strings or objects alphabetically with german locale.
 * @param array {Array<String>|Array<Object>} Array to sort
 * @param sortBy {String} Property (or dot-separated chain of properties) of an object to use for sorting. Required only for array of objects.
 * @param direction {('asc'|'desc')} Sorting direction, can be asc or desc. Default is asc.
 */

export default function sortAlphabetically (array, sortBy, direction = 'asc') {
  const sortedArray = array
  // Is it an array of object or strings?
  if (typeof sortedArray[0] === 'string') {
    sortedArray.sort((a, b) => a.trim().localeCompare(b.trim(), 'de', { sensitivity: 'base' }))
  } else if (typeof array[0] === 'object' && array[0] !== null) {
    sortedArray.sort((a, b) => {
      const sortProperties = sortBy.split('.')
      let sortPropertyA = a
      let sortPropertyB = b

      for (const prop of sortProperties) {
        if (hasOwnProp(sortPropertyA, prop) && hasOwnProp(sortPropertyB, prop)) {
          sortPropertyA = sortPropertyA[prop]
          sortPropertyB = sortPropertyB[prop]
        }
      }

      if (typeof sortPropertyA !== 'string' || typeof sortPropertyB !== 'string') {
        return 0
      }

      return sortPropertyA.trim().localeCompare(sortPropertyB.trim(), 'de', { sensitivity: 'base' })
    })
  }

  if (direction === 'desc') {
    sortedArray.reverse()
  }

  return sortedArray
}
