<template>
  <span
    class="toggle-wrapper"
    role="checkbox"
    :aria-checked="value.toString()"
    :aria-disabled="disabled ? true : null"
    :aria-label="ariaLabel"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <div
      v-show="disabled"
      class="toggle-disabled"
    />
    <span
      class="toggle-background"
      :style="backgroundStyles"
    />
    <span
      class="toggle-indicator"
      :style="indicatorStyles"
    />
  </span>
</template>

<script>
import { de } from '~/components/shared/translations'

// Simple Toggle by Adam Wathan https://jsfiddle.net/adamwathan/hfs34ye4/
export default {
  name: 'DpToggle',

  props: {
    ariaLabel: {
      required: false,
      type: String,
      default: '',
    },

    value: {
      type: Boolean,
      required: false,
      default: false,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: [
    'input',
  ],

  computed: {
    backgroundStyles () {
      return {
        backgroundColor: this.value ? '#3490dc' : '#dae1e7',
      }
    },

    indicatorStyles () {
      return { transform: this.value ? 'translateX(1rem)' : 'translateX(0)' }
    },

    ariaLabel () {
      const action = this.value ? de.aria.deactivate.element : de.aria.activate.element

      if (!this.ariaLabel) {
        return action
      }

      return `${action}: ${this.ariaLabel}`
    },
  },

  methods: {
    toggle () {
      if (this.disabled === false) {
        this.$emit('input', !this.value)
      }
    },
  },
}
</script>
