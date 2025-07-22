<template>
  <div>
    <button
      v-if="title !== ''"
      :aria-expanded="isVisible.toString()"
      class="flex items-center gap-1 text-interactive hover:cursor-pointer hover:text-interactive-hover"
      :data-cy="dataCy"
      type="button"
      @click="() => toggle()">
      <i
        :class="{ 'fa-caret-right': !isVisible, 'fa-caret-down': isVisible }"
        aria-hidden="true"
        class="w-2 fa"
      />
      <span :class="titleClasses">{{ title }}</span>
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
