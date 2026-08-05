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
              type="button"
              class="btn--blank o-link--default"
              data-slidebar-hide=""
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
import DpIcon from '~/components/DpIcon'
import { hasOwnProp } from '~/utils'
import { SideNav } from '~/lib'

export default {
  name: 'DpSlidebar',

  components: {
    DpIcon,
  },

  emits: [
    'close',
  ],

  data () {
    return {
      sideNav: {},
    }
  },

  methods: {
    hideSlideBar () {
      if (hasOwnProp(this.sideNav, 'hideSideNav')) {
        this.sideNav.hideSideNav()
        this.$emit('close')
      }
    },

    showSlideBar () {
      if (hasOwnProp(this.sideNav, 'showSideNav')) {
        this.sideNav.showSideNav()
      }
    },
  },

  mounted () {
    // Initialize SideNav
    this.sideNav = new SideNav()

    this.$root.$on('hide-slidebar', () => {
      this.hideSlideBar()
    })

    this.$root.$on('show-slidebar', () => {
      this.showSlideBar()
    })
  },
}
</script>
