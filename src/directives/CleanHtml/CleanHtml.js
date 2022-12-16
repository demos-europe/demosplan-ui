import DOMPurify from 'dompurify'

/**
 * As we allow the target attr, we have to make sure that the link is safe.
 * Chromium seems to add `rel="noopener"` automatically as of v88, however
 * to also ensure correct behavior for other engines, the `rel` attr is added
 * whenever a target is set to "_blank".
 *
 * @see https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener/
 */
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  const nodeHasTarget = 'target' in node
  if (!nodeHasTarget) {
    return
  }
  const target = node.getAttribute('target')
  if (target === '_blank') {
    node.setAttribute('rel', 'noopener')
  }
})

/**
 * Checks the type of value and always returns an object to be used with setInnerHTML.
 * If a string is passed, its value is used as content.
 * @param value {Object<content, options>|String}
 * @return {{content}|*}
 */
const getOptions = (value) => {
  const type = typeof value
  if (type === 'string') {
    return {
      content: value
    }
  } else if (type === 'object') {
    return value
  }
}

/**
 * Apply a sanitized string to the innerHtml of element.
 * @param el
 * @param binding
 */
const setSanitizedInnerHTML = (el, binding) => {
  const { content, options = {} } = getOptions(binding.value)
  const _options = {...options, ...{ ADD_ATTR: ['target'] } }
  el.innerHTML = DOMPurify.sanitize(content, _options)
}

const CleanHtml = {
  bind: function (el, binding) {
    setSanitizedInnerHTML(el, binding)
  },
  update: function (el, binding) {
    if (binding.value !== binding.oldValue) {
      setSanitizedInnerHTML(el, binding)
    }
  }
}

export { CleanHtml }
