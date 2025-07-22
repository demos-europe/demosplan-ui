<template>
  <div>
    <button
      v-if="title !== ''"
      :aria-expanded="isVisible.toString()"
      :data-cy="dataCy"
      class="flex items-center gap-2 text-interactive hover:text-interactive-hover hover:cursor-pointer"
      type="button"
      @click="() => toggle()">
      <span :class="titleClasses">{{ title }}</span>
      <dp-icon
        aria-hidden="true"
        :icon="isVisible ? 'caret-up' : 'caret-down'"
        :size="iconSize" />
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
import DpIcon from '~/components/DpIcon'
import DpTransitionExpand from '~/components/DpTransitionExpand'

export default {
  name: 'DpAccordion',

  components: {
    DpIcon,
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

  emits: ['item:toggle'],

  data () {
    return {
      isVisible: this.isOpen
    }
  },

  computed: {
    titleClasses () {
      return [
        this.compressed ? 'text-base' : 'text-lg',
        this.fontWeight === 'bold' ? 'weight--bold' : 'weight--normal'
      ]
    },

    iconSize () {
      return this.compressed ? 'medium' : 'large'
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
