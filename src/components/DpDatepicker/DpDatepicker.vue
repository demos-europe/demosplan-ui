<template>
  <div
    :id="id"
    :data-cy="dataCy"
    @input.stop.prevent="emitUpdate" />
</template>

<script>
// eslint-disable-next-line import/extensions
import Datepicker from 'a11y-datepicker/dist/index.es.min'

export default {
  name: 'DpDatepicker',

  compatConfig: {
    COMPONENT_V_MODEL: false
  },

  emits: ['update:model-value'],

  props: {
    calendarsAfter: {
      type: Number,
      required: false,
      default: 0
    },

    calendarsBefore: {
      type: Number,
      required: false,
      default: 0
    },

    dataCy: {
      type: String,
      required: false,
      default: 'datepicker'
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * The ID of the Datepicker component is derived from this prop.
     */
    id: {
      type: String,
      required: true
    },

    /**
     * Upper date limit.
     */
    maxDate: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Lower date limit.
     */
    minDate: {
      type: String,
      required: false,
      default: ''
    },

    name: {
      type: String,
      required: false,
      default: ''
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Expects ISO date
     */
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      datepicker: null,
      localConfig: {
        theme: 'light',
        locale: 'DE-de',
        dateFormat: 'dd.mm.yyyy',
        id: this.id,
        inputClass: 'o-form__control-input w-full'
      }
    }
  },

  watch: {
    modelValue () {
      if (this.modelValue !== null) {
        const isNotSet = document.getElementById(this.id).getElementsByTagName('input')[0].value !== this.modelValue
        this.datepicker && isNotSet && this.datepicker.setDate(this.modelValue, true)
      }
    },

    maxDate: function () {
      if (this.datepicker.getDate()) {
        const currentDate = this.datepicker.getDateAsString()
        this.datepicker = this.datepicker.updateDatepicker({ maxDate: this.maxDate })
        this.datepicker.setDate(currentDate, true)
      } else {
        this.datepicker = this.datepicker.updateDatepicker({ maxDate: this.maxDate })
      }
    },

    minDate: function () {
      if (this.datepicker.getDate()) {
        const currentDate = this.datepicker.getDateAsString()
        this.datepicker = this.datepicker.updateDatepicker({ minDate: this.minDate })
        this.datepicker.setDate(currentDate, true)
      } else {
        this.datepicker = this.datepicker.updateDatepicker({ minDate: this.minDate })
      }
    },

    required: function () {
      this.datepicker = this.datepicker.updateDatepicker({ required: this.required })
    },

    disabled: function () {
      this.datepicker = this.datepicker.updateDatepicker({ disabled: this.disabled })
    }
  },

  methods: {
    emitUpdate (e) {
      const currentVal = e.target.value
      const date = this.datepicker.getDateAsString()
      const valueToEmit = date === currentVal ? date : currentVal
      this.$emit('update:model-value', valueToEmit)
      this.$root.$emit('dp-datepicker', { id: this.id, value: valueToEmit })
    }
  },

  mounted () {
    const config = {
      ...this.calendarsAfter > 0 ? { monthsAfterCurrent: this.calendarsAfter } : {},
      ...this.calendarsBefore > 0 ? { monthsBeforeCurrent: this.calendarsBefore } : {},
      ...this.maxDate !== '' ? { maxDate: this.maxDate } : {},
      ...this.minDate !== '' ? { minDate: this.minDate } : {},
      ...this.name !== '' ? { inputName: this.name } : {},
      ...{ required: this.required },
      ...{ disabled: this.disabled },
      ...this.localConfig
    }
    this.datepicker = Datepicker(config)
    this.modelValue !== '' && this.datepicker.setDate(this.modelValue)
  }
}
</script>
