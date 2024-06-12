<template>
  <details
    class="o-details space-stack-xs"
    :data-cy="`${dataCy}:detailsWrapper`"
    role="group">
    <summary
      :aria-expanded="isOpen"
      class="o-details__trigger o-link--default cursor-pointer inline-block"
      :data-cy="`${dataCy}:detailsSummary`"
      role="button"
      @click="isOpen = !isOpen">
      <i
        class="fa w-2 text--center"
        :class="{'fa-caret-down': isOpen, 'fa-caret-right': !isOpen}"
        aria-hidden="true" />
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
    cleanhtml: CleanHtml
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'details'
    },

    /**
     * The short summary of the content, which is also used as a trigger.
     */
    summary: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      isOpen: false
    }
  }
}
</script>
