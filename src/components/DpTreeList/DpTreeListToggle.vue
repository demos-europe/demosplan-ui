<template>
  <button
    type="button"
    class="o-link--default btn--blank"
    :aria-label="label"
    @click="toggle">
    <i
      :class="iconClass"
      aria-hidden="true" />
  </button>
</template>

<script>
import { de } from '~/components/shared/translations'

export default {
  name: 'DpTreeListToggle',

  compatConfig: {
    COMPONENT_V_MODEL: false
  },

  emits: ['update:modelValue'],

  props: {
    iconClassProp: {
      type: String,
      required: false,
      default: ''
    },

    modelValue: {
      type: Boolean,
      required: false,
      default: false
    },

    toggleAll: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    /*
     * May be passed from outside, but defaults to angle icon controlled by state.
     * This is somewhat messy but removes cruft from DpTreeListNode.
     */
    iconClass () {
      return this.iconClassProp !== ''
        ? this.iconClassProp
        : ('font-size-large line-height--1 u-p-0_25 fa ' + (this.modelValue ? 'fa-angle-up' : 'fa-angle-down'))
    },

    label () {
      // Here, the relatively generic term "element" is chosen to keep the wording generic.
      return this.toggleAll
        ? this.modelValue ? de.aria.collapse.all : de.aria.expand.all
        : this.modelValue ? de.aria.collapse : de.aria.expand
    }
  },

  methods: {
    toggle () {
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
}
</script>
