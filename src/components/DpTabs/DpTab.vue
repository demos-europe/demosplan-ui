<template>
  <section
    v-show="isActive"
    :id="id"
    role="tabpanel">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'DpTab',

  props: {
    id: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: false
    },

    /**
     * The label is passed to the DpTab child component, but then it is used
     * in the parent component DpTabs.
     */
    label: {
      type: String,
      required: true
    },

    /**
     * An html string may be passed here which is appended to the tab label.
     */
    suffix: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
