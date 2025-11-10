<template>
  <button
    v-tooltip="{
      content: text,
      delay: { show: 1000, hide: 200 }
    }"
    class="btn--icon"
    @click="$emit('click')"
  >
    <i
      :class="`fa ${icon}`"
      aria-hidden="true"
    />
    <span class="sr-only">{{ text }}</span>
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

  directives: {
    tooltip: Tooltip,
  },

  props: {
    icon: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },

  emits: [
    'click',
  ],
}
</script>
