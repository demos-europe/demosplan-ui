<template>
  <tr
    class="row"
    :data-cy="dataCy !== '' ? dataCy : false"
    :class="[{ 'opacity-70': isLoading }, { 'is-expanded-row': expanded }]">
    <td
      v-if="isDraggable"
      class="c-data-table__cell--narrow">
      <dp-icon
        icon="drag-handle"
        class="c-data-table__drag-handle" />
    </td>

    <td
      v-if="isSelectable"
      class="c-data-table__cell--narrow">
      <dp-icon
        v-if="isLocked"
        v-tooltip="isLockedMessage"
        class="align-middle color--grey-light"
        icon="lock" />
      <input
        v-else
        type="checkbox"
        class="u-m-0 align-middle"
        data-cy="selectItem"
        :name="isSelectableName || null"
        :value="isSelectableName ? item[trackBy] : null"
        :checked="checked"
        @click="toggleSelect(item[trackBy])">
    </td>

    <td
      v-for="(field, idx) in fields"
      :key="`${field}:${idx}`"
      :class="[{ 'c-data-table__resizable': isTruncatable }, { 'break-words': isResizable }]"
      :data-col-idx="`${idx}`">
      <div
        :class="[
          isTruncatable ?? 'break-words',
          isTruncatable
            ? wrapped
              ? 'c-data-table__resizable--wrapped'
              : 'c-data-table__resizable--truncated'
            : ''
        ]"
        :style="isTruncatable ?? elementStyle(field)">
        <slot
          v-if="$slots[field](item)[0].children.length > 0"
          :name="field"
          v-bind="item" />
        <span
          v-else
          v-cleanhtml="highlighted(field)" />
      </div>
    </td>

    <td
      v-if="hasFlyout"
      class="overflow-visible min-w-[50px]">
      <slot
        name="flyout"
        v-bind="item" />
    </td>

    <td
      v-if="isExpandable"
      class="c-data-table__cell--narrow overflow-hidden min-w-[50px]"
      :class="{ 'is-open': expanded }"
      :title="expanded ? translations.ariaCollapse : translations.ariaExpand"
      @click="toggleExpand(item[trackBy])">
      <dp-wrap-trigger
        :data-cy="`isExpandableWrapTrigger:${$attrs.index}`"
        :expanded="expanded" />
    </td>

    <td
      v-if="isTruncatable"
      class="c-data-table__cell--narrow overflow-hidden min-w-[50px]"
      :class="{ 'is-open': wrapped }"
      :title="wrapped ? translations.ariaCollapse : translations.ariaExpand"
      @click="toggleWrap(item[trackBy])">
      <dp-wrap-trigger
        :data-cy="`isTruncatableWrapTrigger:${$attrs.index}`"
        :expanded="wrapped" />
    </td>
  </tr>
</template>

<script>
import { CleanHtml } from '~/directives'
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import DpWrapTrigger from './DpWrapTrigger'
import DomPurify from 'dompurify'

export default {
  name: 'DpTableRow',

  components: {
    DpIcon,
    DpWrapTrigger
  },

  directives: {
    cleanhtml: CleanHtml
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

  data () {
    return {
      translations: {
        ariaCollapse: de.aria.collapse.element,
        ariaExpand: de.aria.expand.element
      }
    }
  },

  computed: {
    highlighted () {
      return (field) => {
        let itemValue = this.item[field]

        if (this.searchTerm === '') {
          return itemValue
        }

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
