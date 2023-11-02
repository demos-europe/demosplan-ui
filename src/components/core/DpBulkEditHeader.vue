<template>
  <div
    role="menu"
    class="bg-color-selection space-inset-s line-height--1_6">
    <span class="u-mr">
      {{ selectedItemsText }}
    </span>
    <slot />
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
    selectedItemsText: {
      type: String,
      required: true
    }
  },

  computed: {
    deselect () {
      return de.operations.deselect.all
    }
  }
}
</script>
