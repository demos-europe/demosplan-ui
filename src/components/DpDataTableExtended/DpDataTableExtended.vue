<template>
  <div>
    <dp-sticky-element>
      <div class="layout u-pv-0_5">
        <div class="layout__item u-10-of-12">
          <!-- Search field -->
          <label
            class="inline"
            for="search">
            {{ defaultTranslations.search }}
          </label>
          <input
            type="text"
            id="search"
            name="search"
            class="o-form__control-input"
            data-cy="dataTableExtended:search"
            v-model="searchString"
            @input="updateFields(null)">

          <!-- pager -->
          <dp-sliding-pagination
            v-if="totalPages > 1"
            class="inline-block u-ml-0_5 u-mt-0_125"
            :current="currentPage"
            :total="totalPages"
            @page-change="handlePageChange" />
          <dp-select-page-item-count
            class="inline-block u-mt-0_125 u-ml-0_5"
            @changed-count="setPageItemCount"
            :page-count-options="itemsPerPageOptions"
            :current-item-count="itemsPerPage"
            :label-text="defaultTranslations.showEntries" />
        </div>
      </div>
    </dp-sticky-element>

    <dp-data-table
      v-bind="$props"
      @items-selected="emitSelectedItems"
      :items="onPageItems"
      :should-be-selected-items="currentlySelectedItems">
      <template
        v-for="(el, i) in sortableFilteredFields"
        v-slot:[`header-${el.field}`]="el">
        <slot
          :name="`header-${el.field}`"
          v-bind="sortableFilteredFields[i]">
          <div
            :key="el.field"
            class="o-hellip--nowrap relative u-pr-0_75">
            <button
              :aria-label="defaultTranslations.colsSort + ': ' + el.label"
              :title="defaultTranslations.colsSort + ': ' + el.label"
              class="btn--blank u-top-0 u-right-0 absolute"
              @click="setOrder(el.field)"
              type="button">
              <i
                aria-hidden="true"
                class="fa"
                :class="sortIconClass(el.field)" />
            </button>
            {{ el.label }}
          </div>
        </slot>
      </template>
      <template
        v-for="el in [...filteredFields, { field: 'expandedContent' }, { field: 'flyout' }]"
        v-slot:[el.field]="item">
        <!-- table cells (TDs) -->
        <slot
          :name="el.field"
          v-bind="item" />
      </template>
    </dp-data-table>

    <dp-sticky-element direction="bottom">
      <slot name="footer" />
    </dp-sticky-element>
  </div>
</template>

<script>
import dataTableSearch from './DataTableSearch'
import DomPurify from 'dompurify'
import DpDataTable from '~/components/DpDataTable'
import DpSelectPageItemCount from './DpSelectPageItemCount'
import DpSlidingPagination from '~/components/DpSlidingPagination'
import DpStickyElement from '~/components/DpStickyElement'
import { hasOwnProp } from '~/utils'
import { tableSelectAllItems } from '~/mixins'
import { de } from "~/components/shared/translations"

