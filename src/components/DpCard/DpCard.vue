<template>
  <div class="shadow-sm space-inset-m">
    <h4
      v-if="heading !== ''"
      class="u-mb-0 space-inline-xs">
      <span>
        {{ heading }}
      </span>
      <dp-contextual-help
        v-if="headingTooltip !== ''"
        :text="headingTooltip" />
    </h4><!--
 --><slot />
  </div>
</template>

<script>
import DpContextualHelp from '~/components/DpContextualHelp'

export default {
  name: 'DpCard',

  components: {
    DpContextualHelp
  },

  props: {
    /**
     * The card heading is displayed as a bold text with medium font size.
     */
    heading: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * A contextual help tooltip right beside the card heading may reveal additional information.
     */
    headingTooltip: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
