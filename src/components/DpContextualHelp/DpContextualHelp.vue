<template>
  <i
    class="fa fa-question-circle"
    :aria-label="Translator.trans('contextual.help')"
    v-tooltip="text" />
</template>

<script>
import { Tooltip } from '@/directives'

const DpContextualHelp = {
  name: 'DpContextualHelp',

  props: {
    /**
     * A translation key representing the actual tooltip content.
     * May actually be any string including html.
     */
    text: {
      type: String,
      required: true
    }
  },

  directives: {
    tooltip: Tooltip
  }
}

export default DpContextualHelp

export {
  DpContextualHelp
}
</script>
