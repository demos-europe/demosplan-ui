<template>
  <button class="c-data-table__wrap-trigger o-link--default btn--blank">
    <dp-icon
      aria-hidden="true"
      :aria-label="ariaLabel"
      :icon="icon"
      size="small" />
  </button>
</template>

<script>
import DpIcon from '../../DpIcon/DpIcon'

export default {
  name: 'DpWrapTrigger',

  components: {
    DpIcon
  },

  props: {
    expanded: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    ariaLabel () {
      return Translator.trans(this.expanded ? 'aria.collapse' : 'aria.expand')
    },

    icon () {
      return this.expanded ? 'chevron-up' : 'chevron-down'
    }
  }
}
</script>
