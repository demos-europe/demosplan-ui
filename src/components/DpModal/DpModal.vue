<template>
  <dialog
    ref="dialog"
    :aria-label="ariaLabel"
    :class="prefixClass('o-modal__content ' + contentClasses)"
    @close="onDialogClose"
    @click="onBackdropClick"
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

    //  Required when toggling modal with toggleByEvent()
    modalId: {
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
    }
  },

  computed: {
    hasHeader () {
      return typeof this.$slots.header !== 'undefined'
    },
  },

  methods: {
    /**
     * Deprecated - not used anymore
     * @param modalId
     */
    toggleByEvent (modalId) {
      //  Do not execute without a specified modalId to prevent unintentional toggling of multiple modals
      if (typeof modalId === 'undefined') {
        return
      }

      //  Check if event specifies the correct modal instance
      if (this.modalId === modalId) {
        this.toggle()
      }
    },

    toggle () {
      const dialog = this.$refs.dialog
      if (!dialog) return

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
      this.$emit('modal:toggled', true)
    },

    close () {
      const dialog = this.$refs.dialog
      if (!dialog) return

      dialog.close()
      // preventScroll(false) will be called in onDialogClose
    },

    onDialogClose () {
      this.preventScroll(false)
      this.$emit('modal:toggled', false)
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
