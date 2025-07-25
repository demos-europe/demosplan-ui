<template>
  <div :class="prefixClass('o-form__element--radio')">
    <input
      :id="id"
      :name="name !== '' ? name : null"
      :class="prefixClass('o-form__control-input')"
      type="radio"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :checked="checked"
      :value="value"
      :data-cy="dataCy !== '' ? dataCy : false"
      :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname || label.text || null"
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

<script lang="ts">
import DpLabel from '~/components/DpLabel'
import { prefixClassMixin } from '~/mixins'

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
      default: (): Record<string, any> => ({}),
      validator: (prop: Record<string, any>): boolean => {
        return Object.keys(prop).every((key: string) => ['bold', 'hint', 'text'].includes(key))
      }
    },

    name: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Input type="radio" does not support the readonly attribute. So this prop should possibly be removed.
     * See https://stackoverflow.com/questions/1953017/why-cant-radio-buttons-be-readonly
     */
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
