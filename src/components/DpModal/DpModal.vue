<template>
  <div
    :class="prefixClass('o-modal')"
    @keydown="checkKeyEvent">
    <transition
      name="content"
      appear
      @enter="preventScroll">
      <aside
        v-if="isOpenModal"
        :aria-label="ariaLabel"
        :class="prefixClass('o-modal__content ' + contentClasses)"
        role="dialog">
        <button
          :class="prefixClass('btn--blank o-link--default absolute u-right-0')"
          :aria-label="title"
          :title="title"
          @click.prevent.stop="toggle()">
          <dp-icon
            icon="close"
            size="large" />
        </button>
        <div :class="prefixClass('o-modal__body ' + contentBodyClasses)">
          <h2
            v-if="hasHeader"
            :class="prefixClass('font-size-h1 border--bottom u-pb-0_25 ' + contentHeaderClasses)">
            <slot name="header" />
          </h2>
          <slot name="default" />
        </div>
      </aside>
    </transition>
    <transition
      name="backdrop"
      appear
      @after-leave="preventScroll(false)">
      <div
        v-if="isOpenModal"
        :class="prefixClass('o-modal__backdrop')"
        @click.prevent.stop="toggle()" />
    </transition>
  </div>
</template>

<script>
import DpIcon from '~/components/DpIcon'
import { de } from '~/components/shared/translations'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpModal',

  components: {
    DpIcon
  },

  mixins: [prefixClassMixin],

  props: {
    ariaLabel: {
      required: false,
      type: String,
      default: ''
    },

    contentBodyClasses: {
      required: false,
      type: String,
      default: ''
    },

    contentClasses: {
      required: false,
      type: String,
      default: ''
    },

    contentHeaderClasses: {
      required: false,
      type: String,
      default: ''
    },

    //  Required when toggling modal with toggleByEvent()
    modalId: {
      required: false,
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isOpenModal: false,
      lastFocusedElement: '',
      focusableElements: [],
      title: de.window.close
    }
  },

  computed: {
    hasHeader () {
      return typeof this.$slots.header !== 'undefined'
    }
  },

  methods: {
    getFocusableElements () {
      const elementList = Array.from(this.$el.querySelectorAll('a, button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'))

      if (elementList.length <= 0) {
        this.focusableElements = []
      } else {
        this.focusableElements = [...elementList].filter(el => this.isElementVisible(el))
      }
    },

    isElementVisible (el) {
      const isInDom = el.offsetParent !== null
      const style = window.getComputedStyle(el)
      const isDisplayed = style.display !== 'none' && style.opacity !== '0'

      return isInDom && isDisplayed
    },

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
      this.isOpenModal = (this.isOpenModal === false)
      this.$emit('modal:toggled', this.isOpenModal)

      if (this.isOpenModal === true) {
        this.lastFocusedElement = document.activeElement
        // On toggle get all focusable elements and focus the first one (after everything is rendered)
        this.$nextTick(() => {
          this.getFocusableElements()

          if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus({ preventScroll: true })
          }
        })
      } else {
        this.preventScroll(false) // It could be removed after dropping the assessment table
        this.lastFocusedElement.focus()
      }
    },

    /**
     * By setting the html element to overflow: hidden, content behind the opened modal is locked for scrolling.
     * To prevent page jumps when the scroll bar disappears, a padding is put onto the body element.
     *
     * When toggling the modal in, this can be done immediately. When removing the modal, we have to wait for the
     * transition to finish, otherwise the modal jumps a little to the left when the "real scrollbar" appears again.
     * The @after-leave hook is called from the backdrop because the transition applied to it is slightly longer.
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

    checkKeyEvent (event) {
      // Close modal and return early if escape
      if (event.key === 'Escape') {
        this.toggle()
      } else if (event.key === 'Tab') {
        event.preventDefault()
        const eventTargetIndex = this.focusableElements.findIndex(el => el === event.target)
        const last = this.focusableElements.length - 1

        if (this.focusableElements.length < 2) {
          // Do nothing if only 1 or no elements to focus
        } else if (event.shiftKey === false && event.target === this.focusableElements[last]) {
          // If last element was previously focused, on tab jump to the first element
          this.focusableElements[0].focus()
        } else if (event.shiftKey === true && event.target === this.focusableElements[0]) {
          // If first element was focused, on tab+shift focus the last element
          this.focusableElements[last].focus()
        } else {
          const idxToFocus = event.shiftKey ? eventTargetIndex - 1 : eventTargetIndex + 1
          this.focusableElements[idxToFocus].focus()
        }
      }
    }
  },

  updated () {
    // When component is re-rendered, we have to collect all focusable elements again, as new ones may have appeared
    this.$nextTick(() => this.getFocusableElements())
  }

}
</script>
