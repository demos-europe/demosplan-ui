<template>
  <div>
    <table
      ref="tableEl"
      :class="tableClass">
      <colgroup
        v-if="headerFields.filter((field) => field.colClass).length > 0">
        <col v-if="isDraggable || isSelectable" />
        <col
          v-for="field in headerFields"
          :class="field.colClass" />
        <col v-if="hasFlyout" />
        <col v-if="isExpandable" />
        <col v-if="isTruncatable" />
      </colgroup>

      <thead>
        <dp-table-header
          :checked="allSelected"
          :has-flyout="hasFlyout"
          :header-fields="headerFields"
          :indeterminate="indeterminate"
          :is-draggable="isDraggable"
          :is-expandable="isExpandable"
          :is-resizable="isResizable"
          :is-selectable="isSelectable"
          :is-sticky="hasStickyHeader"
          :is-truncatable="isTruncatable"
          :translations="headerTranslations"
          @toggle-expand-all="toggleExpandAll"
          @toggle-select-all="toggleSelectAll"
          @toggle-wrap-all="toggleWrapAll">
          <template v-slot:[`header-${field}`] v-for="field in fields">
            <slot :name="`header-${field}`" />
          </template>
        </dp-table-header>
      </thead>

      <!-- not draggable -->
      <tbody v-if="!isDraggable">
        <template
          v-if="!isLoading && items.length > 0"
          v-for="(item, idx) in items">
          <dp-table-row
            ref="tableRows"
            :index="idx"
            :checked="elementSelections[item[trackBy]] || false"
            :fields="fields"
            :has-flyout="hasFlyout"
            :header-fields="headerFields"
            :is-draggable="isDraggable"
            :is-expandable="isExpandable"
            :is-loading="isLoading && items.length > 0"
            :is-locked="lockCheckboxBy ? item[lockCheckboxBy] : false"
            :is-locked-message="mergedTranslations.lockedForSelection"
            :is-resizable="isResizable"
            :is-selectable="isSelectable"
            :is-selectable-name="isSelectableName"
            :is-truncatable="isTruncatable"
            :item="item"
            :search-term="searchTerm"
            :track-by="trackBy"
            :wrapped="wrappedElements[item[trackBy]] || false"
            @toggle-expand="toggleExpand"
            @toggle-select="toggleSelect"
            @toggle-wrap="toggleWrap">
            <template v-slot:[field]="item" v-for="field in fields">
              <slot
                :name="field"
                v-bind="item" />
            </template>
            <template v-slot:flyout="item">
              <slot
                name="flyout"
                v-bind="item" />
            </template>
          </dp-table-row>

          <!-- DpTableRowExpanded -->
          <tr
            v-if="expandedElements[item[trackBy]] || false"
            :class="expandedElements[item[trackBy]] || false ? 'is-expanded-content' : ''">
            <td
              :class="`${isLoading ? 'opacity-7' : ''}`"
              :colspan="colCount"
              @mouseenter="addHoveredClass(idx)"
              @mouseleave="removeHoveredClass(idx)">
              <slot
                name="expandedContent"
                v-bind="item" />
            </td>
          </tr>
        </template>
      </tbody>

      <!-- draggable -->
      <dp-draggable
        v-if="isDraggable && !isLoading && items.length > 0"
        draggable-tag="tbody"
        :content-data="items"
        :disabled="!isDraggable"
        handle="c-data-table__drag-handle"
        ghostClass="sortable-ghost"
        chosenClass="sortable-chosen"
        @change="(e) => $emit('changed-order', e)">
        <template
          v-for="(item, idx) in items">
          <dp-table-row
            :checked="elementSelections[item[trackBy]] || false"
            :expanded="expandedElements[item[trackBy]] || false"
            :fields="fields"
            :has-flyout="hasFlyout"
            :header-fields="headerFields"
            :index="idx"
            :is-draggable="isDraggable"
            :is-expandable="isExpandable"
            :is-loading="isLoading && items.length > 0"
            :is-locked="lockCheckboxBy ? item[lockCheckboxBy] : false"
            :is-locked-message="mergedTranslations.lockedForSelection"
            :is-resizable="isResizable"
            :is-selectable="isSelectable"
            :is-selectable-name="isSelectableName"
            :is-truncatable="isTruncatable"
            :item="item"
            :search-term="searchTerm"
            :track-by="trackBy"
            :wrapped="wrappedElements[item[trackBy]] || false"
            @toggle-expand="toggleExpand"
            @toggle-select="toggleSelect"
            @toggle-wrap="toggleWrap">
            <template v-slot:[field]="item" v-for="field in fields">
              <slot
                :name="field"
                v-bind="item" />
            </template>
            <template v-slot:flyout="item">
              <slot
                name="flyout"
                v-bind="item" />
            </template>
          </dp-table-row>
        </template>
      </dp-draggable>

      <!-- empty items -->
      <tr v-if="items.length === 0">
        <!-- noResultsData  -->
        <td
          v-if="searchTermSet"
          :colspan="colCount"
          class="u-pt"
          v-html="noResults" />

        <!-- noEntriesItem -->
        <td
          v-else
          :colspan="colCount"
          class="u-pt">
          <dp-loading
            v-if="isLoading"
            is-loading
            class="u-mt"
            :colspan="colCount" />
          <template v-else>
            {{ mergedTranslations.tableNoElements }}
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { CleanHtml } from '../../../directives/CleanHtml/CleanHtml'
import DomPurify from 'dompurify'
import DpDraggable from '../../DpDraggable/DpDraggable'
import DpLoading from '../../DpLoading/DpLoading'
import DpTableHeader from './DpTableHeader'
import DpTableRow from './DpTableRow'

