import { VPopover as Popover } from 'v-tooltip'
import { destroyTooltip, initTooltip } from '../../components/DpTooltip/utils/tooltip'

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
  defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip__arrow"></div><div class="tooltip__inner"></div></div>',
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
  inserted: function (element, binding) {
    initTooltip(element, binding.value, { placement: 'top' })
  },
  unbind: function (element) {
    destroyTooltip(element)
  }
}

export { VPopover, Tooltip }
