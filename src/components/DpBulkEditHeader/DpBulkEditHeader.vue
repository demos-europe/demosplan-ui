<template>
  <div class="flex items-center justify-between p-2 bg-selected">
    <span>
      {{ selectedItemsText }}
    </span>
    <div class="flex gap-[16px]">
      <dp-button
        class="ml-auto"
        color="secondary"
        data-cy="resetSelection"
        :text="deselect"
        @click="$emit('reset-selection')"
      />
      <slot />
    </div>
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
