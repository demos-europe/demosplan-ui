<template>
  <div>
    <div
      v-if="title !== ''"
      class="flex items-start"
      :class="triggerClasses"
      data-cy="accordion:trigger"
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
        <span class="flex items-center gap-1.5">
          <span
            :class="titleClasses"
            data-cy="accordion:title"
          >
            {{ title }}
          </span>
          <span
            v-if="showStatusDot"
            aria-hidden="true"
            class="w-1 h-1 rounded-full bg-interactive"
            data-cy="accordion:statusDot"
          />
          <span
            v-if="showStatusDot && statusDotLabel !== ''"
            class="sr-only"
          >
            {{ statusDotLabel }}
          </span>
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

    // Adds background color to a toggled trigger
    highlightToggledTrigger: {
      type: Boolean,
      default: false,
    },

    // Needed if you want to toggle the accordion from outside
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Apply inset spacing to the toggle trigger
    padded: {
      type: Boolean,
      required: false,
      default: false,
    },

    showBorder: {
      type: Boolean,
      required: false,
      default: true,
    },

    // Status dot next to the title, e.g. to indicate unsaved changes
    showStatusDot: {
      type: Boolean,
      required: false,
      default: false,
    },

    // For screen readers. Leave empty only if the dot's meaning is already conveyed elsewhere.
    statusDotLabel: {
      type: String,
      required: false,
      default: '',
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

    triggerClasses () {
      const classes = []

      if (this.padded) {
        /*
         * The left inset is kept small on purpose so the title lines up with content
         * rendered below it, which sits closer to the edge than the other insets.
         */
        classes.push('py-2 pr-2 pl-1.5')
      } else if (this.showBorder) {
        // Without inset spacing, the bottom spacing stays coupled to the border.
        classes.push('pb-2')
      }

      if (this.showBorder) {
        classes.push('border-b border-neutral')
      }

      // Highlight the trigger of the section that is currently expanded.
      if (this.highlightToggledTrigger && this.isVisible) {
        classes.push('bg-surface-light')
      }

      return classes
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
