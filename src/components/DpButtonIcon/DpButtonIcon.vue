<template>
  <button
    class="btn--icon"
    v-tooltip="{
      content: text,
      delay: { show: 1000, hide: 200 }
    }"
    @click="$emit('click')">
    <i
      :class="`fa ${icon}`"
      aria-hidden="true" />
    <span class="hide-visually">{{ text }}</span>
  </button>
</template>

<script>
/**
 * A component is only used within one addon.
 * @deprecated Use DpButton instead.
 */
import { Tooltip } from '~/directives'

export default {
  name: 'DpButtonIcon',

  props: {
    icon: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    }
  },

  directives: {
    tooltip: Tooltip
  }
}
</script>
