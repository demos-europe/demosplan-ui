<template>
  <div>
    <dp-label
      v-if="label !== ''"
      :for="`datePicker:${id}`"
      :hint="hint"
      :required="required"
      :text="label" />
    <div class="o-form__control-wrapper o-form__group">
      <dp-datepicker
        :id="`datePicker:${id}`"
        v-model="date"
        class="o-form__group-item shrink"
        :data-cy="`${dataCy}:date`"
        :calendars-after="2"
        :disabled="disabled"
        :max-date="maxDate"
        :min-date="minDate"
        :required="required"
        @input="$emit('input', currentDatetime)" />
      <dp-time-picker
        :id="`timePicker:${id}`"
        v-model="time"
        class="o-form__group-item"
        :data-cy="`${dataCy}:time`"
        :disabled="disabled"
        :min-value="minTime"
        @input="$emit('input', currentDatetime)" />
      <input
        v-if="hiddenInput && name"
        type="hidden"
        :disabled="disabled"
        :name="name"
        :value="currentDatetime">
    </div>
  </div>
</template>

<script>
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import { defineAsyncComponent } from 'vue'
import DpDatepicker from '~/components/DpDatepicker'
import DpTimePicker from '~/components/DpTimePicker'

dayjs.extend(customParseFormat)

export default {
  name: 'DpDatetimePicker',

  components: {
    DpDatepicker,
    DpLabel: defineAsyncComponent(async () => {
      return await import('../DpLabel/DpLabel')
    }),
    DpTimePicker
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'dateTimePicker'
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Add a hidden input field to submit value of `currentDatetime`
     * if used in a form that actually gets submitted.
     */
    hiddenInput: {
      type: Boolean,
      required: false,
      default: false
    },

    hint: {
      type: String,
      required: false,
      default: ''
    },

    /*
     * The ids of date and time pickers are derived from this prop.
     */
    id: {
      type: String,
      required: true
    },

    /*
     * If set, a label is rendered above the datetime picker. However this is not exactly
     * best practice in terms of accessibility right now, since this label points to none
     * of the date or time inputs.
     */
    label: {
      type: String,
      required: false,
      default: ''
    },

    /*
     * Set a maxDate for the date field. Since this is passed to the datepicker component,
     * in contrast to the `value` field a string in the format of 'dd.mm.yyyy' is expected.
     */
    maxDate: {
      type: String,
      required: false,
      default: ''
    },

    /*
     * Set a minDate for the date field. Since this is passed to the datepicker component,
     * in contrast to the `value` field a string in the format of 'dd.mm.yyyy' is expected.
     */
    minDate: {
      type: String,
      required: false,
      default: ''
    },

    // Used in conjunction with `hiddenInput` to render a hidden input field with this name.
    name: {
      type: String,
      required: false,
      default: ''
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    // Expects ISO datetime
    value: {
      type: String,
      required: true
    }
  },

  emits: ['input'],

  data () {
    return {
      date: '',
      time: '00:00'
    }
  },

  computed: {
    currentDatetime () {
      const parsedDateTime = dayjs(`${this.date} ${this.time}`, 'DD.MM.YYYY HH:mm')
      return parsedDateTime.isValid() ? parsedDateTime.format() : ''
    },

    isCurrentDateSelected () {
      return this.minDate !== '' ? this.date === this.minDate : false
    },

    /**
     * Set minTime only if the current day is selected in the datepicker
     * @return {string|string}
     */
    minTime () {
      return this.isCurrentDateSelected ? new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : ''
    }
  },

  watch: {
    value: function (newVal) {
      this.setDatetime(newVal)
    }
  },

  methods: {
    setDatetime (datetime) {
      const parsedDateTime = dayjs(datetime)
      if (parsedDateTime.isValid()) {
        this.date = parsedDateTime.format('DD.MM.YYYY')
        this.time = parsedDateTime.format('HH:mm')
      }
    }
  },

  mounted () {
    this.setDatetime(this.value)
  }
}
</script>
