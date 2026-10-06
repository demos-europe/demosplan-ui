<template>
  <dp-flyout
    :appearance="appearance"
    :data-cy="dataCy"
    :has-menu="false"
    :padded="false"
    @close="trackSelection"
  >
    <template v-slot:trigger>
      <span v-text="triggerText" />
      <i
        class="fa fa-caret-down ml-2"
        aria-hidden="true"
      />
    </template>
    <div class="space-stack-xs p-2">
      <dp-checkbox
        v-for="([value, label]) in selectableColumns"
        :id="`columnSelector:${value}`"
        :key="value"
        :data-cy="`columnSelector:${value}`"
        :checked="selectedColumns.has(value)"
        :label="{
          text: label
        }"
        @change="broadcastSelection(value, !selectedColumns.has(value))"
      />
    </div>
    <div
      v-if="hasSelectAllOption || hasResetOption"
      class="border-t-2 border-neutral-light-3 p-2"
    >
      <button
        v-if="hasSelectAllOption"
        class="btn--blank o-link--default mb-1"
        data-cy="columnSelector:toggleAll"
        @click="toggleSelectAll"
        v-text="labelToggleAll"
      />
      <button
        v-if="hasResetOption"
        class="btn--blank o-link--default ml-auto"
        data-cy="columnSelector:reset"
        @click="$emit('reset')"
        v-text="labelReset"
      />
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
    DpFlyout,
  },

  props: {
    appearance: {
      type: String,
      required: false,
      default: 'interactive',
    },

    dataCy: {
      type: String,
      required: false,
      default: '',
    },

    hasResetOption: {
      type: Boolean,
      required: false,
      default: false,
    },

    hasSelectAllOption: {
      type: Boolean,
      required: false,
      default: false,
    },

    initialSelection: {
      type: Array,
      required: false,
      default: () => ([]),
    },

    localStorageKey: {
      type: String,
      required: false,
      default: '',
    },

    selectableColumns: {
      type: Array,
      required: false,
      default: () => ([]),
    },

    useLocalStorage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: [
    'reset',
    'selection-changed',
  ],

  data () {
    return {
      labelReset: de.operations.reset,
      labelToggleAll: de.operations.toggle.all,
      selectedColumns: new Set(),
      triggerText: de.table.colsSelect,
    }
  },

  computed: {
    allColumnsSelected () {
      return this.selectableColumns.every(([value]) => this.selectedColumns.has(value))
    },
  },

  methods: {
    broadcastSelection (column, shouldCheck = null) {
      if (shouldCheck === true) {
        this.selectedColumns.add(column)
      } else if (shouldCheck === false) {
        this.selectedColumns.delete(column)
      }

      const currentSelection = this.selectableColumns
        .filter(([value]) => this.selectedColumns.has(value))
        .map(([value]) => value)

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

    toggleSelectAll () {
      if (this.allColumnsSelected) {
        this.selectableColumns.forEach(([value]) => this.selectedColumns.delete(value))
      } else {
        this.selectableColumns.forEach(([value]) => this.selectedColumns.add(value))
      }
      this.broadcastSelection()
    },

    /**
     * If Tracking is enabled we want to collect what columns the users select to determine
     * a good default
     */
    trackSelection () {
      if (hasOwnProp(window, '_paq')) {
        window._paq.push(['trackEvent', 'Column Selection', `View: ${this.localStorageKey}`, `Selected: ${this.selectedColumns.join(', ')}`])
      }
    },
  },

  mounted () {
    this.initializeColumnSelection()
  },
}
</script>
