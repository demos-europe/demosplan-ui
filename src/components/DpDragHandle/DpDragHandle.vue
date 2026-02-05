<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    :class="prefixClass(`c-drag-handle c-drag-handle--${direction} ${direction}-0`)"
    draggable="true"
    @mousedown.prevent="startDrag"
    @touchstart.prevent="startDrag"
  >
    <slot>
      <div :class="prefixClass('c-drag-handle__inner')">
        <i
          aria-hidden="true"
          :class="prefixClass('c-drag-handle__grip')"
        />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { prefixClassMixin } from '@demos-europe/demosplan-ui'

export default {
  name: 'DpDragHandle',

  mixins: [prefixClassMixin],

  props: {
    direction: {
      type: String,
      required: false,
      default: 'right',
      validator: (value: string) => ['right', 'left'].includes(value),
    },

    dragTarget: {
      type: String,
      required: false,
      default: '#app',
    },

    // This number is used to have a "margin" for the max-value. So we prevent a scrollbar and can see the handle at max-scale
    magicNumber: {
      type: Number,
      required: false,
      default: 100,
    },
  },

  emits: [ 'resize' ],

  data() {
    return {
      unfolded: false,
      target: null,
      initialSize: 0,
      currentSize: 0,
      maxSize: 0,
    }
  },

  computed: {
    /**
     * Check if it has to calculate the size or the height
     */
    dimension () {
      return (this.direction === 'left' || this.direction === 'right') ? 'width' : 'height'
    },

    dimensionPadding () {
      return (this.direction === 'left' || this.direction === 'right') ? ['paddingRight', 'paddingLeft'] : ['paddingTop', 'paddingBottom']
    },

    parentPadding () {
      return parseInt(getComputedStyle(this.target.parentElement)[this.dimensionPadding[0]].slice(0, -2)) + parseInt(getComputedStyle(this.target.parentElement)[this.dimensionPadding[1]].slice(0, -2))
    },
  },

  methods: {
    /**
     * Check if the new size is valid. Otherwise use min/max values.
     */
    handleDrag (event) {
      const rect = this.target.getBoundingClientRect()
      let newSize

      if (this.dimension === 'height') {
        const clientY =
          event.type === 'mousemove'
            ? event.clientY // Mouse events
            : event.changedTouches[0].clientY // Touch events
          newSize = clientY - rect.top - this.parentPadding
      } else {
        // Width calculation
        const clientX =
          event.type === 'mousemove'
            ? event.clientX
            : event.changedTouches[0].clientX

        if (this.direction === 'left') {
          newSize = rect.right - clientX - this.parentPadding
        } else {
          newSize = clientX - rect.left - this.parentPadding
        }
      }

      if (newSize < (this.initialSize)) {
        newSize = (this.initialSize)
      } else if (newSize > this.maxSize) {
        newSize = this.maxSize
      }

      this.setNewSize(newSize)
    },

    /**
     * Remove manually set size if the page gets resized
     */
    handleResize () {
      this.target.removeAttribute('style')
      this.setMaxSize()
    },

    /**
     * Calculate the max-size by getting the parent.size and removing the padding
     */
    setMaxSize () {
      const containerDimensions = {
        width: this.target.parentElement.offsetWidth,
        height: this.target.parentElement.offsetHeight,
      }
      this.maxSize = containerDimensions[this.dimension] - this.magicNumber - this.parentPadding
    },

    /**
     * Set size of the parent
     */
    setNewSize (newSize) {
      this.currentSize = newSize
      this.target.setAttribute('style', this.dimension + ': ' + newSize + 'px; max-width: none')
      this.target.style.background = 'white'
      this.target.style.zIndex = '10'
      this.$root.$emit('resize')
    },

    /**
     * Add EventListener to document when mouse-click/touch on drag-handle
     */
    startDrag () {
      window.addEventListener('mousemove', this.handleDrag)
      window.addEventListener('touchmove', this.handleDrag)
    },

    /**
     * Remove EventListener on release to avoid too much event listening
     */
    stopDrag () {
      window.removeEventListener('mousemove', this.handleDrag)
      window.removeEventListener('touchmove', this.handleDrag)
    },
  },

  mounted() {
    // Get dom reference to drag target
    this.target = document.querySelector(this.dragTarget)

    // Mouseup EventListener to detect end of dragging
    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('touchend', this.stopDrag)

    // Listen for the resize of the page to know if the max-size has to be recalculated.
    window.addEventListener('resize', this.handleResize)

    // Check if size has to be recalculated after tab-use (map-specific)
    const procedureTab = document.querySelector('[href="#procedureDetailsMap"]')
    if (procedureTab) {
      procedureTab.addEventListener('click', this.setMaxSize)
    }

    // Set initial values for min/max size
    this.initialSize = parseInt(getComputedStyle(this.target)[this.dimension].slice(0, -2))
    this.currentSize = this.initialSize
    this.setMaxSize()
  },

  beforeUnmount() {
    // Remove event listener if the component gets destroyed
    window.removeEventListener('mouseup', this.stopDrag)
    window.removeEventListener('touchend', this.stopDrag)
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
