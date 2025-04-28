<template>
  <span
    class="inline-flex"
    :class="{ 'w-full': inputWidth !== ''}">
    <dp-resettable-input
      id="searchField"
      v-model="searchTerm"
      data-cy="searchField"
      :class="cssClasses"
      :input-attributes="{ placeholder: translations.search, type: 'search'}"
      rounded="left"
      @reset="handleReset"
      @enter="handleSearch">
      <!-- Slot for additional buttons -->
      <slot />
    </dp-resettable-input>

    <dp-button
      class="search rounded-r-md rounded-l-none"
      data-cy="handleSearch"
      hide-text
      icon="search"
      :text="translations.searching"
      variant="outline"
      @click="handleSearch" />
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
    DpResettableInput
  },

  props: {
    initSearchTerm: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Value has to be a css class like 'u-1-of-2'
     * @deprecated Will be removed when the component layout is refactored.
     */
    inputWidth: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      required: false,
      default: 'search'
    }
  },

  data () {
    return {
      translations: {
        search: de.search.text,
        searching: de.search.searching
      },
      searchTerm: this.initSearchTerm,
      searchTermApplied: ''
    }
  },

  computed: {
    cssClasses () {
      const classes = 'inline-block rounded-r-none'

      return this.inputWidth !== '' ? `${classes} ${this.inputWidth}` : classes
    }
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
    }
  },

  mounted () {
    this.searchTermApplied = this.searchTerm
  }
}
</script>
