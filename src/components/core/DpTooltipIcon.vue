<template>
  <i
    class="fa"
    :class="[icon, large ? 'fa-lg' : '']"
    v-tooltip="text" />
</template>

<script>
import { Tooltip } from '../../directives'

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
