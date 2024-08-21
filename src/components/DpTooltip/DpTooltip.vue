<template>
  <component
    :is="nodeType"
    class="inline-block">
    <slot />
  </component>
</template>

<script>
import { destroyTooltip, initTooltip } from './utils/tooltip'
import { CleanHtml } from '~/directives'

export default {
  name: 'DpTooltip',

  directives: {
    cleanhtml: CleanHtml
  },

  props: {
    container: {
      type: String,
      required: false
    },

    placement: {
      type: String,
      required: false,
      default: 'top'
    },

    nodeType: {
      type: String,
      required: false,
      default: 'div'
    },

    text: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      tooltipHook: null
    }
  },

  mounted () {
    this.tooltipHook = this.$el

    // Check if there is exact one Child DOM-Element in the slot
    // If so, put the tooltip on that element, otherwise on the wrapper
    if (this.$el.hasChildNodes() && this.$el.childNodes.length === 1 && Object.keys(this.$el.childNodes[0]).length > 0) {
      this.tooltipHook = this.$el.childNodes[0]
    }

    const value = this.$slots.popover? this.$slots.popover()[0] : this.text
    initTooltip(this.tooltipHook, value, { place: this.placement, container: this.container })
  },

  beforeUnmount () {
    destroyTooltip(this.tooltipHook)
  }
}
</script>
