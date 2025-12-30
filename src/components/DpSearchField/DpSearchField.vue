<template>
  <span
    class="inline-flex relative"
    :class="{ 'w-full': inputWidth === '' }"
  >
    <dp-resettable-input
      id="searchField"
      v-model="searchTerm"
      data-cy="searchField"
      :class="cssClasses"
      :input-attributes="{ placeholder: translations.search, type: 'search' }"
      :number-of-additional-icons="numberOfAdditionalIcons ? numberOfAdditionalIcons : null"
      rounded="left"
      @reset="handleReset"
      @enter="handleSearch"
    >
      <!-- Slot for additional buttons -->
      <slot />
    </dp-resettable-input>

    <dp-button
      class="search rounded-r-md rounded-l-none z-[5] -ml-px"
      data-cy="handleSearch"
      hide-text
      icon="search"
      :text="translations.searching"
      variant="outline"
      @click="handleSearch"
    />
  </span>
</template>

<script>
import { de } from "~/components/shared/translations"
import DpButton from '~/components/DpButton'
import DpResettableInput from '~/components/DpResettableInput'

export default {
  name: 'DpSearchField',

  components: {
    DpButton,
    DpResettableInput,
  },

  props: {
    initSearchTerm: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Value has to be a css class like 'u-1-of-2'
     * @deprecated Will be removed when the component layout is refactored.
     */
    inputWidth: {
      type: String,
      default: '',
    },

    /**
     * To prevent text from flowing under the icons, it is necessary to know how many icons are added,
     * to correctly set the padding for the input field.
     */
    numberOfAdditionalIcons: {
      type: [Number, String],
      required: false,
      default: null,
    },

    placeholder: {
      type: String,
      required: false,
      default: 'search',
    },
  },

  emits: [
    'search',
    'reset',
  ],

  data () {
    return {
      translations: {
        search: de.search.text,
        searching: de.search.searching,
      },
      searchTerm: this.initSearchTerm,
      searchTermApplied: '',
    }
  },

  computed: {
    cssClasses () {
      const classes = 'inline-block rounded-r-none focus-within:z-above-zero'

      return this.inputWidth !== '' ? `${classes} ${this.inputWidth}` : classes
    },
  },

  methods: {
    handleReset () {
      this.searchTerm = ''

      /*
       * Only emit reset if the searchTerm has been changed
       * The empty string is emitted to stick to only one type.
       */
      if (this.searchTermApplied !== this.searchTerm) {
        this.$emit('reset')
        this.searchTermApplied = ''
      }
    },

    handleSearch () {
      // Prevent emitting a searchTerm twice
      if (this.searchTermApplied === this.searchTerm) {
        return
      }

      this.searchTermApplied = this.searchTerm
      this.$emit('search', this.searchTerm)
    },
  },

  mounted () {
    this.searchTermApplied = this.searchTerm
  },
}
</script>
