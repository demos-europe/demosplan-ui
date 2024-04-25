<template>
  <div class="relative">
    <dp-input
      v-bind="inputAttributes"
      :id="id"
      :data-cy="dataCy"
      has-icon
      :required="required"
      @blur="$emit('blur', currentValue)"
      @enter="$emit('enter', currentValue)"
      @focus="$emit('focus')"
      @update:model-value="$emit('update:modelValue', currentValue)"
      :pattern="pattern"
      v-model="currentValue" />
    <button
      v-if="!inputAttributes.disabled"
      class="btn--blank o-link--default"
      data-cy="resetButton"
      :class="buttonClass"
      :disabled="currentValue === defaultValue"
      @click="resetValue">
      <dp-icon
        icon="xmark"
        :size="iconSize" />
    </button>
  </div>
</template>

<script>
import DpIcon from '~/components/DpIcon'
import DpInput from '~/components/DpInput'

export default {
  name: 'DpResettableInput',

  components: {
    DpIcon,
    DpInput
  },

  compatConfig: {
    COMPONENT_V_MODEL: false
  },

  emits: ['update:model-value'],

  props: {
    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * By default, the normal variant is used. If set to 'small', a smaller variant is displayed
     */
    buttonVariant: {
      type: String,
      required: false,
      default: 'medium',
      validator: (prop) => ['small', 'medium'].includes(prop)
    },

    defaultValue: {
      type: String,
      required: false,
      default: ''
    },

    id: {
      type: String,
      required: true
    },

    inputAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },

    pattern: {
      type: String,
      required: false,
      default: ''
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
    buttonClass () {
      return this.buttonVariant === 'small' ? 'o-form__control-search-reset--small' : 'o-form__control-search-reset'
    },

    iconSize () {
      return this.buttonVariant
    }
  },

  watch: {
    modelValue () {
      this.currentValue = this.modelValue
    }
  },

  methods: {
    resetValue () {
      this.$emit('reset')
    }
  }
}
</script>
