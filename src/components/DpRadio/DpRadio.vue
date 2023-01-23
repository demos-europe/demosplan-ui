<template>
  <div :class="prefixClass('o-form__element--radio')">
    <input
      :id="id"
      :name="name !== '' ? name : false"
      :class="prefixClass('o-form__control-input')"
      type="radio"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :checked="checked"
      :value="value"
      :data-cy="dataCy !== '' ? dataCy : false"
      @change="$emit('change', $event.target.checked)"><!--
 --><dp-label
      v-if="label.text"
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
import DpLabel from '../DpLabel/DpLabel'
import { prefixClassMixin } from '@demos-europe/demosplan-utils'

export default {
  name: 'DpRadio',

  components: {
    DpLabel
  },

  mixins: [prefixClassMixin],

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    bold: {
      type: Boolean,
      required: false,
      default: true
    },

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

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    hint: {
      type: String,
      required: false,
      default: ''
    },

    id: {
      type: String,
      required: true
    },

    label: {
      type: Object,
      default: () => ({}),
      validator: (prop) => {
        return Object.keys(prop).every(key => ['bold', 'hint', 'text'].includes(key))
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

    value: {
      type: String,
      required: false,
      default: '1'
    }
  }
}
</script>
