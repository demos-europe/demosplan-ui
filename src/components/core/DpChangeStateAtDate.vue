<template>
  <div>
    <div class="layout u-mb-0_75">
      <dp-select
        v-model="actualStatus"
        class="layout__item u-4-of-12"
        :data-cy="label"
        :label="{
          text: Translator.trans(label)
        }"
        :name="regularDropdownId"

        :options="statusOptions" />
    </div>
    <div class="layout">
      <div class="layout__item u-5-of-12 u-12-of-12-lap-down u-mt-0_125">
        <span>
          <input
            :id="checkSwitchId"
            :name="checkSwitchId"
            value="1"
            type="checkbox"
            :checked="active"
            @click="toggleCheckbox">
          <label
            :for="checkSwitchId"
            class="o-form__label display--inline-block">
            {{ Translator.trans('change.state.at.date') }}
          </label>
        </span>
      </div><!--
   --><div
        v-if="active"
        class="u-mt-0_125">
        <div
          class="layout__item u-2-of-12 u-6-of-12-lap-down"
          :class="{ 'color--grey': active === false }">
          <dp-label
            required
            :text="Translator.trans('on')"
            :for="dateId" />
          <dp-datepicker
            class="o-form__control-wrapper"
            required
            :id="dateId"
            :name="dateId"
            :min-date="disabledDates.to"
            :disabled="active === false"
            v-model="changeDate"
            @change="dateChanged"
            :calendars-after="2" />
        </div><!--
     --><dp-select
          v-model="futureStatus"
          class="layout__item u-5-of-12 u-6-of-12-lap-down"
          :label="{
            text: Translator.trans('change.state.to')
          }"
          :name="delayedSwitchDropdownId"
          :options="statusOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { DpDatepicker, DpLabel, DpSelect } from '~~/components'
import { formatDate, toDate } from '@demos-europe/demosplan-utils'

export default {
  name: 'DpChangeStateAtDate',

  components: {
    DpDatepicker,
    DpLabel,
    DpSelect
  },

  props: {
    dateId: {
      required: true,
      type: String
    },

    delayedSwitchDropdownId: {
      required: true,
      type: String
    },

    checkSwitchId: {
      required: false,
      type: String,
      default: 'change_state_delay_toggle'
    },

    activeDelay: {
      required: false,
      type: Boolean,
      default: false
    },

    defaultNewState: {
      required: false,
      type: String,
      default: ''
    },

    defaultCurrentState: {
      required: false,
      type: String,
      default: ''
    },

    regularDropdownId: {
      required: true,
      type: String
    },

    label: {
      required: false,
      type: String,
      default: ''
    },

    initDate: {
      required: false,
      type: String,
      default: null
    },

    // Has to match a value from the statusOptions
    initStatus: {
      required: false,
      type: String,
      default: null
    },

    // Array of Objects with { value, label }
    statusOptions: {
      required: true,
      type: Array
    }
  },

  data () {
    return {
      active: this.activeDelay,
      changeDate: '',
      actualStatus: this.defaultCurrentState,
      futureStatus: this.defaultNewState,
      disabledDates: {
        to: formatDate(this.getTomorrowDate()) // Disable all dates in the past
      }
    }
  },

  computed: {
    initLabel () {
      const initLabel = this.statusOptions.find(el => el.value === this.initStatus).label
      return Translator.trans(initLabel)
    }
  },

  methods: {
    dateChanged () {
      this.$emit('date:changed', toDate(this.changeDate))
    },

    getTomorrowDate () {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      return tomorrow
    },

    statusChanged () {
      this.$emit('status:changed', this.newStatus)
    },

    toggleCheckbox () {
      this.active = this.active === false
    }
  },

  mounted () {
    if (this.initDate !== '' && this.initDate !== null) {
      this.changeDate = this.initDate
    } else {
      this.changeDate = formatDate()
    }
  }
}
</script>
