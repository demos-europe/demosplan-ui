<template>
  <details
    :data-cy="`${dataCy}:detailsWrapper`"
    class="o-details space-stack-xs"
  >
    <summary
      :aria-expanded="isOpen"
      :data-cy="`${dataCy}:detailsSummary`"
      class="o-details__trigger o-link--default cursor-pointer inline-block"
      role="button"
      tabindex="0"
      @click="handleSummaryClick"
      @keydown.enter="handleSummaryClick"
      @keydown.space.prevent="handleSummaryClick"
    >
      <i
        class="fa w-2 text--center"
        :class="{ 'fa-caret-down': isOpen, 'fa-caret-right': !isOpen }"
        aria-hidden="true"
      />
      <strong v-cleanhtml="summary" />
    </summary>
    <div :data-cy="`${dataCy}:detailsContent`">
      <slot />
    </div>
  </details>
</template>

<script>
import { CleanHtml } from '~/directives/CleanHtml/CleanHtml'

export default {
  name: 'DpDetails',

  directives: {
    cleanhtml: CleanHtml,
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'element',
    },

    /**
     * The short summary of the content, which is also used as a trigger.
     */
    summary: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: ['click'],

  data () {
    return {
      isOpen: false,
    }
  },

  methods: {
    handleSummaryClick () {
      this.isOpen = !this.isOpen
      this.$emit('click')
    },
  },
}
</script>
