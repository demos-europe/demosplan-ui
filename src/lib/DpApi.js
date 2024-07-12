import hasOwnProp from '../utils/hasOwnProp'
import { stringify } from 'qs'
import { v4 as uuid } from 'uuid'

let currentProcedureId = null
let jwtToken = null
let csrfToken = null

if (typeof dplan !== 'undefined') {
  if (hasOwnProp(dplan, 'procedureId')) {
    currentProcedureId = dplan.procedureId
  }
  if (hasOwnProp(dplan, 'jwtToken')) {
    jwtToken = dplan.jwtToken
    csrfToken = dplan.csrfToken
  }
}

const apiDefaultHeaders = {
  'X-JWT-Authorization': 'Bearer ' + jwtToken,
  'x-csrf-token': csrfToken
}

const api2defaultHeaders = {
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'X-JWT-Authorization': 'Bearer ' + jwtToken
}

const demosplanProcedureHeaders = {
  'X-Demosplan-Procedure-Id': currentProcedureId
}

const getHeaders = function ({ headers, url }) {
  return {
    ...(url.includes('api/2.0/') ? api2defaultHeaders : apiDefaultHeaders),
    ...(currentProcedureId !== null ? demosplanProcedureHeaders : {}),
    ...headers
  }
}

const appendSerializedUrlParams = (url, params) => {
  if (!params || Object.keys(params).length === 0) {
    return url
  }
  params = stringify(params, { encodeValuesOnly: true, arrayFormat: 'brackets' })

  // Url params may be already appended before passing it to dpApi, this must be handled accordingly.
  return url.includes('?') ? `${url}&${params}` : `${url}?${params}`
}

const doRequest = (async ({ method = 'GET', url, data = {}, headers, params }) => {
  const fetchOptions = {
    headers: getHeaders({ headers, url }),
    method
  }

  if (method.toUpperCase() !== 'GET') {
    if (data instanceof FormData) {
      fetchOptions.body = data
    } else {
      fetchOptions.body = JSON.stringify(data)
    }
  } else {
    url = appendSerializedUrlParams(url, params)
  }

  try {
    const response = await fetch(url, fetchOptions)
    const contentTypeHeader = response.headers.get('Content-Type')
    const contentType = contentTypeHeader ? contentTypeHeader.toLowerCase() : ''
    const content = contentType.includes('json')
      ? await response.json()
      : contentType.includes('text')
      ? await response.text()
      : null

    return {
      data: content,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      url: response.url
    }
  } catch (error) {
    console.error('DpAPI[doRequest] failed: ', error, 'fetchOptions: ', fetchOptions)

    return {
      data: null,
      status: '400',
      ok: 'Bad Request'
    }
  }
})

const dpApi = doRequest

dpApi.post = (url, params = {}, data = {}) => doRequest({ method: 'POST', url, data, params })
dpApi.get = (url, params = {}) => doRequest({ method: 'GET', url, params })
dpApi.put = (url, params = {}, data = {}) => doRequest({ method: 'PUT', url, data, params })
dpApi.patch = (url, params = {}, data = {}) => doRequest({ method: 'PATCH', url, data, params })
dpApi.delete = (url, params = {}, data = {}) => doRequest({ method: 'DELETE', url, params })

/**
 * Submit a request to the rpc_generic_post API, which implements JSON-RPC 2.0.
 *
 * @param {string} method     This is the RPC method (aka. action) to be invoked,
 *                            not the Http request method (which is "POST" in any case).
 * @param {object} params     Data to be used by the RPC method.
 * @param {string|null} id    Request id. Optional, defaults to a UUID v4.
 * @return {Promise}
 */
const dpRpc = function (method, params, id = null) {
  const data = {
    jsonrpc: '2.0',
    method,
    params,
    id: id === null ? uuid() : id
  }

  return doRequest({
    method: 'POST',
    url: Routing.generate('rpc_generic_post'),
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * Perform an external API call without any default headers
 */
const externalApi = async (url, data) => {
  return await fetch(url, data)
}

/**
 * Turn messages into notifications
 *
 * @param responseMeta
 * @return {boolean}
 */
const handleResponseMessages = function (responseMeta) {
  if (hasOwnProp(responseMeta, 'messages')) {
    for (const type in responseMeta.messages) {
      for (const message in responseMeta.messages[type]) {
        dplan.notify.notify(type, Translator.trans(responseMeta.messages[type][message]))
      }
    }
  }
}

/**
 * Perform rudimentary response validation, handle response messages.
 *
 * @param {Object} response
 *                    The response provided by the fetch API.
 *                    See https://developer.mozilla.org/en-US/docs/Web/API/Response
 * @param {Object} [messages]
 *                    Define messages to display with response codes that are expected to be returned
 *                    from a certain endpoint.
 * @param {Object} messages[(200|201|202|204)]
 *                    The response status code this particular message should be displayed with is represented
 *                    by the key of the respective property.
 * @param {String} messages[(200|201|202|204)].text
 *                    The actual text of the message.
 * @param {String} messages[(200|201|202|204)].type
 *                    The message type (may be 'confirm', 'error', 'info', or 'warning').
 * @return {Promise<any>}
 */
const checkResponse = function (response, messages) {
  return new Promise((resolve, reject) => {
    if (hasOwnProp(response, 'data') && response.data && hasOwnProp(response.data, 'meta')) {
      handleResponseMessages(response.data.meta)
      /*
       * Sometimes we get response with status 400 and to display the error messages hidden there we have
       * to pass response.meta (and not response.data.meta as above) to the messages handler
       */
    } else if (dplan !== undefined && dplan.debug && hasOwnProp(response, 'errors') && hasOwnProp(response, 'meta') && hasOwnProp(response.meta, 'messages')) {
      handleResponseMessages(response.meta)
    } else if (messages && hasOwnProp(messages, response.status)) {
      /*
       * The generic api (/api/2.0/{resourceType}) does not specify success messages.
       * Instead, custom messages passed by the calling component are displayed here.
       */
      dplan.notify.notify(messages[response.status].type, Translator.trans(messages[response.status].text))
    }

    if (response.status >= 400) {
      // @improve handle 404, 500 specially?
      reject(response.data)
    } else if (response.status === 200) {
      // Got data!
      resolve(response.data)
    } else {
      // Got no data
      resolve(null)
    }
  })
}

function makeFormPost (payload, url) {
  const postData = new FormData()

  for (const [key, value] of Object.entries(payload)) {
    if (Array.isArray(value)) {
      value.forEach(el => postData.append(key + '[]', el))
    } else {
      postData.append(key, value)
    }
  }

  return dpApi({
    method: 'POST',
    url: url,
    data: postData
  })
}

export { dpApi, handleResponseMessages, checkResponse, dpRpc, makeFormPost, externalApi }
