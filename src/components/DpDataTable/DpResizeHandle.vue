<template>
  <div
    class="c-data-table__resize-handle"
    @mousedown.stop.prevent="(e) => $emit('mousedown', e)"
  >
    <template v-if="displayIcon">
      <dp-icon
        class="text-interactive"
        icon="arrows-out-line-horizontal"
      />
    </template>
  </div>
</template>

<script>
import DpIcon from '~/components/DpIcon'

export default {
  name: 'ResizeHandle',

  components: {
    DpIcon,
  },

  props: {
    displayIcon: {
      required: false,
      type: Boolean,
      default: true,
    },
  },

  emits: [
    'mousedown',
  ],
}
</script>
