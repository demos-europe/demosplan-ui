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

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import DpLabel from '../DpLabel/DpLabel.vue'
import { prefixClassMixin } from '../../mixins'

export default defineComponent({
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
      type: Boolean as PropType<boolean>,
      required: false,
      default: true
    },

    checked: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },

    dataCy: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },

    hint: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },

    id: {
      type: String as PropType<string>,
      required: true
    },

    label: {
      type: Object as PropType<object>,
      default: (): Record<string, any> => ({}),
      validator: (prop: Record<string, any>): boolean => {
        return Object.keys(prop).every((key: string) => ['bold', 'hint', 'text'].includes(key))
      }
    },

    name: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },

    readonly: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },

    required: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },

    value: {
      type: String as PropType<string>,
      required: false,
      default: '1'
    }
  }
})
</script>
