<template>
  <tr
    ref="tableHeader"
    :class="{ 'c-data-table__sticky-header': isSticky }">
    <th
      v-if="isDraggable"
      scope="col"
      class="c-data-table__cell--narrow">
      <dp-icon class="c-data-table__drag-handle" :icon="drag-handle" />
    </th>
    <th
      v-if="isSelectable"
      scope="col"
      class="c-data-table__cell--narrow">
      <input
        :aria-label="this.translations.headerSelectHint"
        :title="this.translations.headerSelectHint"
        type="checkbox"
        data-cy="selectAll"
        ref="selectAll"
        @click="toggleSelectAll()"
        :checked="checked"
        :indeterminate="indeterminate" />
    </th>
    <template v-for="(hf, idx) in headerFields">
      <dp-resizable-column
        v-if="isResizable"
        :is-last="headerFields.length === idx"
        :header-field="hf"
        :idx="idx">
        {{ hf.label }}
      </dp-resizable-column>
      <th
        v-else
        v-text="hf.label"
        scope="col">
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
      <dp-wrap-trigger :title="translations.headerExpandHint" />
    </th>
    <th
      v-if="isTruncatable"
      scope="col"
      class="c-data-table__cell--narrow"
      @click="toggleWrapAll()">
      <dp-wrap-trigger :title="translations.headerExpandHint" />
    </th>
  </tr>
</template>

<script>
import DpIcon from '../../DpIcon/DpIcon'
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

  methods: {
    toggleSelectAll () {
      this.$emit('toggle-select-all')
    },
    toggleWrapAll () {
      this.$emit('toggle-wrap-all')
    },
    toggleExpandAll () {
      this.$emit('toggle-expand-all')
    }
  }
}
</script>
