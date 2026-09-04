import hasOwnProp from './hasOwnProp'

/**
 * Sort array of strings or objects alphabetically with german locale.
 * @param array {Array<String>|Array<Object>} Array to sort
 * @param sortBy {String} Property (or dot-separated chain of properties) of an object to use for sorting. Required only for array of objects.
 * @param direction {('asc'|'desc')} Sorting direction, can be asc or desc. Default is asc.
 */

export default function sortAlphabetically (array, sortBy, direction = 'asc') {
  const sortedArray = array
  const directionMultiplier = direction === 'desc' ? -1 : 1

  // Is it an array of objects or strings?
  if (typeof sortedArray[0] === 'string') {
    sortedArray.sort((a, b) => directionMultiplier * a.trim().localeCompare(b.trim(), 'de', { sensitivity: 'base' }))
  } else if (typeof array[0] === 'object' && array[0] !== null && typeof sortBy === 'string' && sortBy.length > 0) {
    const sortProperties = sortBy.split('.')

    sortedArray.sort((a, b) => {
      let sortPropertyA = a
      let sortPropertyB = b

      for (const prop of sortProperties) {
        sortPropertyA = typeof sortPropertyA === 'object' && sortPropertyA !== null && hasOwnProp(sortPropertyA, prop) ? sortPropertyA[prop] : undefined
        sortPropertyB = typeof sortPropertyB === 'object' && sortPropertyB !== null && hasOwnProp(sortPropertyB, prop) ? sortPropertyB[prop] : undefined
      }

      const aIsString = typeof sortPropertyA === 'string'
      const bIsString = typeof sortPropertyB === 'string'

      // Items without the sort value always sort last, regardless of direction.
      if (!aIsString && !bIsString) {
        return 0
      } else if (!aIsString) {
        return 1
      } else if (!bIsString) {
        return -1
      }

      return directionMultiplier * sortPropertyA.trim().localeCompare(sortPropertyB.trim(), 'de', { sensitivity: 'base' })
    })
  }

  return sortedArray
}
