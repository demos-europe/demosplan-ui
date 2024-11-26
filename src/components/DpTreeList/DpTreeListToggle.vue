<template>
  <button
    class="o-link--default btn--blank"
    :disabled="disabled"
    type="button"
    v-tooltip="tooltip"
    @click="toggle">
    <i
      :class="iconClass"
      aria-hidden="true" />
  </button>
</template>

<script>
import { Tooltip } from '~/directives'
import { de } from '~/components/shared/translations'

export default {
  name: 'DpTreeListToggle',

  directives: {
    tooltip: Tooltip
  },

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    iconClassProp: {
      type: String,
      required: false,
      default: ''
    },

    toggleAll: {
      type: Boolean,
      required: false,
      default: false
    },

    tooltipOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },

    value: {
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
      const icon = this.value ? 'fa-angle-up' : 'fa-angle-down'

      return this.iconClassProp !== ''
        ? this.iconClassProp
        : `font-size-large line-height--1 u-p-0_25 fa ${icon}`
    },

    label () {
      if (this.disabled) {
        return de.elements.none
      }

      const labelAll = this.value ? de.aria.collapse.all : de.aria.expand.all
      const labelSingle = this.value ? de.aria.collapse.element : de.aria.expand.element

      return this.toggleAll
        ? labelAll
        : labelSingle
    },

    tooltip () {
      return Object.keys(this.tooltipOptions).length > 0
        ?  {
          ...this.tooltipOptions,
          content: this.label
        }
        : this.label
    }
  },

  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
