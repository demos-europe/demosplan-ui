import { dpApi } from '../../../lib'

/**
 * Fetch File-Ids by their hashes
 *
 * @param {Array<hashes>}
 *
 * @returns {Array<Ids>}
 */
function getFileIdsByHash (hashes, route) {
  return dpApi.get(
    route,
    {
      filter: {
        hasHash: {
          condition: {
            operator: 'IN',
            path: 'hash',
            value: hashes
          }
        }
      }
    },
    {
      serialize: true
    }
  )
    .then(({ data }) => {
      return data.data.map(el => el.id)
    })
}

export { getFileIdsByHash }
