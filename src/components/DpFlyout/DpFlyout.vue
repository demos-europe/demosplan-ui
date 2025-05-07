<template>
  <span
    ref="target"
    v-on-click-outside="close"
    class="dp-flyout relative"
    :class="{
      'is-expanded': isExpanded,
      'bg-surface-medium rounded-md': variant === 'dark'
    }"
    data-cy="flyoutTrigger">
    <button
      :disabled="disabled"
      type="button"
      aria-haspopup="true"
      :aria-label="ariaLabel !== '' ? ariaLabel : null"
      class="dp-flyout-trigger rounded-button px-1 py-0.5 leading-[2] whitespace-nowrap text-interactive hover:text-interactive-hover hover:bg-interactive-subtle-hover active:text-interactive-active active:bg-interactive-subtle-active"
      :class="{
        'bg-interactive-subtle-hover': isExpanded
      }"
      :data-cy="dataCy !== '' ? dataCy : null"
      @click="toggle">
      <slot
        name="trigger"
        :is-expanded="isExpanded">
        <i class="fa fa-ellipsis-h" />
      </slot>
    </button>
    <span
      class="dp-flyout-content z-flyout shadow bg-surface text-left"
      :class="{
        'block absolute': isExpanded,
        'hidden': !isExpanded,
        'left-1': align === 'left',
        'right-1': align === 'right',
        'px-2 py-1': padded
      }"
      data-cy="flyout">
      <slot />
    </span>
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
