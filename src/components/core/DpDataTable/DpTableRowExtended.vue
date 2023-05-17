<template>
  <tr v-if="expanded && $slots.expandedContent">
    <td
        :class="`${isLoading ? 'opacity-7' : ''} ${expanded ? 'is-expanded-content' : ''}`"
        @mouseenter="addHoveredClass"
        @mouseleave="removeHoveredClass"
        :colspan="rowContent.length"
    >
      {{ $slots.expandedContent }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DpTableRowExtended',

  props: {
    expanded: Boolean,
    isLoading: Boolean,
    rowContent: Array
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
