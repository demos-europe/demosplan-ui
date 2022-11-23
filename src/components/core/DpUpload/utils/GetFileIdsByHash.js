import { dpApi } from '@demos-europe/demosplan-utils'

/**
 * Fetch File-Ids by their hashes
 *
 * @param {Array<hashes>}
 *
 * @returns {Array<Ids>}
 */
function getFileIdsByHash (hashes) {
  return dpApi.get(
    Routing.generate('api_resource_list', { resourceType: 'File' }),
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
