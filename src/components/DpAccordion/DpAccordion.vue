<template>
  <div class="o-accordion">
    <button
      type="button"
      v-if="title !== ''"
      @click="() => toggle()"
      :aria-expanded="isVisible.toString()"
      :data-cy="dataCy"
      :class="fontWeight === 'bold' ? 'weight--bold' : 'weight--normal'"
      class="btn--blank o-link--default text-left">
      <i
        class="w-2 fa"
        :class="{'fa-caret-right': !isVisible, 'fa-caret-down': isVisible}"
        aria-hidden="true" />
      <span :class="compressed ? 'font-size-medium' : 'o-accordion--title'">{{ title }}</span>
    </button>
    <dp-transition-expand>
      <div v-show="isVisible">
        <!-- This is where the accordion content goes. -->
        <slot />
      </div>
    </dp-transition-expand>
  </div>
</template>

<script>
import DpTransitionExpand from '~/components/DpTransitionExpand'

export default {
  name: 'DpAccordion',

  components: {
    DpTransitionExpand
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'accordionToggle'
    },

    fontWeight: {
      type: String,
      required: false,
      default: 'bold',
      validate: prop => ['normal', 'bold'].includes(prop)
    },

    // Reduce font-size of the title
    compressed: {
      type: Boolean,
      default: false
    },

    // Needed if you want to toggle the accordion from outside
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },

    // Text displayed in toggle trigger
    title: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      isVisible: this.isOpen
    }
  },

  watch: {
    isOpen () {
      this.isVisible = this.isOpen
    }
  },

  methods: {
    toggle (state) {
      this.isVisible = (typeof state === 'undefined') ? !this.isVisible : state
      this.$emit('item:toggle', this.isVisible)
    }
  }
}
</script>
