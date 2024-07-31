import { VPopover as Popover } from 'v-tooltip'
import { destroyTooltip, initTooltip, updateTooltip } from '~/components/DpTooltip/utils/tooltip'

/**
 * @deprecated Use DpTooltip instead
 *
 * @type {VueConstructor<Vue>}
 */
const VPopover = Popover

/*
 * Merge custom config into default options for tooltip config.
 */
const tooltipConfig = {
  defaultHtml: true,
  defaultBoundariesElement: 'scrollParent',
  defaultDelay: {
    show: 300,
    hide: 100
  },
  defaultOffset: 12,
  defaultTemplate: `
    <div class="z-tooltip cursor-help max-w-13" role="tooltip">
      <div class="absolute bg-surface-dark z-below-zero h-2 w-2 transform rotate-45 -translate-y-1 -translate-x-1"></div>
      <div class="px-2 pt-1 pb-1.5 text-sm text-on-dark font-system-ui font-normal text-left relative whitespace-normal bg-surface-dark"></div>
    </div>`,
  popover: {
    defaultPlacement: 'top',
    defaultBaseClass: 'tooltip',
    defaultInnerClass: 'tooltip__inner',
    defaultArrowClass: 'tooltip__arrow',
    defaultDelay: {
      show: 300,
      hide: 100
    },
    defaultTrigger: 'hover'
  }
}
VPopover.options = { ...VPopover.options, ...tooltipConfig }

/**
 * v-tooltip directive
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
  }
}

export { VPopover, Tooltip }
