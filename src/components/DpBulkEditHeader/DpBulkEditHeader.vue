<template>
  <div class="flex items-center gap-2 p-2 bg-selected">
    <span>
      {{ selectedItemsText }}
    </span>
    <slot />
    <dp-button
      class="ml-auto"
      color="secondary"
      data-cy="resetSelection"
      :text="deselect"
      @click="$emit('reset-selection')"
    />
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpButton from '~/components/DpButton'

export default {
  name: 'DpBulkEditHeader',

  components: {
    DpButton,
  },

  props: {
    selectedItemsText: {
      type: String,
      required: true,
    },
  },

  emits: ['reset-selection'],

  data () {
    return {
      deselect: de.operations.deselect.all,
    }
  },
}
</script>
