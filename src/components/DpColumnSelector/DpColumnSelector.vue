<template>
  <dp-flyout
    :has-menu="false"
    :data-cy="dataCy"
    @close="trackSelection">
    <template v-slot:trigger>
      <span v-text="triggerText" />
      <i
        class="fa fa-caret-down u-ml-0_25"
        aria-hidden="true" />
    </template>
    <div class="space-stack-xs u-pv-0_25">
      <dp-checkbox
        v-for="([value, label]) in selectableColumns"
        :id="`columnSelector:${value}`"
        :key="value"
        :data-cy="`columnSelector:${value}`"
        :checked="selectedColumns.has(value)"
        :label="{
          text: label
        }"
        @change="broadcastSelection(value, !selectedColumns.has(value))" />
    </div>
  </dp-flyout>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpCheckbox from '~/components/DpCheckbox'
import DpFlyout from '~/components/DpFlyout'
import { hasOwnProp } from '~/utils'

export default {
  name: 'DpColumnSelector',

  components: {
    DpCheckbox,
    DpFlyout
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    selectableColumns: {
      type: Array,
      required: false,
      default: () => ([])
    },

    initialSelection: {
      type: Array,
      required: false,
      default: () => ([])
    },

    localStorageKey: {
      type: String,
      required: false,
      default: ''
    },

    useLocalStorage: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  emits: ['selection-changed'],

  data () {
    return {
      selectedColumns: new Set(),
      triggerText: de.table.colsSelect
    }
  },

  methods: {
    broadcastSelection (column, shouldCheck = null) {
      if (shouldCheck === true) {
        this.selectedColumns.add(column)
      } else if (shouldCheck === false) {
        this.selectedColumns.delete(column)
      }

      const currentSelection = this.selectableColumns
        .filter(([value, label]) => this.selectedColumns.has(value))
        .map(([value, label]) => value)

      this.$emit('selection-changed', currentSelection)

      if (this.useLocalStorage) {
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(currentSelection))
      }
    },

    initializeColumnSelection () {
      if (this.useLocalStorage) {
        if (this.localStorageKey === '') {
          throw new Error(`${this.$options.name} should use localStorage but no localStorageKey was set.`)
        }
        const storedSelection = window.localStorage.getItem(this.localStorageKey)
        this.selectedColumns = storedSelection ? new Set(JSON.parse(storedSelection)) : new Set(this.initialSelection)
        this.broadcastSelection()
      } else {
        this.selectedColumns = new Set(this.initialSelection)
      }
    },

    /**
     * If Tracking is enabled we want to collect what columns the users select to determine
     * a good default
     */
    trackSelection () {
      if (hasOwnProp(window, '_paq')) {
        window._paq.push(['trackEvent', 'Column Selection', `View: ${this.localStorageKey}`, `Selected: ${this.selectedColumns.join(', ')}`])
      }
    }
  },

  mounted () {
    this.initializeColumnSelection()
  }
}
</script>
