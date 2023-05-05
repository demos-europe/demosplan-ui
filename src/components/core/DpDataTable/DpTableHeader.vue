<template>
  <tr>
    <th
        v-for="(hf, idx) in headerFields"
        ref="tableHeader"
        :class="{ 'c-data-table__sticky-header': isSticky }"
        :data-col-idx="`${idx}`">
      <ResizableColumns v-if="isResizable" :header-fields="headerFields" :idx="idx">
        <template>
          {{ hf.label }}
        </template>
      </ResizableColumns>
      <template v-else>
        {{ hf.label }}
      </template>
    </th>
    <th v-if="isTruncatable"
        class="c-data-table__cell--narrow"
        @click="listeners.toggleWrapAll()">
      <dp-wrap-trigger :title="translations.headerExpandHint" />
    </th>
    <th class="c-data-table__cell--narrow">
      <dp-icon class="c-data-table__drag-handle" :icon="drag-handle" />
    </th>
    <th v-if="isExpandable"
        class="c-data-table__cell--narrow"
        @click="listeners.toggleExpandAll()">
      <dp-wrap-trigger :title="translations.headerExpandHint" />
    </th>
    <th v-if="hasFlyout"></th>
    <th v-if="isSelectable"
        class="c-data-table__cell--narrow">
      <input
          :aria-label="this.translations.headerSelectHint"
          :title="this.translations.headerSelectHint"
          type="checkbox"
          data-cy="selectAll"
          ref="selectAll"
          @click="$listeners.toggleSelectAll()"
          :checked="checked"
          :indeterminate="indeterminate"/>
    </th>
    <th v-if="isDraggable"
        class="c-data-table__cell--narrow">
      <dp-icon class="c-data-table__drag-handle" :icon="drag-handle" />
    </th>
  </tr>
</template>

<script>
import DpIcon from '../../DpIcon/DpIcon'
import DpWrapTrigger from './DpWrapTrigger'
import ResizableColumns from "./lib/ResizableColumns"

export default {
  name: 'DpTableHeader',
  components: {
    DpIcon,
    DpWrapTrigger,
    ResizableColumns,
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
  }
}
</script>
