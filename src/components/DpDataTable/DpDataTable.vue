<template>
  <div>
    <table
      ref="tableEl"
      :data-cy="`${dataCy}:table`"
      :class="[tableClass, { 'border-separate border-spacing-0': isResizable || hasStickyHeader }]"
    >
      <caption
        class="sr-only"
        v-text="tableDescription"
      />
      <colgroup v-if="headerFields.some(field => field.colClass)">
        <col v-if="isDraggable">
        <col v-if="isSelectable">
        <col
          v-for="(field, index) in headerFields"
          :key="index"
          :class="field.colClass"
        >
        <col v-if="hasFlyout">
        <col v-if="isExpandable">
        <col v-if="isTruncatable">
      </colgroup>

      <thead>
        <dp-table-header
          :data-cy="`${dataCy}:header`"
          :all-expanded="allExpanded"
          :checked="allSelected"
          :density="density"
          :has-flyout="hasFlyout"
          :has-borders="hasBorders"
          :header-fields="orderedHeaderFields"
          :indeterminate="indeterminate"
          :is-columns-draggable="isColumnsDraggable"
          :is-draggable="isDraggable"
          :is-expandable="isExpandable"
          :is-resizable="isResizable"
          :is-selectable="isSelectable"
          :is-sticky="hasStickyHeader"
          :is-truncatable="isTruncatable"
          :translations="headerTranslations"
          @column-reorder="applyReorder"
          @toggle-expand-all="toggleExpandAll"
          @toggle-select-all="toggleSelectAll"
          @toggle-wrap-all="toggleWrapAll"
        >
          <template
            v-for="field in headerFields"
            :key="field.field"
            v-slot:[`header-${field.field}`]="headerSlotData"
          >
            <slot
              :name="`header-${field.field}`"
              v-bind="headerSlotData"
            />
          </template>
        </dp-table-header>
      </thead>

      <!-- not draggable -->
      <tbody
        v-if="!isDraggable && !isLoading"
        :data-cy="`${dataCy}:tbody`"
      >
        <template
          v-for="(item, idx) in items"
          :key="idx"
        >
          <dp-table-row
            :ref="`tableRows[${idx}]`"
            :data-cy="`${dataCy}:row:${idx}`"
            :index="idx"
            :checked="elementSelections[item[trackBy]] || false"
            :density="density"
            :expanded="expandedElements[item[trackBy]] || false"
            :fields="fields"
            :has-borders="hasBorders"
            :has-flyout="hasFlyout"
            :header-fields="orderedHeaderFields"
            :is-draggable="isDraggable"
            :is-expandable="isExpandable"
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
            @toggle-wrap="toggleWrap"
          >
            <template
              v-for="field in fields"
              :key="field"
              v-slot:[field]="slotProps"
            >
              <slot
                :name="field"
                v-bind="slotProps"
              />
            </template>
            <template v-slot:flyout="flyoutSlotProps">
              <slot
                name="flyout"
                v-bind="flyoutSlotProps"
              />
            </template>
          </dp-table-row>

          <!-- DpTableRowExpanded -->
          <tr
            v-if="expandedElements[item[trackBy]] || false"
            :class="{ 'is-expanded-content': expandedElements[item[trackBy]] }"
          >
            <td
              :class="{ 'opacity-70': isLoading }"
              :colspan="colCount"
              @focus="addHoveredClass(idx)"
              @blur="removeHoveredClass(idx)"
              @mouseenter="addHoveredClass(idx)"
              @mouseleave="removeHoveredClass(idx)"
            >
              <slot
                name="expandedContent"
                v-bind="item"
              />
            </td>
          </tr>
        </template>
      </tbody>

      <dp-draggable
        v-if="isDraggable && !isLoading"
        draggable-tag="tbody"
        :content-data="items"
        handle="c-data-table__drag-handle"
        ghost-class="sortable-ghost"
        chosen-class="sortable-chosen"
        @end="(event, item) => $emit('changed-order', event, item)"
      >
        <template
          v-for="(item, idx) in items"
          :key="item[trackBy]"
        >
          <dp-table-row
            :checked="elementSelections[item[trackBy]] || false"
            :density="density"
            :expanded="expandedElements[item[trackBy]] || false"
            :fields="fields"
            :has-borders="hasBorders"
            :has-flyout="hasFlyout"
            :header-fields="orderedHeaderFields"
            :index="idx"
            :is-draggable="isDraggable"
            :is-expandable="isExpandable"
            :is-loading="isLoading"
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
            @toggle-wrap="toggleWrap"
          >
            <template
              v-for="field in fields"
              v-slot:[field]="slotProps"
              :key="field"
            >
              <slot
                :name="field"
                v-bind="slotProps"
              />
            </template>
            <template v-slot:flyout="flyoutSlotProps">
              <slot
                name="flyout"
                v-bind="flyoutSlotProps"
              />
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
          v-html="noResults"
        />

        <!-- noEntriesItem -->
        <td
          v-else
          :colspan="colCount"
          class="u-pt"
        >
          <dp-loading
            v-if="isLoading"
            is-loading
            class="u-mt"
            :colspan="colCount"
          />
          <template v-else>
            {{ mergedTranslations.tableNoElements }}
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { CleanHtml } from '~/directives'
import { de } from '~/components/shared/translations'
import DomPurify from 'dompurify'
import DpDraggable from '~/components/DpDraggable'
import DpLoading from '~/components/DpLoading'
import DpTableHeader from './DpTableHeader'
import DpTableRow from './DpTableRow'
import { sessionStorageMixin } from '~/mixins'

