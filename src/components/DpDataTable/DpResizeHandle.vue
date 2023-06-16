<template>
  <div
    class="c-data-table__resize-handle"
    @mousedown.stop.prevent="(e) => $emit('mousedown', e)">
    <template v-if="displayIcon">
      <i
        class="fa fa-angle-left resize-handle__icon"
        aria-hidden="true" />
      <i
        class="fa fa-angle-right resize-handle__icon"
        aria-hidden="true" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ResizeHandle',

  props: {
    displayIcon: {
      required: false,
      type: Boolean,
      default: true
    }
  }
}
</script>
