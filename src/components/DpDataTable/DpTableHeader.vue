<template>
  <tr
    ref="tableHeader"
    :data-cy="dataCy !== '' ? dataCy : false"
    :class="{ 'c-data-table__sticky-header': isSticky }">
    <th
      v-if="isDraggable"
      scope="col"
      class="c-data-table__cell--narrow">
      <dp-icon
        class="c-data-table__drag-handle"
        icon="drag-handle" />
    </th>
    <th
      v-if="isSelectable"
      scope="col"
      class="c-data-table__cell--narrow">
      <input
        :aria-label="translations.headerSelectHint"
        :title="translations.headerSelectHint"
        type="checkbox"
        data-cy="selectAll"
        ref="selectAll"
        @click="toggleSelectAll()"
        :checked="checked" />
    </th>
    <template v-for="(hf, idx) in headerFields">
      <dp-resizable-column
        v-if="isResizable"
        :is-last="headerFields.length === idx"
        :header-field="hf"
        :next-header="headerFields[idx + 1]"
        :idx="idx">
        <slot :name="`header-${hf.field}`">
          <span v-if="hf.label" v-text="hf.label" />
        </slot>
      </dp-resizable-column>
      <th
        v-else
        scope="col">
        <slot :name="`header-${hf.field}`">
          <span v-if="hf.label" v-text="hf.label" />
        </slot>
      </th>
    </template>
    <th
      v-if="hasFlyout"
      scope="col" />
    <th
      v-if="isExpandable"
      scope="col"
      class="c-data-table__cell--narrow"
      @click="toggleExpandAll()">
      <dp-wrap-trigger
        data-cy="isExpandableWrapTrigger"
        :title="translations.headerExpandHint" />
    </th>
    <th
      v-if="isTruncatable"
      scope="col"
      class="c-data-table__cell--narrow"
      @click="toggleWrapAll()">
      <dp-wrap-trigger
        data-cy="isTruncatableWrapTrigger"
        :title="translations.headerExpandHint" />
    </th>
  </tr>
</template>

<script>
import DpIcon from '~/components/DpIcon'
import DpWrapTrigger from './DpWrapTrigger'
import DpResizableColumn from './DpResizableColumn'

export default {
  name: 'DpTableHeader',

  components: {
    DpIcon,
    DpResizableColumn,
    DpWrapTrigger
  },

  props: {
    checked: {
      type: Boolean,
      required: true
    },

    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    hasFlyout: {
      type: Boolean,
      required: true
    },

    headerFields: {
      type: Array,
      required: true
    },

    indeterminate: {
      type: Boolean,
      required: false,
      default: false
    },

    isDraggable: {
      type: Boolean,
      required: false,
      default: false
    },

    isExpandable: {
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
      required: true
    },

    isSticky: {
      type: Boolean,
      required: false,
      default: false
    },

    isTruncatable: {
      type: Boolean,
      required: false,
      default: false
    },

    translations: {
      type: Object,
      required: true
    }
  },

  watch: {
    indeterminate () {
      this.setIndeterminate()
    }
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
    }
  },

  beforeUpdate() {
    this.setIndeterminate()
  }
}
</script>