export default {
  name: 'DpDataTable',

  components: {
    DpTableRow,
    DpTableHeader,
    DpLoading,
    DpDraggable,
  },

  directives: {
    cleanhtml: CleanHtml,
  },

  mixins: [sessionStorageMixin],

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'dateTable',
    },

    density: {
      type: String,
      required: false,
      default: 'compact',
      validator: (prop) => ['compact', 'spacious'].includes(prop),
    },

    hasBorders: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Adds flyout menu
    hasFlyout: {
      type: Boolean,
      required: false,
      default: false,
    },

    // The first table row (consisting of column headers) is being fixed to the top of the outer table element.
    hasStickyHeader: {
      type: Boolean,
      required: false,
      default: false,
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
      required: true,
    },

    initSelectedItems: {
      type: Array,
      required: false,
      default: () => [],
    },

    columnStorageKey: {
      type: String,
      required: false,
      default: '',
    },

    isColumnsDraggable: {
      type: Boolean,
      required: false,
      default: false,
    },

    isDraggable: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Rows may be expandable to show additional content inside another row.
     * The `#expandedContent` slot can be utilized to style the content area.
     */
    isExpandable: {
      type: Boolean,
      required: false,
      default: false,
    },

    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Make table columns resizable.
     */
    isResizable: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Display a checkbox in front of each row.
     */
    isSelectable: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * If specified, the checkbox will have a "name" attr with this value, and a value of [trackBy].
     */
    isSelectableName: {
      type: String,
      required: false,
      default: null,
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
      default: false,
    },

    items: {
      type: Array,
      required: true,
    },

    /**
     * When selection on multiple pages is supported, this variable forces the "Check all" checkbox into a "checked"
     * state, because instead of passing all checked items into here (which we can't in multi-page-selection suzenario),
     * we just pass the info "all items are selected".
     */
    multiPageAllSelected: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Use a Boolean Property of the Item to set the Checkbox to a locked state.
     * This should only be set if `isSelectable` is true.
     */
    lockCheckboxBy: {
      type: String,
      required: false,
      default: null,
    },

    /**
     * When selection on multiple pages is supported, this variable holds number of items currently toggled.
     * It is used for calculating indeterminate state of the "check all" checkbox.
     */
    multiPageSelectionItemsToggled: {
      type: Number,
      required: false,
      default: 0,
    },

    /**
     * When selection on multiple pages is supported, this variable holds the absolute number of items available.
     * It is used for calculating indeterminate state of the "check all" checkbox.
     */
    multiPageSelectionItemsTotal: {
      type: Number,
      required: false,
      default: 0,
    },

    searchString: {
      type: [String, null],
      required: false,
      default: null,
    },

    // This allows item selection to be forced from outside. It will override any internal selection state.
    shouldBeSelectedItems: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    tableClass: {
      type: String,
      required: false,
      default: 'c-data-table',
    },

    tableDescription: {
      type: String,
      required: false,
      default: '',
    },

    trackBy: {
      type: String,
      required: true,
    },

    translations: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },

  emits: [
    'changed-order',
    'items-selected',
    'items-toggled',
    'selectAll',
  ],

  data () {
    return {
      allExpanded: false,
      allWrapped: false,
      currentItems: [],
      defaultTranslations: {
        footerSelectedElement: de.entrySelected,
        footerSelectedElements: de.entriesSelected,
        headerExpandHint: de.expandAll,
        headerSelectHint: de.operations.select.all,
        lockedForSelection: de.item.lockedForSelection,
        searchNoResults: (searchTerm) =>  de.search.noResults({ searchTerm: searchTerm }),
        tableLoadingData: de.loadingData,
        tableNoElements: de.noEntriesAvailable,
      },
      elementSelections: {},
      expandedElements: {},
      headerCellCount: 0,
      mergedTranslations: {},
      orderedHeaderFields: [],
      selectedElements: [],
      tableEl: undefined,
      tableProps: [
        this.isDraggable,
        this.isSelectable,
        this.hasFlyout,
        this.isExpandable,
        this.isTruncatable,
      ],
      wrappedElements: {},
    }
  },

  computed: {
    allSelected () {
      if (this.multiPageSelectionItemsTotal > 0) {
        return this.multiPageSelectionItemsToggled === this.multiPageSelectionItemsTotal || this.multiPageAllSelected
      } else {
        return this.items.filter(item => this.elementSelections[item[this.trackBy]]).length === this.selectableItems.length
      }
    },

    colCount () {
      let tableCellCount = 0

      this.tableProps.map((prop) => {
        tableCellCount += prop ? 1 : 0
      })

      return this.headerCellCount + tableCellCount
    },

    fields () {
      return this.orderedHeaderFields.map(hf => hf.field)
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
      const searchTerm = this.escapeSpecialCharacters(this.searchString)
      return new RegExp(searchTerm, 'ig')
    },

    searchTermSet () {
      return this.searchTerm.source !== '(?:)'
    },

    selectableItems () {
      return this.lockCheckboxBy ? this.items.filter(item => !item[this.lockCheckboxBy]) : this.items
    },
  },

  watch: {
    headerFields: {
      handler () {
        this.initColumnOrder()

        if (this.isResizable) {
          this.$nextTick(() => {
            const firstRow = this.tableEl.getElementsByTagName('tr')[0]
            const tableHeaderElements = firstRow ? firstRow.children : null

            this.setColsWidth(tableHeaderElements)
            this._fillContainerWidth(tableHeaderElements)
          })
        }
      },
      deep: false, // HeaderFields are always replaces as a whole and therefor deep watch is not necessary
    },

    shouldBeSelectedItems () {
      this.forceElementSelections(this.shouldBeSelectedItems)
    },
  },

  methods: {
    addHoveredClass(idx) {
      const tableRow = this.$refs[`tableRows[${idx}]`]

      return tableRow[0].$el.classList.add('is-hovered-content')
    },

    applyReorder (newFieldNames) {
      // NewFieldNames contains only draggable (non-fixed) columns in new order
      const draggableNew = newFieldNames
        .map(name => this.headerFields.find(f => f.field === name))
        .filter(Boolean)

      // Reconstruct full order: fixed columns stay at their original headerFields positions
      let draggableIdx = 0
      this.orderedHeaderFields = this.headerFields.map(hf => {
        if (hf.fixed) return hf
        return draggableNew[draggableIdx++] || hf
      })

      if (this.columnStorageKey) {
        const nonFixedOrder = this.orderedHeaderFields.filter(f => !f.fixed).map(f => f.field)
        sessionStorage.setItem(
          `dpDataTable:columnOrder:${this.columnStorageKey}`,
          JSON.stringify(nonFixedOrder),
        )
      }
    },

    /**
     * This method is used to escape special characters in a string.
     * It specifically targets spaces and plus signs.
     *
     * @param {string} string - The string to be processed.
     * @returns {string} - The processed string with special characters escaped.
     */
    escapeSpecialCharacters (string) {
      return string
        .replace(/(\s)/g, ' ')
        .replace(/([+])/g, '\\$&')
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

    getColWidthFromHeaderField (field) {
      const headerField = this.headerFields.find(headerField => headerField.field === field)

      return headerField && headerField.colWidth ? headerField.colWidth : null
    },


    getFixedColWidth (field) {
      if (field === 'flyout') {
        return '60px'
      }

      return ['wrap', 'select', 'dragHandle'].includes(field) ?
        '30px' :
        null
    },

    initColumnOrder () {
      if (!this.columnStorageKey) {
        this.orderedHeaderFields = [...this.headerFields]
        return
      }

      try {
        const stored = sessionStorage.getItem(`dpDataTable:columnOrder:${this.columnStorageKey}`)
        if (!stored) {
          this.orderedHeaderFields = [...this.headerFields]
          return
        }

        const storedOrder = JSON.parse(stored) // Only non-fixed fields
        const nonFixedFields = this.headerFields.filter(f => !f.fixed)
        const storedSet = new Set(storedOrder)

        const orderedNonFixed = [
          ...storedOrder.map(name => nonFixedFields.find(f => f.field === name)).filter(Boolean),
          ...nonFixedFields.filter(f => !storedSet.has(f.field)),
        ]

        // Reconstruct: fixed fields at original positions, non-fixed in stored order
        let nonFixedIdx = 0
        this.orderedHeaderFields = this.headerFields.map(hf => {
          if (hf.fixed) return hf
          return orderedNonFixed[nonFixedIdx++] || hf
        })
      } catch {
        this.orderedHeaderFields = [...this.headerFields]
      }
    },

    removeHoveredClass(idx) {
      const tableRow = this.$refs[`tableRows[${idx}]`]

      return tableRow[0].$el.classList.remove('is-hovered-content')
    },

    resetSelection () {
      this.toggleSelectAll(false)
    },

    setColsWidth (headers) {
      Array.from(headers).forEach(tableHeaderEl => {
        /**
         * Some of childNodes of the first table row are not Element nodes but comments or text.
         * This originates in the Vue template compiler leaving empty html comments when rendering
         * falsy `v-if` blocks. We allow only nodeType "Element" to access its `getBoundingClientRect` api.
         */
        if (tableHeaderEl.nodeType === 1) {
          const headerField = tableHeaderEl.getAttribute('data-col-field')
          const storageName = `dpDataTable:data-col-field=${headerField}`
          const sessionColWidth = this.getItemFromSessionStorage(storageName)
          /**
           * Some columns, such as 'flyout' and 'wrap', should not be resizable;
           * their width is fixed; the getBoundingClientRect() function should not be applied to them
           */
          const fixedWidth = this.getFixedColWidth(headerField)
          const headerFieldWidth = this.getColWidthFromHeaderField(headerField)

          const width = fixedWidth
            || sessionColWidth
            || headerFieldWidth
            || `${tableHeaderEl.getBoundingClientRect().width}px`

          tableHeaderEl.style.width = width
          this.updateSessionStorage(storageName, width)
        }
      })
    },

    /**
     * Distribute available container width among data columns so the sticky flyout always
     * stays at its fixed 60px width and no column remains at 0px.
     *
     * When scale > 1 (columns don't fill the container), all data columns are scaled up
     * proportionally. When scale <= 1 (columns fill or overflow), only columns that ended
     * up at 0px (added while table-layout:fixed was active and no space remained) are set
     * to their minimum width — other columns are left untouched.
     */
    _fillContainerWidth (headers) {
      const containerWidth = this.tableEl.parentElement.clientWidth
      if (!containerWidth) return

      const dataCols = []
      let fixedTotal = 0

      Array.from(headers).forEach(th => {
        if (th.nodeType !== 1) return
        const field = th.dataset.colField
        const fixedWidth = this.getFixedColWidth(field)
        if (fixedWidth) {
          fixedTotal += Number.parseInt(fixedWidth, 10)
        } else if (field) {
          /*
           * Prefer colWidth over th.style.width to avoid carrying a previously scaled value
           * into the next calculation. Fall back to initialMinWidth (or 50px) for columns
           * that have 0px in the DOM — getBoundingClientRect returns 0 for columns added
           * after table-layout:fixed is active and the table is already full-width.
           * actualWidth is kept separately so the scale <= 1 branch can identify and fix
           * those 0px columns without touching correctly-sized ones.
           */
          const colWidth = this.getColWidthFromHeaderField(field)
          const hf = this.headerFields.find(h => h.field === field)
          const minWidth = (hf && hf.initialMinWidth) || 50
          const actualWidth = Number.parseFloat(th.style.width) || 0
          const naturalWidth = Math.max(Number.parseFloat(colWidth) || actualWidth, minWidth)
          dataCols.push({ th, naturalWidth, actualWidth })
        }
      })

      if (dataCols.length === 0 || fixedTotal === 0) return

      const availableForData = containerWidth - fixedTotal
      if (availableForData <= 0) return

      const naturalTotal = dataCols.reduce((sum, col) => sum + col.naturalWidth, 0)
      if (naturalTotal <= 0) return

      const scale = availableForData / naturalTotal

      if (scale > 1) {
        /*
         * Scale up: distribute all available space proportionally so data columns fill
         * the container and the flyout stays exactly at its fixed width.
         */
        dataCols.forEach(({ th, naturalWidth }) => {
          th.style.width = `${Math.round(naturalWidth * scale)}px`
        })
      } else {
        /*
         * Columns fill or overflow the container — no scaling needed.
         * Still fix any column whose actual DOM width is 0px (added while table-layout:fixed
         * was active with no remaining space) so the browser does not redistribute the missing
         * space to other columns, which would inflate the sticky flyout beyond its 60px.
         */
        dataCols.forEach(({ th, naturalWidth, actualWidth }) => {
          if (actualWidth <= 0) {
            th.style.width = `${naturalWidth}px`
          }
        })
      }
    },

    setElementSelections (elements, status) {
      return elements.reduce((acc, el) => {
        return {
          ...acc,
          ...{ [el[this.trackBy]]: status },
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
          ...{ [item[this.trackBy]]: status },
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
      this.elementSelections = this.setElementSelections(this.selectableItems, status)
      this.selectedElements = this.filterElementSelections()
      this.$emit('items-selected', this.selectedElements)
      this.$emit('items-toggled', this.selectableItems.map(el => {
        return { id: el[this.trackBy] }
      }), status)

      // Used by multi-page selection in SegmentsList to determine whether to track selected or deselected items.
      this.$emit('selectAll', status)
    },

    toggleWrap (id) {
      this.wrappedElements = { ...this.wrappedElements, [id]: !this.wrappedElements[id] }
    },

    toggleWrapAll (status = this.allWrapped === false) {
      this.wrappedElements = this.items.reduce((acc, item) => {
        return {
          ...acc,
          ...{ [item[this.trackBy]]: status },
        }
      }, {})

      this.allWrapped = status
    },
  },

  created () {
    this.elementSelections = this.setElementSelections(this.initSelectedItems, true)

    // The searchNoResults translation key needs to be a function, therefore make it a function before merging with defaultTranslations
    let tmpTranslations = { ...this.translations }
    const noResults = this.translations.searchNoResults ? { searchNoResults: () => this.translations.searchNoResults } : {}
    tmpTranslations = { ...tmpTranslations, ...noResults }

    this.mergedTranslations = { ...this.defaultTranslations, ...tmpTranslations }

    this.initColumnOrder()
  },

  beforeUpdate () {
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
      const firstRow = this.tableEl.getElementsByTagName('tr')[0]
      const tableHeaderElements = firstRow ? firstRow.children : null

      this.setColsWidth(tableHeaderElements)

      this.tableEl.style.tableLayout = 'fixed'
      this.tableEl.classList.add('is-fixed')

      this._fillContainerWidth(tableHeaderElements)

      // Remove styles set by initialMaxWidth and initialWidth after copying rendered width into th styles
      if (this.isResizable) {
        Array.from(tableHeaderElements).forEach(th => {
          if (th.firstChild && th.firstChild.nodeType === 1) {
            th.firstChild.style.width = null
            th.firstChild.style.maxWidth = null
            th.firstChild.style.minWidth = null
          }
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

    this.headerCellCount = this.headerFields.length
  },
}
</script>
