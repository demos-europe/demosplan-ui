<template>
  <div
    class="c-slidebar u-pr-0"
    data-slidebar="right"
  >
    <div
      class="c-slidebar__container"
      data-slidebar-container=""
      data-cy="sidebarModal"
    >
      <!-- Drag handle for resizing slidebar -->
      <slot name="dragHandle" />

      <div class="c-slidebar__scroll-container">
        <div class="u-ml-1_5">
          <!-- The slidebar always docks to the right, so the close button sits at that outer edge. -->
          <div class="flex justify-end pt-2 pr-1">
            <button
              :aria-label="translations.close"
              :title="translations.close"
              type="button"
              class="btn--blank o-link--default"
              data-slidebar-hide
              @click="$emit('close')"
            >
              <dp-icon
                icon="close"
                size="large"
              />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import { hasOwnProp } from '~/utils'
import { SideNav } from '~/lib'

export default {
  name: 'DpSlidebar',

  components: {
    DpIcon,
  },

  props: {
    /**
     * Controls the slidebar from the outside. While this is `null`, the component keeps listening
     * for `show-slidebar` / `hide-slidebar` on the application event bus, so existing usages are
     * unaffected. Pass a boolean to drive it from your own state and opt out of those root events.
     */
    open: {
      type: Boolean,
      required: false,
      default: null,
    },
  },

  emits: [
    'close',
  ],

  data () {
    return {
      isVisible: false,
      sideNav: {},
      translations: {
        close: de.window.close,
      },
    }
  },

  watch: {
    open (isOpen) {
      this.applyOpenState(isOpen)
    },
  },

  methods: {
    /**
     * Ignores the initial `null`, which means "nobody is controlling me, listen on the bus".
     */
    applyOpenState (isOpen) {
      if (null === isOpen) {
        return
      }

      if (isOpen) {
        this.showSlideBar()

        return
      }

      /*
       * Deliberately not hideSlideBar(): that emits `close`, and reaching this point means the
       * state it announces has already been applied by whoever set the prop to false.
       */
      if (hasOwnProp(this.sideNav, 'hideSideNav')) {
        this.sideNav.hideSideNav()
        this.isVisible = false
      }
    },

    handleKeydown (event) {
      if (event.key === 'Escape' && this.isVisible) {
        this.hideSlideBar()
      }
    },

    hideSlideBar () {
      if (!this.isVisible) {
        return
      }

      if (hasOwnProp(this.sideNav, 'hideSideNav')) {
        this.sideNav.hideSideNav()
        this.isVisible = false
        this.$emit('close')
      }
    },

    showSlideBar () {
      if (this.isVisible) {
        return
      }

      if (hasOwnProp(this.sideNav, 'showSideNav')) {
        this.sideNav.showSideNav()
        this.isVisible = true
      }
    },
  },

  mounted () {
    // Initialize SideNav
    this.sideNav = new SideNav()
    document.addEventListener('keydown', this.handleKeydown)

    if (null !== this.open) {
      /*
       * The slidebar starts closed, so only an initially open state needs applying. Calling
       * hideSlideBar() here would emit `close` while the surrounding page is still mounting.
       */
      if (this.open) {
        this.showSlideBar()
      }

      return
    }

    this.$root.$on('hide-slidebar', () => {
      this.hideSlideBar()
    })

    this.$root.$on('show-slidebar', () => {
      this.showSlideBar()
    })
  },

  beforeUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)
  },
}
</script>
