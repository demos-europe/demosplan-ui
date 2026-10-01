<template>
  <span
    class="toggle-wrapper"
    role="checkbox"
    :aria-checked="modelValue.toString()"
    :aria-disabled="disabled ? true : null"
    :aria-label="toggleAriaLabel"
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

  compatConfig: { COMPONENT_V_MODEL: false },

  props: {
    ariaLabel: {
      required: false,
      type: String,
      default: '',
    },

    modelValue: {
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
    'update:modelValue',
  ],

  computed: {
    backgroundStyles () {
      return {
        backgroundColor: this.modelValue ? '#3490dc' : '#dae1e7',
      }
    },

    indicatorStyles () {
      return { transform: this.modelValue ? 'translateX(1rem)' : 'translateX(0)' }
    },

    toggleAriaLabel () {
      const action = this.modelValue ? de.aria.deactivate.element : de.aria.activate.element

      if (!this.ariaLabel) {
        return action
      }

      return `${action}: ${this.ariaLabel}`
    },
  },

  methods: {
    toggle () {
      if (this.disabled === false) {
        this.$emit('update:modelValue', !this.modelValue)
      }
    },
  },
}
</script>
