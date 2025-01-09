<template>
  <span :class="{ 'inline-block w-full': inputWidth !== ''}">
    <dp-resettable-input
      id="searchField"
      data-cy="searchField"
      :class="cssClasses"
      :input-attributes="{ placeholder: Translator.trans('search'), type: 'search', inputClasses: 'rounded-r-none' }"
      @reset="handleReset"
      @enter="handleSearch"
      v-model="searchTerm">
      <!-- Slot for additional buttons -->
      <slot />
    </dp-resettable-input><!--

 --><dp-button
          class="align-top search rounded-r-md rounded-l-none"
          data-cy="handleSearch"
          hide-text
          icon="search"
          :text="Translator.trans('searching')"
          variant="outline"
          @click="handleSearch" />
  </span>
</template>

<script>
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
