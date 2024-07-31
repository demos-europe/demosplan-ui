<template>
  <div :class="{ 'flex flex-col': growToParent }">
    <dp-label
      v-if="label !== ''"
      v-bind="labelProps" /><!--
 --><textarea
      v-bind="allowedAttributes"
      :name="name"
      :id="id"
      class="o-form__control-textarea"
      :class="{ 'grow': growToParent, 'h-7': reducedHeight }"
      :data-dp-validate-if="dataDpValidateIf ? true : null"
      :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname || label || null"
      :data-cy="dataCy"
      :disabled="disabled"
      :maxlength="maxlength"
      v-model="currentValue"
      @input="$emit('update:model-value', currentValue)"
      :required="required" />
  </div>
</template>

<script>
import { attributes, length } from '~/shared'
import { defineAsyncComponent } from 'vue'
import { maxlengthHint } from '~/utils'

export default {
  name: 'DpTextArea',

  components: {
    DpLabel: defineAsyncComponent(async () => {
      return await import('../DpLabel/DpLabel')
    })
  },

  compatConfig: {
    COMPONENT_V_MODEL: false
  },

  emits: ['update:model-value'],

  props: {
    attributes: attributes('textarea'),

    dataDpValidateErrorFieldname: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Use to conditionally validate a required textarea field.
     */
    dataDpValidateIf: {
      type: [Boolean, String],
      required: false,
      default: false
    },

    dataCy: {
      type: String,
      required: false,
      default: 'textAreaElement'
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * If enabled, classes are applied to let element grow to 100% height of its parent element.
     */
    growToParent: {
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
      required: false,
      default: ''
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    maxlength: length,

    name: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Display the form field with reduced height (60px).
     */
    reducedHeight: {
      type: Boolean,
      required: false,
      default: false
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      currentValue: this.modelValue
    }
  },

  computed: {
    allowedAttributes () {
      const attrs = {}
      this.attributes.forEach(attr => {
        attr = attr.split('=')
        attrs[attr[0]] = attr[1]
      })
      return attrs
    },

    labelProps () {
      return {
        for: this.id,
        hint: this.maxlength ? [this.hint, maxlengthHint(this.currentValue.length, this.maxlength)] : this.hint,
        required: this.required,
        text: this.label,
        tooltip: this.tooltip
      }
    }
  },

  watch: {
    modelValue () {
      this.currentValue = this.modelValue
    }
  }
}
</script>
