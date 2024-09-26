<template>
  <div
    class="o-flyout inline-block"
    :class="{
      'o-flyout--left': align === 'left',
      'o-flyout--right': align === 'right',
      'o-flyout--padded': padded,
      'is-expanded': isExpanded,
      'o-flyout--menu': hasMenu
    }"
    data-cy="flyoutTrigger"
    ref="reference">
    <button
      :disabled="disabled"
      type="button"
      aria-haspopup="true"
      class="o-flyout__trigger btn--blank o-link--default u-ph-0_25 line-height--2 whitespace-nowrap"
      :data-cy="dataCy"
      @click="toggle">
      <slot
        name="trigger"
        v-bind:isExpanded="isExpanded">
        <i class="fa fa-ellipsis-h" />
      </slot>
    </button>
    <div
      class="o-flyout__content shadow"
      ref="flyout"
      data-cy="flyout">
      <slot />
    </div>
  </div>
</template>

<script>
import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom'

export default {
  name: 'DpFlyout',

  props: {
    align: {
      required: false,
      type: String,
      default: 'right',
      validator: (prop) => ['left', 'right'].includes(prop)
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
    }
  },

  data () {
    return {
      isExpanded: false,
      cleanup: null
    }
  },

  methods: {
    close () {
      if (this.isExpanded === true) {
        this.$emit('close')
        this.isExpanded = false
        this.cleanup?.()
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },

    toggle () {
      this.isExpanded = !this.isExpanded

      if (this.isExpanded) {
        this.$emit('open')
        const insertedEL = document.body.appendChild(this.$refs.flyout)

        this.$nextTick(() => {
          this.updatePosition(insertedEL)
          this.cleanup = autoUpdate(
            this.$refs.reference,
            this.$refs.flyout,
            () => this.updatePosition(this.$refs.flyout)
          )
        })

        document.addEventListener('click', this.handleOutsideClick)
      } else {
        this.$emit('close')
        this.$refs.flyout.remove()
        // Only call cleanup if it's a valid function
        if (typeof this.cleanup === 'function') {
          this.cleanup()
        }
        this.cleanup = null
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },

    updatePosition (el) {
      if (!this.$refs.reference || !el) return

      this.cleanup = computePosition(this.$refs.reference, el, {
        placement: this.align === 'left' ? 'bottom-start' : 'bottom-end',
        strategy: 'relative',
        middleware: [
          offset(10),
          flip({
            fallbackPlacements: ['top-start', 'top-end']
          }),
          shift({ padding: 8 })
        ],
      }).then(({x, y}) => {
        console.log(x, y)
        Object.assign(el.style, {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: '999999',
          display: 'block'
        })
      })
    },

    handleOutsideClick (event) {
      if (!this.$el.contains(event.target)) {
        this.isExpanded = false

        // Only call cleanup if it's a valid function
        if (typeof this.cleanup === 'function') {
          this.cleanup()
        }
        this.cleanup = null
        this.$refs.flyout.remove()
      }
    }
  },

  mounted () {
    if (this.isExpanded) {
      this.$nextTick(() => {
        this.updatePosition(this.$refs.flyout)
      })
    }
  },

  beforeDestroy () {
    this.cleanup?.()
    document.removeEventListener('click', this.handleOutsideClick)
  }
}
</script>