export default {
  name: 'DpDataTable',

  components: {
    DpTableRow,
    DpTableHeader,
    DpLoading,
    DpDraggable
  },

  directives: {
    cleanhtml: CleanHtml
  },

  props: {
    // Adds flyout menu
    hasFlyout: {
      type: Boolean,
      required: false,
      default: false
    },

    // The first table row (consisting of column headers) is being fixed to the top of the outer table element.
    hasStickyHeader: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * The header of every column of the table is defined here.
     *
     * Each column is represented by an object with a `field` key whose value should match
     * a key of the objects inside `items`. The `label` key controls the header of the column.
     * The header can also have a tooltip. To define the width the column is initially rendered with
     * when `isResizable` is used, the keys `initialWidth`, `initialMaxWidth` and `initialMinWidth` take a px value.
     */
    headerFields: {
      type: Array,
      required: true
    },

    initSelectedItems: {
      type: Array,
      required: false,
      default: () => []
    },

    isDraggable: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Rows may be expandable to show additional content inside another row.
     * The `#expandedContent` slot can be utilized to style the content area.
     */
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

    /**
     * Make table columns resizable.
     */
    isResizable: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Display a checkbox in front of each row.
     */
    isSelectable: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * If specified, the checkbox will have a "name" attr with this value, and a value of [trackBy].
     */
    isSelectableName: {
      type: String,
      required: false,
      default: null
    },

    /**
     * Make table rows truncatable.
     * Cell content is truncated after 1 line, but expandable to its original size.
     * To make this work, no custom css must be applied to the cells that hold the
     * content to be truncated.
     * At the moment, `isTruncatable` and `isExpandable` use the same icon as trigger visual.
     * See https://yaits.demos-deutschland.de/T11301#413638 for possible advancement.
     */
    isTruncatable: {
      type: Boolean,
      required: false,
      default: false
    },

    items: {
      type: Array,
      required: true
    },

    /**
     * When selection on multiple pages is supported, this variable forces the "Check all" checkbox into a "checked"
     * state, because instead of passing all checked items into here (which we can't in multi-page-selection suzenario),
     * we just pass the info "all items are selected".
     */
    multiPageAllSelected: {
      type: Boolean,
      required: false,
      default: false
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
     * When selection on multiple pages is supported, this variable holds number of items currently toggled.
     * It is used for calculating indeterminate state of the "check all" checkbox.
     */
    multiPageSelectionItemsToggled: {
      type: Number,
      required: false,
      default: 0
    },

    /**
     * When selection on multiple pages is supported, this variable holds the absolute number of items available.
     * It is used for calculating indeterminate state of the "check all" checkbox.
     */
    multiPageSelectionItemsTotal: {
      type: Number,
      required: false,
      default: 0
    },

    searchString: {
      type: [String, null],
      required: false,
      default: null
    },

    // This allows item selection to be forced from outside. It will override any internal selection state.
    shouldBeSelectedItems: {
      type: Object,
      required: false,
      default: () => ({})
    },

    tableClass: {
      type: String,
      required: false,
      default: 'c-data-table'
    },

    trackBy: {
      type: String,
      required: true
    },

    translations: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      allExpanded: false,
      allWrapped: false,
      defaultTranslations: {
        footerSelectedElement: Translator.trans('entry.selected'),
        footerSelectedElements: Translator.trans('entries.selected'),
        headerExpandHint: Translator.trans('aria.expand.all'),
        headerSelectHint: Translator.trans('aria.select.all'),
        lockedForSelection: Translator.trans('item.lockedForSelection'),
        searchNoResults: (searchTerm) => Translator.trans('search.no.results', { searchterm: searchTerm }),
        tableLoadingData: Translator.trans('loading.data'),
        tableNoElements: Translator.trans('explanation.noentries')
      },
      elementSelections: {},
      expandedElements: {},
      headerCellCount: 0,
      mergedTranslations: {},
      selectedElements: [],
      tableEl: undefined,
      wrappedElements: {}
    }
  },

  computed: {
    allSelected () {
      if (this.multiPageSelectionItemsTotal > 0) {
        return this.multiPageSelectionItemsToggled === this.multiPageSelectionItemsTotal || this.multiPageAllSelected
      } else {
        return this.items.filter(item => this.elementSelections[item[this.trackBy]]).length === this.items.length
      }
    },

    colCount () {
      let cells = 0

      cells += this.isSelectable || this.isDraggable ? 1 : 0
      cells += this.hasFlyout ? 1 : 0
      cells += this.isExpandable ? 1 : 0
      cells += this.isTruncatable ? 1 : 0

      return this.headerCellCount + cells
    },

    fields () {
      return this.headerFields.map(hf => hf.field)
    },

    headerTranslations () {
      return this.extractTranslations(['headerSelectHint'])
    },

    indeterminate () {
      if (this.isSelectable === false) {
        return
      }
      if (this.multiPageSelectionItemsTotal > 0) {
        return this.multiPageSelectionItemsToggled > 0 && !this.allSelected
      } else {
        return this.selectedElements.length > 0 && !this.allSelected
      }
    },

    noResults () {
      return this.mergedTranslations.searchNoResults(DomPurify.sanitize('"' + this.searchString + '"'))
    },

    searchTerm () {
      if (this.searchString === null || this.searchString.length < 1) {
        return new RegExp()
      }
      const searchTerm = this.searchString.replace(/\s*/ig, '\\s*')
      return new RegExp(searchTerm, 'ig')
    },

    searchTermSet () {
      return this.searchTerm.source !== '(?:)'
    }
  },

  watch: {
    shouldBeSelectedItems () {
      this.forceElementSelections(this.shouldBeSelectedItems)
    }
  },

  methods: {
    addHoveredClass(idx) {
      const tableRow = this.$refs.tableRows[idx]

      return tableRow.$el.classList.add('is-hovered-content')
    },

    extractTranslations (keys) {
      return keys.reduce((acc, key) => {
        const tmp = this.mergedTranslations[key] ? { [key]: this.mergedTranslations[key] } : {}
        return { ...acc, ...tmp }
      }, {})
    },

    /**
     * Transforms and filters the list of selected items across all pages.
     *
     * Return only the `trackBy` of the items
     *
     * @returns {string[]}
     */
    filterElementSelections () {
      return Object.entries(this.elementSelections)
        .filter(selectedItem => selectedItem[1]) // True or false
        .map(selectedItem => selectedItem[0]) // TrackBy of the item
    },

    forceElementSelections (itemsStatusObject) {
      this.elementSelections = itemsStatusObject
      this.selectedElements = this.filterElementSelections()
    },

    removeHoveredClass(idx) {
      const tableRow = this.$refs.tableRows[idx]

      return tableRow.$el.classList.remove('is-hovered-content')
    },

    resetSelection () {
      this.toggleSelectAll(false)
    },

    setElementSelections (elements, status) {
      return elements.reduce((acc, el) => {
        return {
          ...acc,
          ...{ [el[this.trackBy]]: status }
        }
      }, this.elementSelections)
    },

    toggleExpand (id) {
      this.expandedElements = { ...this.expandedElements, [id]: !this.expandedElements[id] }
    },

    toggleExpandAll (status = this.allExpanded === false) {
      this.expandedElements = this.items.reduce((acc, item) => {
        return {
          ...acc,
          ...{ [item[this.trackBy]]: status }
        }
      }, {})
      this.allExpanded = status
    },

    toggleSelect (id) {
      this.elementSelections = { ...this.elementSelections, ...{ [id]: !this.elementSelections[id] } }
      this.selectedElements = this.filterElementSelections()

      this.$emit('items-selected', this.selectedElements)
      this.$emit('items-toggled', [{ id }], this.elementSelections[id])
    },

    toggleSelectAll (status = this.allSelected === false) {
      this.elementSelections = this.setElementSelections(this.items, status)
      this.selectedElements = this.filterElementSelections()
      this.$emit('items-selected', this.selectedElements)
      this.$emit('items-toggled', this.items.map(el => { return { id: el[this.trackBy] } }), status)

      // Used by multi-page selection in SegmentsList to determine whether to track selected or deselected items.
      this.$emit('select-all', status)
    },

    toggleWrap (id) {
      this.wrappedElements = { ...this.wrappedElements, [id]: !this.wrappedElements[id] }
    },

    toggleWrapAll (status = this.allWrapped === false) {
      this.wrappedElements = this.items.reduce((acc, item) => {
        return {
          ...acc,
          ...{ [item[this.trackBy]]: status }
        }
      }, {})

      this.allWrapped = status
    }
  },

  created () {
    this.elementSelections = this.setElementSelections(this.initSelectedItems, true)

    // The searchNoResults translation key needs to be a function, therefore make it a function before merging with defaultTranslations
    let tmpTranslations = { ...this.translations }
    const noResults = this.translations.searchNoResults ? { searchNoResults: () => this.translations.searchNoResults } : {}
    tmpTranslations = { ...tmpTranslations, ...noResults }

    this.mergedTranslations = { ...this.defaultTranslations, ...tmpTranslations }
  },

  beforeUpdate() {
    this.headerCellCount = this.headerFields.length
  },

  mounted () {
    this.tableEl = this.$refs.tableEl
    /**
     * Why is this here you may ask?
     * Tables and overflow are difficult to handle.
     * When truncating cell we want a table cell to respect the max-width of our table.
     * This can be achieved through table-layout: fixed;
     * However, we want to have automatic cell sizing dependent on content.
     * Therefore, we have a normal table, get the auto-sized cell width and set the layout to fixed afterwards.
     */
    if (this.isResizable || this.isTruncatable) {
      const firstRow = this.tableEl.firstChild
      const tableHeaders = Array.prototype.slice.call(firstRow.childNodes)
      tableHeaders.forEach(tableHeader => {
        /**
         * Some of childNodes of the first table row are not Element nodes but comments or text.
         * This originates in the Vue template compiler leaving empty html comments when rendering
         * falsy `v-if` blocks. We allow only nodeType "Element" to access its `getBoundingClientRect` api.
         */
        if(tableHeader.nodeType === 1) {
          const width = tableHeader.getBoundingClientRect().width
          tableHeader.style.width = width + 'px'
        }
      })

      this.tableEl.style.tableLayout = 'fixed'
      this.tableEl.classList.add('is-fixed')

      // Remove styles set by initialMaxWidth and initialWidth after copying rendered width into th styles
      if (this.isResizable) {
        const tableRows = Array.from(this.tableEl.children[1].children)
        tableRows.forEach(tableRow => {
          Array.from(tableRow.children).forEach(cell => {
            cell.firstChild.style.width = null
            cell.firstChild.style.maxWidth = null
            cell.firstChild.style.minWidth = null
          })
        })
      }
    }

    /**
     * It makes no sense to have both props `isExpandable` and `isTruncatable` activated on an instance
     * of DpDataTable from a UX perspective, since both do roughly the same, but based on a different kind
     * of presentation.
     */
    if (this.isExpandable && this.isTruncatable) {
      console.error('`isExpandable` and `isTruncatable` should not be activated at the same time when using DpDataTable.')
    }

    this.forceElementSelections(this.shouldBeSelectedItems)
  }
}
</script>
