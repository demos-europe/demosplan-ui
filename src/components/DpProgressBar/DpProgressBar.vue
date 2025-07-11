<template>
  <div class="c-progress-bar">
    <template v-if="indeterminate">
      <div class="mb-1 font-bold">
        {{ label }}
      </div>

      <div class="c-progress-bar__line is-animated" />
    </template>

    <template v-else>
      <div class="mb-1 font-bold">
        {{ label }}
      </div>

      <div class="bg-color--grey-light-2">
        <div
          :style="style"
          class="mb-1 c-progress-bar__line" />
      </div>
      <span v-if="showPercentage">
        {{ percentage }}%
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DpProgressBar',

  props: {
    showPercentage: {
      type: Boolean,
      required: false,
      default: false
    },

    indeterminate: {
      type: Boolean,
      required: false,
      default: false
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    percentage: {
      type: Number,
      required: false,
      default: 0
    }
  },

  computed: {
    style () {
      return 'width: ' + this.percentage + '%;'
    }
  }
}
</script>
