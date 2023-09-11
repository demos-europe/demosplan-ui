<template>
  <dp-icon
    :aria-label="ariaLabel"
    :icon="icon"
    :size="size"
    v-tooltip="text" />
</template>

<script>
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import { SIZES } from '~/components/DpIcon/util/iconVariables'
import { Tooltip } from '~/directives'

export default {
  name: 'DpContextualHelp',

  components: {
    DpIcon
  },

  props: {
    /**
     * The icon displayed as trigger for the tooltip.
     */
    icon: {
      type: String,
      required: false,
      default: 'question'
    },

    /**
     * The icon size. May be small, medium, or large.
     */
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (prop) => Object.keys(SIZES).includes(prop)
    },

    /**
     * A string representing the actual tooltip content. May include html.
     */
    text: {
      type: String,
      required: true
    }
  },

  directives: {
    tooltip: Tooltip
  },

  data () {
    return {
      ariaLabel: de.contextualHelp
    }
  }
}
</script>
