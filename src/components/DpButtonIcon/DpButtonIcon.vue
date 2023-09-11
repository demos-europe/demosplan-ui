<template>
  <button
    class="btn--icon"
    v-tooltip="{
      content: translatedText,
      delay: { show: 1000, hide: 200 }
    }"
    @click="$emit('click')">
    <i
      :class="`fa ${icon}`"
      aria-hidden="true" />
    <span class="hide-visually">{{ translatedText }}</span>
  </button>
</template>

<script>
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
  },

  computed: {
    translatedText () {
      return Translator.trans(this.text)
    }
  }
}
</script>
