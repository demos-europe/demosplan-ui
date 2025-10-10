<template>
  <button
    type="button"
    class="o-link--default btn--blank"
    :aria-label="label"
    @click="toggle"
  >
    <i
      :class="iconClass"
      aria-hidden="true"
    />
  </button>
</template>

<script>
import { de } from '~/components/shared/translations'

export default {
  name: 'DpTreeListToggle',

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },

    iconClassProp: {
      type: String,
      required: false,
      default: '',
    },

    toggleAll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: [
    'input',
    'update:modelValue',
  ],

  computed: {
    /*
     * May be passed from outside, but defaults to angle icon controlled by state.
     * This is somewhat messy but removes cruft from DpTreeListNode.
     */
    iconClass () {
      const iconClasses = this.value ? 'fa-angle-up' : 'fa-angle-down'

      return this.iconClassProp === ''
        ? ('font-size-large line-height--1 u-p-0_25 fa ' + iconClasses)
        : this.iconClassProp
    },

    label () {
      // Here, the relatively generic term "element" is chosen to keep the wording generic.
      const toggleAllLabel = this.value ? de.aria.collapse.all : de.aria.expand.all
      const toggleLabel = this.value ? de.aria.collapse : de.aria.expand

      return this.toggleAll
        ? toggleAllLabel
        : toggleLabel
    },
  },

  methods: {
    toggle () {
      this.$emit('input', !this.value)
      this.$emit('update:modelValue', !this.value)
    },
  },
}
</script>
