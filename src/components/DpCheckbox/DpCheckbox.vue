<template>
  <div :class="prefixClass('o-form__element--checkbox')">
    <input
      :id="id"
      :name="name !== '' ? name : null"
      :class="prefixClass('o-form__control-input')"
      type="checkbox"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :checked="checked"
      :value="valueToSend"
      :data-cy="dataCy !== '' ? dataCy : null"
      :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname || label.text || null"
      true-value="1"
      false-value="0"
      @change="$emit('change', $event.target.checked)">
    <dp-label
      v-if="label.text !== ''"
      :class="prefixClass('o-form__label')"
      v-bind="{
        bold: false,
        text: '',
        for: id,
        required: required,
        ...label,
      }" />
  </div>
</template>

<script>
import DpLabel from '~/components/DpLabel'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpCheckbox',

  components: {
    DpLabel
  },

  mixins: [prefixClassMixin],

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false
    },

    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    dataDpValidateErrorFieldname: {
      type: String,
      required: false,
      default: ''
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    id: {
      type: String,
      required: true
    },

    label: {
      type: Object,
      default: () => ({}),
      validator: (prop) => {
        return Object.keys(prop).every(key => ['bold', 'hint', 'text', 'tooltip'].includes(key))
      }
    },

    name: {
      type: String,
      required: false,
      default: ''
    },

    readonly: {
      type: Boolean,
      required: false,
      default: false
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    valueToSend: {
      type: String,
      required: false,
      default: '1'
    }
  }
}
</script>
