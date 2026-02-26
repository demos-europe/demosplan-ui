<template>
  <span
    ref="target"
    v-on-click-outside="close"
    class="dp-flyout"
    :class="[{
      'is-expanded': isExpanded,
      'bg-surface-medium rounded-md': variant === 'dark'
    }, position]"
    data-cy="flyoutTrigger"
  >
    <button
      :disabled="disabled"
      type="button"
      aria-haspopup="true"
      :aria-label="ariaLabel !== '' ? ariaLabel : null"
      class="dp-flyout-trigger rounded-button leading-[2] whitespace-nowrap cursor-pointer"
      :class="[
        buttonClasses,
        { 'bg-interactive-subtle-hover': isExpanded && appearance === 'interactive' },
        appearanceClasses
      ]"
      :data-cy="dataCy !== '' ? dataCy : null"
      @click="toggle"
    >
      <slot
        name="trigger"
        :is-expanded="isExpanded"
      >
        <i class="fa fa-ellipsis-h" />
      </slot>
    </button>
    <span
      class="dp-flyout-content z-flyout shadow-sm bg-surface text-left"
      :class="[
        isExpanded ? `block ${flyoutPosition}` : 'hidden',
        {
          'left-1': align === 'left',
          'right-1': align === 'right',
          'top-1': align === 'top',
          'px-2 py-1': padded
        }
      ]"
      data-cy="flyout"
    >
      <slot />
    </span>
  </span>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components'

export default {
  name: 'DpFlyout',

  directives: {
    onClickOutside: vOnClickOutside,
  },

  props: {
    align: {
      required: false,
      type: String,
      default: 'right',
      validator: (prop) => ['left', 'right', 'top'].includes(prop),
    },

    appearance: {
      required: false,
      type: String,
      default: 'interactive',
      validator: (prop) => ['interactive', 'basic'].includes(prop),
    },

    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },

    buttonClasses: {
      required: false,
      type: String,
      default: 'px-1 py-0.5',
    },

    dataCy: {
      type: String,
      required: false,
      default: '',
    },

    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },

    flyoutPosition: {
      required: false,
      type: String,
      default: 'absolute',
      validator: (prop) => ['relative', 'absolute'].includes(prop),
    },

    padded: {
      required: false,
      type: Boolean,
      default: true,
    },

    position: {
      required: false,
      type: String,
      default: 'relative',
      validator: (prop) => ['relative', 'absolute'].includes(prop),
    },

    variant: {
      required: false,
      type: String,
      default: 'light',
      validator: (prop) => ['light', 'dark'].includes(prop),
    },
  },

  emits: ['close', 'open'],

  data () {
    return {
      isExpanded: false,
    }
  },

  computed: {
    appearanceClasses() {
      return {
        'text-black border border-input px-2': this.appearance === 'basic',
        'text-interactive hover:text-interactive-hover hover:bg-interactive-subtle-hover active:text-interactive-active active:bg-interactive-subtle-active': this.appearance === 'interactive',
      }
    },
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
    },
  },
}
</script>
