<template>
  <span :class="{ 'inline-block w-full': inputWidth !== ''}">
    <dp-resettable-input
      id="searchField"
      data-cy="searchField"
      :class="cssClasses"
      :input-attributes="{ placeholder: translations.search, type: 'search' }"
      @reset="handleReset"
      @enter="handleSearch"
      v-model="searchTerm" /><!--

 --><dp-button
      class="align-top"
      data-cy="handleSearch"
      @click="handleSearch"
      :text="translations.searching" />
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
      return this.inputWidth !== '' ? `inline-block u-mr-0_5 ${this.inputWidth}` : 'inline-block u-mr-0_5'
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
        this.$emit('reset', '')
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

    reset () {
      this.searchTermApplied = ''
      this.searchTerm = ''
    }
  },

  mounted () {
    this.searchTermApplied = this.searchTerm
  }
}
</script>
