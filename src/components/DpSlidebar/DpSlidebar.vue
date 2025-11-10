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
      <div class="u-ml-1_5">
        <button
          type="button"
          class="btn--blank o-link--default u-mt-0_5 u-n-ml u-mb"
          data-slidebar-hide=""
          @click="$emit('close')"
        >
          <dp-icon
            icon="close"
            size="large"
          />
        </button>
        <slot />
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
