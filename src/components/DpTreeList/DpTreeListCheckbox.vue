<template>
  <label class="u-mb-0">
    <input
      :id="name"
      class="u-m-0_5 u-ml-0_25"
      type="checkbox"
      :name="name"
      :checked="checked"
      :value="stringValue"
      @click="check">
    <span class="sr-only">{{ label }}</span>
  </label>
</template>

<script>
import { de } from '~/components/shared/translations'

export default {
  name: 'DpTreeListCheckbox',

  model: {
    prop: 'checked',
    event: 'check'
  },

  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false
    },

    checkAll: {
      type: Boolean,
      required: false,
      default: false
    },

    name: {
      type: String,
      required: true
    },

    // Some implementations may require to set a custom value, eg. when submitting DpTreeList as a whole form.
    stringValue: {
      type: String,
      required: false,
      default: 'on'
    }
  },

  computed: {
    label () {
      if (this.checkAll) {
        return this.toggleCheckedStatus(de.operations.deselect.all, de.aria.select.all)
      }

      return this.toggleCheckedStatus(de.aria.deselect.element, de.aria.select.element)
    }
  },

  methods: {
    check () {
      this.$emit('check', !this.checked)
    },

    toggleCheckedStatus (deselect, select) {
      return this.checked ? deselect : select
    }
  }
}
</script>
