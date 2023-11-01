<template>
  <div
    role="menu"
    class="bg-color-selection space-inset-s line-height--1_6">
    <span class="u-mr">
      {{ selectedItemsText }}
    </span>
    <slot :selected-items-count="selectedItemsCount">
      <!-- place edit actions here -->
    </slot>
    <button
      type="button"
      class="btn btn--secondary float-right"
      @click="$emit('reset-selection')">
      {{ deselect }}
    </button>
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'

export default {
  name: 'DpBulkEditHeader',

  props: {
    selectedItemsCount: {
      type: Number,
      required: false,
      default: 0
    },

    selectionText: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    deselect () {
      return de.operations.deselect.element
    },

    selectedItemsText () {
      return this.selectedItemsCount + ' ' + this.selectionText
    }
  }
}
</script>
