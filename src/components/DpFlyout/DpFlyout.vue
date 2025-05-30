<template>
  <span
    ref="target"
    v-on-click-outside="close"
    class="o-flyout"
    :class="{
      'o-flyout--left': align === 'left',
      'o-flyout--right': align === 'right',
      'o-flyout--padded': padded,
      'is-expanded': isExpanded,
      'o-flyout--menu': hasMenu,
      'bg-surface-medium rounded-md': variant === 'dark'
    }"
    data-cy="flyoutTrigger">
    <button
      :disabled="disabled"
      type="button"
      aria-haspopup="true"
      :aria-label="ariaLabel !== '' ? ariaLabel : null"
      class="o-flyout__trigger btn--blank o-link--default px-1 pt-0.5 line-height--2 whitespace-nowrap"
      :data-cy="dataCy !== '' ? dataCy : null"
      @click="toggle">
      <slot
        name="trigger"
        :is-expanded="isExpanded">
        <i class="fa fa-ellipsis-h" />
      </slot>
    </button>
    <div
      class="o-flyout__content shadow-sm"
      data-cy="flyout">
      <slot />
    </div>
  </span>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components'

export default {
  name: 'DpFlyout',

  directives: {
    onClickOutside: vOnClickOutside
  },

  props: {
    align: {
      required: false,
      type: String,
      default: 'right',
      validator: (prop) => ['left', 'right'].includes(prop)
    },

    ariaLabel: {
      type: String,
      required: false,
      default: ''
    },

    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    disabled: {
      required: false,
      type: Boolean,
      default: false
    },

    hasMenu: {
      required: false,
      type: Boolean,
      default: true
    },

    padded: {
      required: false,
      type: Boolean,
      default: true
    },

    variant: {
      required: false,
      type: String,
      default: 'light',
      validator: (prop) => ['light', 'dark'].includes(prop)
    },
  },

  emits: ['close', 'open'],

  data () {
    return {
      isExpanded: false
    }
  },

  methods: {
    close () {
      if (this.isExpanded === true) {
        this.$emit('close')
        this.isExpanded = false
      }
    },

    toggle () {
      this.isExpanded = !this.isExpanded

      if (this.isExpanded) {
        this.$emit('open')
      } else {
        this.$emit('close')
      }
    }
  }
}
</script>
