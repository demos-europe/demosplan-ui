<template>
  <nav :class="prefixClass('c-multistep')">
    <button
      v-for="(step, idx) in steps"
      :key="`step_${idx}`"
      :data-cy="`${dataCy}:${idx}`"
      :disabled="idx > activeStep"
      class="btn--blank"
      :aria-label="step.title ? step.title : step.label"
      :class="[
        prefixClass('c-multistep__step'),
        idx === activeStep ? prefixClass('is-active') : '',
        idx > activeStep ? prefixClass('is-disabled') : ''
      ]"
      @click="changeStep(idx)">
      <span>
        <i
          v-if="step.icon"
          aria-hidden="true"
          :class="[prefixClass(step.icon), prefixClass('fa u-mr-0_25')]" />
        {{ step.label }}
      </span>
    </button>
  </nav>
</template>

<script>
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpMultistepNav',

  mixins: [prefixClassMixin],

  props: {
    activeStep: {
      type: Number,
      required: false,
      default: 0
    },

    dataCy: {
      type: String,
      required: false,
      default: 'multistepNav'
    },

    steps: {
      type: Array,
      required: true
    }
  },

  emits: ['change-step'],

  methods: {
    changeStep (val) {
      this.$emit('change-step', val)
    }
  }
}
</script>
