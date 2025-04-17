import { computed, isRef } from 'vue'
import DOMPurify from 'dompurify'

/**
 * Composable to sanitize HTML content.
 * @param {String|Ref<String>} rawHtml - The raw HTML content to sanitize.
 * @param {Object} options - Optional DOMPurify configuration.
 * @returns {ComputedRef<String>} - Sanitized HTML content.
 */
export function cleanHtml(rawHtml, options = {}) {
  return computed(() => {
    const content = isRef(rawHtml) ? rawHtml.value : rawHtml
    const _options = { ...options, ADD_ATTR: ['target'] }
    return DOMPurify.sanitize(content, _options)
  })
}
