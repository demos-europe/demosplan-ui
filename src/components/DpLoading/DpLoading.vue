<template>
  <div
    class="c-loading"
    :class="{
      'c-loading--overlay': overlay,
      'flex items-center space-inline-xs': !overlay
    }"
    @click.prevent="">
    <div
      v-if="overlay"
      class="c-loading__inner flex items-center space-inline-xs">
      <span class="c-loading__spinner" />
      <span
        v-if="!hideLabel"
        class="c-loading__text"
        v-text="label" />
    </div>
    <template v-else>
      <span class="c-loading__spinner" />
      <span
        v-if="!hideLabel"
        class="c-loading__text"
        v-text="label" />
    </template>
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'

export default {
  name: 'DpLoading',

  props: {
    hideLabel: {
      required: false,
      type: Boolean,
      default: false
    },

    overlay: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      label: de.loadingData
    }
  }
}
</script>
