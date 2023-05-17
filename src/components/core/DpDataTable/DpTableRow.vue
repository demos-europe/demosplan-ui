<template>
  <tr
    class="row"
    :class="[{ 'opacity-7': isLoading }, { 'is-expanded-row': expanded }]">
    <td
      v-if="isDraggable"
      class="c-data-table__cell--narrow">
      <dp-icon icon="drag-handle" />
    </td>
    <td
      v-if="isSelectable"
      class="c-data-table__cell--narrow">
      <dp-icon
        v-if="isLocked"
        class="u-valign--middle color--grey-light"
        v-tooltip="isLockedMessage"
        icon="lock" />
      <input
        v-else
        type="checkbox"
        class="u-m-0 u-valign--middle"
        data-cy="selectItem"
        :name="isSelectableName || null"
        :value="isSelectableName ? item[trackBy] : null"
        :checked="checked"
        @click="toggleSelect(item[trackBy])">
    </td>
    <template
      v-for="(field, idx) in fields"
      :key="`${field}:${idx}`">
      <td
        :class="{ 'c-data-table__resizable': isTruncatable }"
        :data-col-idx="`${idx}`">
        <div
          v-if="isTruncatable"
          :class="wrapped ? 'c-data-table__resizable--wrapped overflow-word-break' : 'c-data-table__resizable--truncated overflow-word-break'"
          :style="elementStyle(field)">
          <slot
            :name="field"
            v-bind="item" >
            <span
              v-if="searchTerm && item[field]"
              v-html="highlighted(field)" />
            <span
               v-else
               v-text="item[field]" />
          </slot>
        </div>
        <template v-else>
          <slot
            :name="field"
            v-bind="item">
            <span
              v-if="searchTerm && item[field]"
              v-html="highlighted(field)" />
            <span v-text="item[field]" v-else />
          </slot>
        </template>
      </td>
    </template>
    <td
      v-if="hasFlyout"
      class="overflow-visible">
      <slot
        name="flyout"
        v-bind="item" />
    </td>
    <td
      v-if="isExpandable"
      class="c-data-table__cell--narrow"
      :class="{ 'is-open': expanded }"
      :title="Translator.trans(expanded ? 'aria.collapse' : 'aria.expand')"
      @click="toggleExpand(item[trackBy])">
      <dp-wrap-trigger :expanded="expanded" />
    </td>
    <td
      v-if="isTruncatable"
      class="c-data-table__cell--narrow"
      :class="{ 'is-open': wrapped }"
      :title="Translator.trans(wrapped ? 'aria.collapse' : 'aria.expand')"
      @click="toggleWrap(item[trackBy])">
      <dp-wrap-trigger :expanded="wrapped" />
    </td>
  </tr>
</template>

<script>
import DpIcon from '../../DpIcon/DpIcon'
import DpWrapTrigger from './DpWrapTrigger'
import DomPurify from 'dompurify'
export default {
  name: "DpTableRow",

  components: {
    DpIcon,
    DpWrapTrigger
  },

  props: {
    checked: {
      type: Boolean,
      required: true
    },

    /**
     * Is the expandable content currently expanded?
     */
    expanded: {
      type: Boolean,
      required: false,
      default: false
    },

    hasFlyout: {
      type: Boolean,
      required: true
    },

    /**
     * The header of every column of the table is defined here.
     *
     * Each column is represented by an object with a `field` key whose value should match
     * a key of the objects inside `items`. The `label` key controls the header of the column.
     * The header can also have a tooltip. To define the width the column is initially
     * rendered with when `isResizable` is used, the key `initialWidth` takes a px value.
     */
    headerFields: {
      type: Array,
      required: true
    },

    fields: {
      type: Array,
      required: true
    },

    item: {
      type: Object,
      required: true
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

    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * The item can be locked for selection. Instead of the checkbox, a lock icon is rendered with a tooltip.
     */
    isLocked: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * If an item is locked for selection, the message to be shown inside the tooltip can be set here.
     */
    isLockedMessage: {
      type: String,
      required: false,
      default: null
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

    isSelectableName: {
      type: String,
      required: false,
      default: null
    },

    isTruncatable: {
      type: Boolean,
      required: false,
      default: false
    },

    searchTerm: {
      type: RegExp,
      required: true
    },

    trackBy: {
      type: String,
      required: true
    },

    /**
     * Is the truncatable content currently truncated?
     * Rename to `notTruncated`?
     */
    wrapped: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    highlighted () {
      return (field) => {
        let itemValue = this.item[field]
        itemValue = DomPurify.sanitize(itemValue)

        return itemValue.replace(this.searchTerm, '<span style="background-color: yellow;">$&</span>')
      }
    },
    elementStyle () {
      return (field) => {
        const headerField = this.headerFields.find((hf) => hf.field === field)
        let style = ''

        if (!this.wrapped && typeof headerField.initialWidth !== 'undefined') {
          style += `width: ${headerField.initialWidth}px;`
        }
        if (!this.wrapped && typeof headerField.initialMaxWidth !== 'undefined') {
          style += `max-width: ${headerField.initialMaxWidth}px;`
        }
        if (!this.wrapped && typeof headerField.initialMinWidth !== 'undefined') {
          style += `min-width: ${headerField.initialMinWidth}px;`
        }

        return style
      }
    }
  },
  methods: {
    toggleSelect (id) {
      this.$emit('toggle-select', id)
    },
    toggleWrap (id) {
      this.$emit('toggle-wrap', id)
    },
    toggleExpand (id) {
      this.$emit('toggle-expand', id)
    }
  }
}
</script>