export default {
  name: 'DpDataTableExtended',

  components: {
    DpDataTable,
    DpSelectPageItemCount,
    DpSlidingPagination,
    DpStickyElement
  },

  mixins: [tableSelectAllItems],

  props: {
    defaultSortOrder: {
      type: [Object, null],
      required: false,
      default: null,
      validator: data => {
        if (typeof data === 'object' && data !== null) {
          return hasOwnProp(data, 'key') && hasOwnProp(data, 'direction')
        }
        return data === null
      }
    },

    hasFlyout: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * {Array<Object>} { field, label } object fields with Label
     */
    headerFields: {
      type: Array,
      required: true,
      default: () => []
    },

    initItemsPerPage: {
      type: Number,
      required: false,
      default: 50
    },

    isExpandable: {
      type: Boolean,
      required: false,
      default: false
    },

    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },

    isResizable: {
      type: Boolean,
      required: false,
      default: false
    },

    isSelectable: {
      type: Boolean,
      required: false,
      default: false
    },

    isSortable: {
      type: Boolean,
      required: false,
      default: false
    },

    isTruncatable: {
      type: Boolean,
      required: false,
      default: false
    },

    itemsPerPageOptions: {
      type: Array,
      required: false,
      default: () => [10, 50, 100, 200]
    },

    /**
     * Use a Boolean Property of the Item to set the Checkbox to a locked state.
     * This should only be set if `isSelectable` is true.
     */
    lockCheckboxBy: {
      type: String,
      required: false,
      default: null
    },

    /**
     * {Array{Object} {fieldName1, fieldName2, ...} The field names have to match the field values from the headerFields.
     * has to be a computed in the parent (can't be in data)
     */
    tableItems: {
      type: Array,
      required: false,
      default: () => []
    },

    trackBy: {
      type: String,
      required: false,
      default: 'id'
    },

    translations: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  data () {
    return {
      currentPage: 1,
      defaultTranslations: {
        colsSort: de.table.colsSort,
        search: de.search.text,
        showEntries: de.pager.showEntries
      },
      filteredItems: [],
      filters: this.headerFields.reduce((obj, item) => {
        obj[item.field] = true
        return obj
      }, {}),
      isHighlighted: '',
      itemsPerPage: this.initItemsPerPage,
      searchString: '',
      sortOrder: (this.defaultSortOrder !== null) ? this.defaultSortOrder : (this.headerFields.length > 0) ? { key: this.headerFields[0].field, direction: -1 } : null
    }
  },

  computed: {
    filteredFields () {
      const filteredFields = this.headerFields.filter(el => this.filters[el.field])
      this.$emit('updated:filteredItems', filteredFields)
      return filteredFields
    },

    onPageItems () {
      let last = this.currentPage * this.itemsPerPage
      const first = last - this.itemsPerPage
      last = last <= this.filteredItems.length ? last : this.filteredItems.length
      const result = this.filteredItems.slice(first, last)
      this.$emit('updated:onPageItems', result)
      return result
    },

    /*
     * This is to prevent having both a v-if and a v-for on the template. If isSortable is set,
     * there should be some sorting arrows in the header, which get passed in the slot.
     */
    sortableFilteredFields () {
      return this.isSortable ? this.filteredFields : []
    },

    totalPages () {
      return this.filteredItems.length > 0 ? Math.ceil(this.filteredItems.length / this.itemsPerPage) : 1
    }
  },

  watch: {
    tableItems: {
      handler () {
        this.updateFields()
      },
      deep: true
    }
  },

  methods: {
    emitSelectedItems (selectedItems) {
      this.$emit('items-selected', selectedItems)
    },

    handlePageChange (page) {
      this.currentPage = page
      this.updateFields()
    },

    highlightText (value) {
      let displayText = DomPurify.sanitize(value.replace('<br>', '__br__')).replace('__br__', '<br>')
      if (this.searchString.length) {
        const regex = new RegExp(this.searchString, 'ig')
        displayText = value.replace(regex, '<span style="background-color: yellow;">$&</span>')
      }
      return displayText
    },

    setOrder (field) {
      // If clicked on one button multiple times, toggle the order direction
      if (field === this.sortOrder.key) {
        this.sortOrder.direction = this.sortOrder.direction * -1
      } else {
        // Otherwise reset the direction and set the field
        this.sortOrder = { key: field, direction: 1 }
      }
      this.updateFields()
      this.$emit('updated:sortOrder', this.sortOrder)
    },

    setPageItemCount (count) {
      this.itemsPerPage = count
      this.currentPage = this.currentPage > this.totalPages ? this.totalPages : this.currentPage
      this.updateFields()
    },

    sortIconClass (field) {
      const isCurrentSort = field === this.sortOrder.key
      const sortDirectionClass = this.sortOrder.direction < 0 ? 'fa-sort-up' : 'fa-sort-down'
      return isCurrentSort ? `${sortDirectionClass} color-highlight` : `fa-sort color--grey`
    },

    updateFields (items = null) {
      let sortedList = items || this.tableItems

      // Sort by selected col
      if (this.sortOrder) {
        sortedList.sort((a, b) => {
          /**
           * In JS is `null > 'string' === null < 'string'`
           * so we have to do such weird stuff
           */
          if (a[this.sortOrder.key] === null || typeof a[this.sortOrder.key] === 'undefined') {
            return this.sortOrder.direction * 1
          }
          if (b[this.sortOrder.key] === null || typeof b[this.sortOrder.key] === 'undefined') {
            return this.sortOrder.direction * -1
          }
          return a[this.sortOrder.key].localeCompare(b[this.sortOrder.key], 'de', { sensitivity: 'base' }) * this.sortOrder.direction
        })
      }

      // Filter by search string
      if (this.searchString.length > 0) {
        sortedList = dataTableSearch(this.searchString, sortedList, this.headerFields.map(el => el.field))
      }
      this.filteredItems = sortedList
    }
  },

  mounted () {
    this.updateFields()
  }
}
</script>
