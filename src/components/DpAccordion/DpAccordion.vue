<template>
  <div>
    <div
      v-if="title !== ''"
      class="flex items-start"
      :class="{ 'border-b border-neutral pb-2': showBorder }"
    >
      <!--
        Rendered beside the toggle button instead of inside it, so that interactive content
        (e.g. a checkbox) does not end up nested within a button.
      -->
      <slot name="titlePrefix" />
      <button
        :aria-expanded="isVisible.toString()"
        :data-cy="dataCy"
        class="flex items-center justify-between grow text-default hover:text-interactive hover:cursor-pointer active:text-interactive-hover"
        type="button"
        @click="() => toggle()"
      >
        <span class="flex items-center gap-1">
          <span :class="titleClasses">{{ title }}</span>
          <!-- Additional non-interactive information displayed next to the title. -->
          <slot name="titleSuffix" />
        </span>
        <dp-icon
          aria-hidden="true"
          :icon="isVisible ? 'caret-up' : 'caret-down'"
          :size="iconSize"
        />
      </button>
    </div>
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
    DpTransitionExpand,
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'accordionToggle',
    },

    fontWeight: {
      type: String,
      required: false,
      default: 'bold',
      validate: prop => ['normal', 'bold'].includes(prop),
    },

    // Reduce font-size of the title
    compressed: {
      type: Boolean,
      default: false,
    },

    // Needed if you want to toggle the accordion from outside
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },

    showBorder: {
      type: Boolean,
      required: false,
      default: true,
    },

    // Text displayed in toggle trigger
    title: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: ['item:toggle'],

  data () {
    return {
      isVisible: this.isOpen,
    }
  },

  computed: {
    titleClasses () {
      return [
        this.compressed ? 'text-base' : 'text-lg',
        this.fontWeight === 'bold' ? 'weight--bold' : 'weight--normal',
      ]
    },

    iconSize () {
      return this.compressed ? 'medium' : 'large'
    },
  },

  watch: {
    isOpen () {
      this.isVisible = this.isOpen
    },
  },

  methods: {
    toggle (state) {
      this.isVisible = (typeof state === 'undefined') ? !this.isVisible : state
      this.$emit('item:toggle', this.isVisible)
    },
  },
}
</script>
