<template>
  <div class="flex items-center flex-wrap gap-y-4 py-2 px-3 rounded-md border-l-4 border-interactive bg-surface-light">
    <span>
      {{ selectedItemsText }}
    </span>
    <div class="flex items-center gap-[16px] ml-auto whitespace-nowrap">
      <slot name="buttonRowStart" />
      <dp-button
        :text="deselect"
        variant="outline"
        color="secondary"
        data-cy="resetSelection"
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
