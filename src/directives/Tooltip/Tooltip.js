import { destroyTooltip, initTooltip, updateTooltip } from '~/components/DpTooltip/utils/tooltip'

/**
 * V-tooltip directive
 *
 * @type {VueDirective}
 *
 * @param text{String|HTML}
 */
const Tooltip = {
  mounted: function (element, binding) {
    let content = binding.value
    let options = { place: 'top' }

    if (binding.value && typeof binding.value === 'object') {
      content = binding.value.content

      if (binding.value.container) {
        options = { ...options, container: binding.value.container }
      }

      if (binding.value.classes) {
        options = { ...options, classes: binding.value.classes }
      }
    }

    initTooltip(element, content, options)
  },

  updated: function (element, binding) {
    let content = binding.value
    let options = { place: 'top' }

    if (binding.value && typeof binding.value === 'object') {
      content = binding.value.content

      if (binding.value.container) {
        options = { ...options, container: binding.value.container }
      }

      if (binding.value.classes) {
        options = { ...options, classes: binding.value.classes }
      }
    }

    updateTooltip(element, content, options)
  },

  unmounted: function (element) {
    destroyTooltip(element)
  },
}

export { Tooltip }
