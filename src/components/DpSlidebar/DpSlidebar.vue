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
        <!--
          The flex column needed so that slot content can pin a footer to the bottom via flex-1.
        -->
        <div class="u-ml-1_5 flex flex-col h-full">
          <!-- The slidebar always docks to the right, so the close button sits at that outer edge. -->
          <div class="flex justify-end pt-2 pr-1">
            <button
              :aria-label="translations.close"
              :title="translations.close"
              type="button"
              class="btn--blank o-link--default"
              data-slidebar-hide
              @click="hideSlideBar"
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
    open: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'close',
    'update:open',
  ],

  data () {
    return {
      translations: {
        close: de.window.close,
      },
    }
  },

  watch: {
    open (isOpen) {
      if (isOpen) {
        this.showSlideBar()

        return
      }

      /*
       * Deliberately not hideSlideBar(): that emits `close`/`update:open`, and reaching this
       * point means the state it announces has already been applied by whoever set the prop.
       * suppressNextHideEmit tells the SideNav onHide callback to skip re-announcing it
       */
      if (hasOwnProp(this.sideNav, 'hideSideNav')) {
        this.suppressNextHideEmit = true
        this.sideNav.hideSideNav()
      }
    },
  },

  methods: {
    handleKeydown (event) {
      if (event.key === 'Escape' && this.isVisible()) {
        this.hideSlideBar()
      }
    },

    // Fires for every close path SideNav knows about (button, escape, backdrop click, swipe).
    handleSideNavHide () {
      if (this.suppressNextHideEmit) {
        this.suppressNextHideEmit = false

        return
      }

      this.$emit('update:open', false)
      this.$emit('close')
    },

    hideSlideBar () {
      if (!this.isVisible()) {
        return
      }

      if (hasOwnProp(this.sideNav, 'hideSideNav')) {
        this.sideNav.hideSideNav()
      }
    },

    // The slidebar is open while SideNav keeps the `is-visible` class on the root element.
    isVisible () {
      return this.$el.classList.contains('is-visible')
    },

    showSlideBar () {
      if (this.isVisible()) {
        return
      }

      if (hasOwnProp(this.sideNav, 'showSideNav')) {
        this.sideNav.showSideNav()
      }
    },
  },

  mounted () {
    // Non-reactive: SideNav wraps DOM/CSS state, not something Vue needs to track.
    this.suppressNextHideEmit = false
    this.sideNav = new SideNav(this.handleSideNavHide)
    document.addEventListener('keydown', this.handleKeydown)

    /*
     * The slidebar starts closed, so only an initially open state needs applying. Calling
     * hideSlideBar() here would emit `close` while the surrounding page is still mounting.
     */
    if (this.open) {
      this.showSlideBar()
    }
  },

  beforeUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)
  },
}
</script>
