<template>
  <dp-accordion
    ref="accordion"
    :title="title">
    <!-- this is where the form fields go -->
    <slot />

    <slot name="buttons">
      <dp-button-row
        primary
        secondary
        @primary-action="dpValidateAction(formId, save, false)"
        @secondary-action="abort" />
    </slot>
  </dp-accordion>
</template>

<script>
import DpAccordion from '../DpAccordion/DpAccordion'
import { dpValidateMixin } from '@demos-europe/demosplan-utils'

export default {
  name: 'DpToggleForm',

  components: {
    DpAccordion,
    DpButtonRow: () => import('../DpButtonRow/DpButtonRow')
  },

  mixins: [dpValidateMixin],

  props: {
    formId: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    }
  },

  methods: {
    abort () {
      if (this.formId !== '') {
        document.querySelector(`form#${this.formId}`).reset()
      } else {
        this.$emit('form-abort')
      }
      this.$refs.accordion.toggle()
    },

    save () {
      if (this.formId !== '') {
        document.querySelector(`form#${this.formId}`).submit()
      } else {
        this.$emit('form-save')
      }
    }
  }
}
</script>
