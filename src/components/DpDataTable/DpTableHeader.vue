<template>
  <tr
    ref="tableHeader"
    :data-cy="dataCy !== '' ? dataCy : false"
    :class="{ 'c-data-table__sticky-header': isSticky }"
  >
    <th
      v-if="isDraggable"
      :class="[{ 'border-r border-b-2 border-neutral-light-3': hasBorders }, { 'p-[16px]': density === 'spacious' }]"
      :data-col-field="isResizable ? 'dragHandle' : null"
      class="c-data-table__cell--narrow"
      scope="col"
    >
      <dp-icon
        class="c-data-table__drag-handle"
        icon="drag-handle"
      />
    </th>
    <th
      v-if="isSelectable"
      :class="[{ 'border-b-2 border-neutral-light-3': hasBorders }, { 'p-[16px]': density === 'spacious' }]"
      :data-col-field="isResizable ? 'select' : null"
      scope="col"
      class="c-data-table__cell--narrow"
    >
      <input
        ref="selectAll"
        :aria-label="translations.headerSelectHint"
        :title="translations.headerSelectHint"
        type="checkbox"
        data-cy="selectAll"
        :checked="checked"
        @click="toggleSelectAll()"
      >
    </th>
    <template
      v-for="(hf, idx) in headerFields"
      :key="`header-${hf.field}`"
    >
      <component
        :is="isResizable ? 'DpResizableColumn' : 'th'"
        :class="[{ 'border-r border-b-2 border-neutral-light-3': hasBorders }, { 'p-[16px]': density === 'spacious' }, { 'c-data-table__col--fixed': isColumnsDraggable && hf.fixed }]"
        :data-col-field="hf.field"
        :header-field="hf"
        :idx="idx"
        :is-last="headerFields.length - 1 === idx ? true : null"
        :next-header="headerFields[idx + 1]"
      >
        <div class="flex items-center justify-between">
          <slot
            v-if="$slots[`header-${hf.field}`] && $slots[`header-${hf.field}`](hf)[0].children?.length > 0"
            :name="`header-${hf.field}`"
            v-bind="hf"
          >
            <div :class="{ 'c-data-table__resizable--truncated': isTruncatable }">
              <span
                v-if="hf.label"
                v-text="hf.label"
              />
            </div>
          </slot>
          <span
            v-else-if="hf.label"
            v-text="hf.label"
          />
          <span
            v-if="isColumnsDraggable && !hf.fixed"
            :aria-label="translations.headerReorderColumnHint"
            class="c-data-table__col-drag-handle cursor-grab"
          >
            <dp-icon icon="dots-six-vertical" />
          </span>
        </div>
      </component>
    </template>
    <th
      v-if="hasFlyout"
      :class="[{ 'border-b-2 border-neutral-light-3': hasBorders }, { 'p-[16px]': density === 'spacious' }]"
      :data-col-field="isResizable ? 'flyout' : null"
      class="c-data-table__col--flyout"
      scope="col"
    />
    <th
      v-if="isExpandable"
      scope="col"
      class="c-data-table__col--expand c-data-table__cell--narrow"
      @click="toggleExpandAll()"
    >
      <dp-wrap-trigger
        data-cy="isExpandableWrapTrigger"
        :expanded="allExpanded"
        :title="translations.headerExpandHint"
      />
    </th>
    <th
      v-if="isTruncatable"
      :data-col-field="isResizable ? 'wrap' : null"
      scope="col"
      class="c-data-table__cell--narrow"
      @click="toggleWrapAll()"
    >
      <dp-wrap-trigger
        data-cy="isTruncatableWrapTrigger"
        :title="translations.headerExpandHint"
      />
    </th>
  </tr>
</template>

<script>
import DpIcon from '~/components/DpIcon'
import DpResizableColumn from './DpResizableColumn'
import DpWrapTrigger from './DpWrapTrigger'
import Sortable from 'sortablejs'

export default {
  name: 'DpTableHeader',

  components: {
    DpIcon,
    DpResizableColumn,
    DpWrapTrigger,
  },

  props: {
    allExpanded: {
      type: Boolean,
      required: false,
      default: false,
    },

    checked: {
      type: Boolean,
      required: true,
    },

    dataCy: {
      type: String,
      required: false,
      default: '',
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

    hasFlyout: {
      type: Boolean,
      required: true,
    },

    headerFields: {
      type: Array,
      required: true,
    },

    indeterminate: {
      type: Boolean,
      required: false,
      default: false,
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

    isExpandable: {
      type: Boolean,
      required: false,
      default: false,
    },

    isResizable: {
      type: Boolean,
      required: false,
      default: false,
    },

    isSelectable: {
      type: Boolean,
      required: true,
    },

    isSticky: {
      type: Boolean,
      required: false,
      default: false,
    },

    isTruncatable: {
      type: Boolean,
      required: false,
      default: false,
    },

    translations: {
      type: Object,
      required: true,
    },
  },

  emits: [
    'toggle-expand-all',
    'column-reorder',
    'toggle-select-all',
    'toggle-wrap-all',
  ],

  watch: {
    indeterminate () {
      this.setIndeterminate()
    },
  },

  methods: {
    setIndeterminate () {
      if (this.isSelectable) {
        this.$refs.selectAll.indeterminate = this.indeterminate
      }
    },

    toggleExpandAll () {
      this.$emit('toggle-expand-all')
    },

    toggleSelectAll () {
      this.$emit('toggle-select-all')
    },

    toggleWrapAll () {
      this.$emit('toggle-wrap-all')
    },
  },

  beforeUpdate () {
    this.setIndeterminate()
  },

  mounted () {
    if (!this.isColumnsDraggable) return

    const fixedFields = new Set(this.headerFields.filter(hf => hf.fixed).map(hf => hf.field))

    Sortable.create(this.$refs.tableHeader, {
      animation: 150,
      filter: '.c-data-table__cell--narrow, .c-data-table__col--flyout',
      handle: '.c-data-table__col-drag-handle',
      draggable: 'th',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      onMove: (event) => {
        const relatedField = event.related.getAttribute('data-col-field')
        const systemFields = new Set(['select', 'flyout', 'dragHandle', 'wrap'])
        // Only allow moving adjacent to other draggable (non-fixed, non-system) columns
        if (!relatedField || systemFields.has(relatedField) || fixedFields.has(relatedField)) {
          return false
        }
      },

      onEnd: () => {
        const ths = Array.from(this.$refs.tableHeader.querySelectorAll('th[data-col-field]'))
        const newOrder = ths
          .map(th => th.getAttribute('data-col-field'))
          .filter(field => !['select', 'flyout', 'dragHandle', 'wrap'].includes(field))
          .filter(field => !fixedFields.has(field))
        this.$emit('column-reorder', newOrder)
      },
    })
  },

}
</script>
