<template>
  <i
    v-tooltip="text"
    class="fa"
    :class="[icon, large ? 'fa-lg' : '']" />
</template>

<script>
/**
 * A component rendering a tooltip with an icon trigger.
 * @deprecated Use DpContextualHelp instead.
 */
import { Tooltip } from '~/directives'

export default {
  name: 'DpTooltipIcon',

  directives: {
    tooltip: Tooltip
  },

  props: {
    icon: {
      required: true,
      type: String
    },

    text: {
      required: true,
      type: String
    },

    large: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
