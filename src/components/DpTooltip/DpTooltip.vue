<template>
  <component
    :is="nodeType"
    class="inline-block">
    <slot />
  </component>
</template>

<script>
import { CleanHtml } from '../../directives'
import { destroyTooltip, initTooltip } from './utils/tooltip'

export default {
  name: 'DpTooltip',

  directives: {
    cleanhtml: CleanHtml
  },

  props: {
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
    initTooltip(this.tooltipHook, this.text, { placement: this.placement })
  },

  beforeDestroy () {
    destroyTooltip(this.tooltipHook)
  }
}
</script>
