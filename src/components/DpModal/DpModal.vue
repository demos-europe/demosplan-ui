<template>
  <dialog
    ref="dialog"
    :aria-label="ariaLabel"
    :class="prefixClass('o-modal__content ' + contentClasses)"
    @close="onDialogClose"
    @click="onBackdropClick"
    @keydown.esc.prevent="close()"
    @animationend="onAnimationEnd"
  >
    <dp-button
      :aria-label="closeLabel"
      :class="prefixClass('absolute right-3 top-3')"
      data-cy="modal:close"
      hide-text
      icon="close"
      icon-size="large"
      :text="closeLabel"
      variant="transparent"
      @click.prevent.stop="close()"
    />
    <header
      v-if="hasHeader"
      :class="prefixClass(`border-b border-neutral px-4 pt-4 pb-2 ${contentHeaderClasses}`)"
    >
      <slot name="header" />
    </header>
    <div :class="prefixClass(`o-modal__body ${contentBodyClasses}`)">
      <div
        v-if="enableSmoothHeightTransition"
        :class="prefixClass('o-modal__transition-wrapper')"
        :style="{ height: contentHeight ? `${contentHeight}px` : 'auto' }"
      >
        <div ref="bodyContent">
          <slot />
        </div>
      </div>
      <slot v-else />
    </div>
    <footer
      v-if="hasFooter"
      :class="prefixClass('border-t border-neutral p-4')"
    >
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import DpButton from '~/components/DpButton'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpModal',

  components: {
    DpButton,
    DpIcon,
  },

  mixins: [prefixClassMixin],

  props: {
    ariaLabel: {
      required: false,
      type: String,
      default: '',
    },

    contentBodyClasses: {
      required: false,
      type: String,
      default: '',
    },

    contentClasses: {
      required: false,
      type: String,
      default: '',
    },

    contentHeaderClasses: {
      required: false,
      type: String,
      default: '',
    },

    enableSmoothHeightTransition: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'modal:toggled',
  ],

  data () {
    return {
      closeLabel: de.window.close,
      isClosing: false,
      contentHeight: 0,
      resizeObserver: null,
    }
  },

  computed: {
    hasFooter () {
      return this.$slots.footer !== undefined
    },

    hasHeader () {
      return this.$slots.header !== undefined
    },
  },

  methods: {
    toggle () {
      const dialog = this.$refs.dialog
      if (!dialog) {
        return
      }

      const isOpen = dialog.open

      if (isOpen) {
        this.close()
      } else {
        this.open()
      }
    },

    open () {
      const dialog = this.$refs.dialog
      if (!dialog) return

      dialog.showModal()
      this.preventScroll(true)

      // Trigger opening animation by adding class after dialog is shown
      this.$nextTick(() => {
        dialog.classList.add('o-modal--opening')
        this.updateContentHeight()
        this.initResizeObserver()

        // Focus the dialog itself to prevent auto-focus on the close button
        // This prevents the tooltip from showing immediately on modal open
        dialog.focus()
      })

      this.$emit('modal:toggled', true)
    },

    close () {
      const dialog = this.$refs.dialog
      if (!dialog) return

      // If already closing, don't start another close animation
      if (this.isClosing) return

      // Remove opening class if it exists and add closing class
      dialog.classList.remove('o-modal--opening')
      dialog.classList.add('o-modal--closing')
      this.isClosing = true

      // The actual close() will be called in onAnimationEnd after animation completes
    },

    onDialogClose () {
      const dialog = this.$refs.dialog
      if (dialog) {
        // Clean up animation classes
        dialog.classList.remove('o-modal--opening', 'o-modal--closing')
      }
      this.isClosing = false
      this.preventScroll(false)
      this.$emit('modal:toggled', false)
    },

    onAnimationEnd (event) {
      const dialog = this.$refs.dialog
      if (!dialog) return

      // Only handle animations on the dialog itself, not its children
      if (event.target !== dialog) return

      // If closing animation finished, now actually close the dialog
      if (this.isClosing && dialog.classList.contains('o-modal--closing')) {
        dialog.close()
      }
    },

    onBackdropClick (event) {
      // Close dialog when clicking on the backdrop (outside the dialog content)
      const dialog = this.$refs.dialog
      if (event.target === dialog) {
        this.close()
      }
    },

    /**
     * By setting the html element to overflow: hidden, content behind the opened modal is locked for scrolling.
     * To prevent page jumps when the scroll bar disappears, a padding is put onto the body element.
     *
     * @param {boolean} toggleIn
     */
    preventScroll (toggleIn) {
      const htmlElement = document.querySelector('html')
      const bodyElement = document.querySelector('body')

      if (toggleIn) {
        htmlElement.style.overflow = 'hidden'
        bodyElement.style.overflowY = 'scroll'
      } else {
        htmlElement.style.overflow = null
        bodyElement.style.overflowY = null
      }
    },

    /**
     * Update the content height for smooth transitions
     */
    updateContentHeight () {
      if (!this.enableSmoothHeightTransition) {
        return
      }

      this.$nextTick(() => {
        const contentEl = this.$refs.bodyContent

        if (contentEl) {
          this.contentHeight = contentEl.scrollHeight
        }
      })
    },

    /**
     * Initialize ResizeObserver for automatic height updates
     */
    initResizeObserver () {
      if (!this.enableSmoothHeightTransition || typeof ResizeObserver === 'undefined') {
        return
      }

      this.resizeObserver = new ResizeObserver(() => {
        this.updateContentHeight()
      })

      const contentEl = this.$refs.bodyContent

      if (contentEl) {
        this.resizeObserver.observe(contentEl)
      }
    },

    destroyResizeObserver () {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
    },
  },

  mounted () {
    this.initResizeObserver()
  },

  beforeUnmount () {
    this.destroyResizeObserver()
  },
}
</script>
