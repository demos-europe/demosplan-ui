<template>
  <dp-icon
    :aria-label="ariaLabel"
    :icon="icon"
    :size="size"
    class="inline-block"
    v-tooltip="tooltip" />
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
     * If you want to pass additional options, use the 'tooltipOptions' prop instead
     * ('tooltipOptions.content' for text)
     */
    text: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * For available options check https://floating-vue.starpad.dev/legacy/v2/#other-options
     * When using, pass text via the 'content' property instead of using the 'text' prop above
     */
    tooltipOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  directives: {
    tooltip: Tooltip
  },

  data () {
    return {
      ariaLabel: de.contextualHelp
    }
  },

  computed: {
    /**
     * @return {string|object} Returns either text only or text and other options
     */
    tooltip () {
      return Object.keys(this.tooltipOptions).length > 0
        ? this.tooltipOptions
        : this.text
    }
  },

  mounted () {
    if (!this.text && !this.tooltipOptions.content) {
      console.error('DpContextualHelp: No tooltip content provided. Add the "tooltipOptions.content" prop.')
    }
  }
}
</script>
