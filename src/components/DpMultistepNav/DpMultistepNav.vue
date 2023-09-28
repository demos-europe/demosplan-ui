<template>
  <nav :class="prefixClass('c-multistep')">
    <button
      v-for="(step, idx) in steps"
      :key="`step_${idx}`"
      :disabled="idx > activeStep"
      @click="changeStep(idx)"
      class="btn--blank"
      :aria-label="step.title ? Translator.trans(step.title) : Translator.trans(step.label)"
      :class="[
        prefixClass('c-multistep__step'),
        idx === activeStep ? prefixClass('is-active') : '',
        idx > activeStep ? prefixClass('is-disabled') : ''
      ]">
      <span>
        <i
          v-if="step.icon"
          aria-hidden="true"
          :class="[prefixClass(step.icon), prefixClass('fa u-mr-0_25')]" />
        {{ Translator.trans(step.label) }}
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

    steps: {
      type: Array,
      required: true
    }
  },

  methods: {
    changeStep (val) {
      this.$emit('change-step', val)
    }
  }
}
</script>
