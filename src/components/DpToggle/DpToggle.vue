<template>
  <span
    class="toggle-wrapper"
    @click="toggle"
    role="checkbox"
    :aria-checked="value.toString()"
    :aria-disabled="disabled"
    tabindex="0"
    @keydown.space.prevent="toggle">
    <div
      v-show="disabled"
      class="toggle-disabled" />
    <span
      class="toggle-background"
      :style="backgroundStyles" />
    <span
      class="toggle-indicator"
      :style="indicatorStyles" />
  </span>
</template>

<script>
// Simple Toggle by Adam Wathan https://jsfiddle.net/adamwathan/hfs34ye4/
export default {
  name: 'DpToggle',

  compatConfig: {
    COMPONENT_V_MODEL: false
  },

  emits: ['update:model-value'],

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    modelValue: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    backgroundStyles () {
      return {
        backgroundColor: this.modelValue ? '#3490dc' : '#dae1e7'
      }
    },

    indicatorStyles () {
      return { transform: this.modelValue ? 'translateX(1rem)' : 'translateX(0)' }
    }
  },

  methods: {
    toggle () {
      if (this.disabled === false) {
        this.$emit('update:model-value', !this.modelValue)
      }
    }
  }
}
</script>
