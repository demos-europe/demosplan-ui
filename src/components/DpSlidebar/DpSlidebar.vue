<template>
  <div
    v-if="contained"
    ref="slidebarEl"
    class="fixed inset-0 z-modal overflow-hidden pr-0 pointer-events-none"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Slidebar container -->
    <div
      ref="containerEl"
      :class="containerClasses"
      data-cy="sidebarModal"
    >
      <button
        type="button"
        class="btn--blank o-link--default mt-2 ml-2 mb-4"
        @click="hideSlidebar"
      >
        <dp-icon
          icon="close"
          size="large"
        />
      </button>
      <div class="ml-5">
        <slot />
      </div>
    </div>
  </div>
  <div
    v-else
    ref="slidebarEl"
    class="fixed inset-0 z-modal overflow-hidden pr-0 pointer-events-none"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Slidebar container -->
    <div
      ref="containerEl"
      :class="containerClasses"
      data-cy="sidebarModal"
    >
      <button
        type="button"
        class="btn--blank o-link--default mt-2 ml-2 mb-4"
        @click="hideSlidebar"
      >
        <dp-icon
          icon="close"
          size="large"
        />
      </button>
      <div class="ml-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import DpIcon from '~/components/DpIcon'

export default {
  name: 'DpSlidebar',

  components: {
    DpIcon
  },

  props: {
    contained: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  emits: [
    'close'
  ],

  inject: {
    slidebarControl: {
      default: null,
    },
  },

  data () {
    return {
      isVisible: false,
      isAnimatable: false,
      touchingSidebar: false,
      startX: 0,
      currentX: 0,
      innerWidth: 0,
      initialTranslateX: 0
    }
  },

  computed: {
    containerClasses () {
      return [
        // Base styles
        'absolute right-0 w-full max-w-[30%] bg-white h-full',
        'flex flex-col will-change-transform pointer-events-auto',
        'shadow-xl overflow-y-auto',
        // Responsive (desk-down = max-lg in Tailwind, which is max-width: 1200px)
        'max-lg:max-w-[25%]',
        // Transform based on visibility
        {
          'translate-x-full': !this.isVisible,
          'translate-x-0': this.isVisible
        },
        // Transitions
        'transition-transform',
        {
          'duration-[130ms]': this.isAnimatable && !this.isVisible,
          'duration-[330ms]': this.isAnimatable && this.isVisible
        },
        'ease-[cubic-bezier(0,0,0.3,1)]'
      ]
    }
  },

  methods: {
    showSlidebar () {
      this.isAnimatable = true
      // Use nextTick to ensure the animatable class is applied before changing visibility
      this.$nextTick(() => {
        this.isVisible = true
        this.setFocusable(true)
      })
    },

    hideSlidebar () {
      this.isAnimatable = true
      this.isVisible = false
      this.setFocusable(false)
      this.$emit('close')
    },

    setFocusable (focusable) {
      if (!this.$refs.containerEl) return

      const focusableElements = this.$refs.containerEl.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      focusableElements.forEach(el => {
        if (focusable) {
          el.removeAttribute('tabindex')
        } else {
          el.setAttribute('tabindex', '-1')
        }
      })
    },

    onTouchStart (evt) {
      if (!this.isVisible) return

      this.startX = evt.touches[0].pageX
      this.currentX = this.startX
      this.touchingSidebar = true

      // Get initial translate value
      if (this.$refs.containerEl) {
        const transform = window.getComputedStyle(this.$refs.containerEl).transform
        this.initialTranslateX = this.getTranslateX(transform)
      }

      this.updateTransform()
    },

    onTouchMove (evt) {
      if (!this.touchingSidebar) return

      this.currentX = evt.touches[0].pageX
    },

    onTouchEnd () {
      if (!this.touchingSidebar) return

      this.touchingSidebar = false

      // Reset inline transform
      if (this.$refs.containerEl) {
        this.$refs.containerEl.style.transform = ''
      }

      // Determine if we should hide based on swipe distance
      const translateX = this.calculateTranslateX()
      if (translateX > this.initialTranslateX) {
        this.hideSlidebar()
      }
    },

    updateTransform () {
      if (!this.touchingSidebar) return

      requestAnimationFrame(this.updateTransform)

      const translateX = this.calculateTranslateX()
      if (this.$refs.containerEl) {
        this.$refs.containerEl.style.transform = `translateX(${translateX}px)`
      }
    },

    calculateTranslateX () {
      // For right-aligned sidebar, positive values move it right (hide)
      return Math.max(0, this.currentX - this.startX)
    },

    getTranslateX (transformString) {
      if (!transformString || transformString === 'none') return 0

      const matrixMatch = transformString.match(/^matrix\((.+)\)$/)
      if (matrixMatch) {
        const values = matrixMatch[1].split(', ')
        return parseFloat(values[4]) || 0
      }

      const matrix3dMatch = transformString.match(/^matrix3d\((.+)\)$/)
      if (matrix3dMatch) {
        const values = matrix3dMatch[1].split(', ')
        return parseFloat(values[12]) || 0
      }

      return 0
    }
  },

  mounted () {
    // Initialize width for touch calculations
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    this.innerWidth = window.innerWidth || e.clientWidth || g.clientWidth

    // Set initial focusable state
    this.setFocusable(false)

    // Register with injected slidebarControl if provided (for sibling components)
    if (this.slidebarControl) {
      this.slidebarControl.instance = this
    }
  },

  beforeUnmount () {
    // Clean up reference
    if (this.slidebarControl?.instance === this) {
      this.slidebarControl.instance = null
    }
  }
}
</script>
