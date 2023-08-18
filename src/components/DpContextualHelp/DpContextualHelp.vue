<template>
  <i
    class="fa fa-question-circle"
    :aria-label="ariaLabel"
    v-tooltip="text" />
</template>

<script>
import { de } from '../shared/translations'
import { Tooltip } from '../../directives'

export default {
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
  },

  data () {
    return {
      ariaLabel: de.contextualHelp
    }
  }
}
</script>
