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
    <button
      :class="prefixClass('btn--blank o-link--default absolute u-right-0')"
      :aria-label="title"
      :title="title"
      @click.prevent.stop="close()"
    >
      <dp-icon
        icon="close"
        size="large"
      />
    </button>
    <div :class="prefixClass('o-modal__body ' + contentBodyClasses)">
      <h2
        v-if="hasHeader"
        :class="prefixClass('font-size-h1 border--bottom u-pb-0_25 ' + contentHeaderClasses)"
      >
        <slot name="header" />
      </h2>
      <slot name="default" />
    </div>
  </dialog>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpModal',

  components: {
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
  },

  emits: [
    'modal:toggled',
  ],

  data () {
    return {
      title: de.window.close,
      isClosing: false,
    }
  },

  computed: {
    hasHeader () {
      return typeof this.$slots.header !== 'undefined'
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
  },

}
</script>
