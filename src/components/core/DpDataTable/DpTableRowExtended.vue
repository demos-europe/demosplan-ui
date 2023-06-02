<template>
  <tr class="is-expanded-content">
    <td
      :class="`${ isLoading ? 'opacity-7' : '' }`"
      @mouseenter="addHoveredClass"
      @mouseleave="removeHoveredClass"
      :colspan="colGroupLength">
      <slot
        name="expandedContent"
        v-bind="item" />
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DpTableRowExtended',

  props: {
    isLoading: Boolean,
  },

  computed: {
    colGroupLength () {
      const colgroupElement = this.$refs.colgroupRef
      if (colgroupElement) {
        return colgroupElement.children.length
      }
      return null
    }
  },

  methods: {
    addHoveredClass(event) {
      event.target.previousElementSibling.classList.add('is-hovered-content');
    },
    removeHoveredClass(event) {
      event.target.previousElementSibling.classList.remove('is-hovered-content');
    }
  }
}
</script>
