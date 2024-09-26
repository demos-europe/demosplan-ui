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
        this.resetCleanup()

        document.removeEventListener('click', this.handleOutsideClick)
        const flyoutParent = this.$refs.flyout.parentElement
        if (flyoutParent) {
          this.$refs.flyout.remove()
          flyoutParent.remove()
        }
      }
    },

    closeFlyout () {
      this.$emit('close')
      const flyoutParent = this.$refs.flyout.parentElement
      if (flyoutParent) {
        flyoutParent.remove()
      }
      this.resetCleanup()
      document.removeEventListener('click', this.handleOutsideClick)
    },

    handleOutsideClick (event) {
      if (!this.$el.contains(event.target) && !this.$refs.flyout.contains(event.target)) {
        this.isExpanded = false
        this.resetCleanup()

        // Remove the flyout element and its parent container
        const flyoutParent = this.$refs.flyout.parentElement
        if (flyoutParent) {
          this.$refs.flyout.remove()
          flyoutParent.remove()
        }
      }
    },

    openFlyout () {
      this.$emit('open')

      // Create a parent div for the Flyout element, add Flyout and reference classes for styling.
      const flyoutParent = document.createElement('div')
      flyoutParent.classList.add('o-flyout', ...this.$refs.reference.classList)
      document.body.appendChild(flyoutParent)
      flyoutParent.appendChild(this.$refs.flyout)

      this.$nextTick(() => {
        this.updateFlyoutPlacement(this.$refs.flyout)

        // Activate automatic position updates to ensure the floating element remains anchored to its reference element.
        this.cleanup = autoUpdate(
          this.$refs.reference,
          this.$refs.flyout,
          () => this.updateFlyoutPlacement(this.$refs.flyout)
        )
      })
      document.addEventListener('click', this.handleOutsideClick)
    },

    toggle () {
      this.isExpanded = !this.isExpanded

      if (this.isExpanded) {
        this.openFlyout()
      } else {
        this.closeFlyout()
      }
    },

    resetCleanup () {
      // Only call cleanup if it's a valid function
      if (typeof this.cleanup === 'function') {
        this.cleanup()
      }
      this.cleanup = null
    },

    updateFlyoutPlacement (flyoutEl) {
     this.cleanup = computePosition(this.$refs.reference, flyoutEl, {
        placement: this.align === 'left' ? 'bottom-start' : 'bottom-end',
        strategy: 'relative',
        middleware: [
          offset(10),
          flip({
            fallbackPlacements: ['top-start', 'top-end']
          }),
          shift({ padding: 8 })
        ],
      }).then(({ x, y }) => {
        Object.assign(flyoutEl.style, {
          left: `${x}px`,
          top: `${y}px`,
          position: 'relative',
          display: 'block'
        })
      })
    }
  },

  mounted () {
    if (this.isExpanded) {
      this.$nextTick(() => {
        this.updateFlyoutPlacement(this.$refs.flyout)
      })
    }
  },

  beforeDestroy () {
    this.resetCleanup()
    document.removeEventListener('click', this.handleOutsideClick)
  }
}
</script>
