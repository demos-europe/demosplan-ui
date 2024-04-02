<template>
  <button
      class="c-data-table__wrap-trigger o-link--default btn--blank"
      :data-cy="dataCy !== '' ? dataCy : false">
    <dp-icon
      aria-hidden="true"
      :aria-label="ariaLabel"
      :icon="icon"
      size="small" />
  </button>
</template>

<script>
import DpIcon from '~/components/DpIcon'

export default {
  name: 'DpWrapTrigger',

  components: {
    DpIcon
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'wrapTriggerIcon'
    },

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
