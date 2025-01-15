<template>
  <div class="relative">
    <dp-input
      :id="id"
      :data-cy="dataCy"
      has-icon
      :required="required"
      v-bind="inputAttributes"
      @blur="$emit('blur', currentValue)"
      @input="$emit('input', currentValue)"
      @enter="$emit('enter', currentValue)"
      @focus="$emit('focus')"
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
    <!-- Slot for additional buttons -->
    <slot />
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

  props: {
    /**
     * By default, the normal variant is used. If set to 'small', a smaller variant is displayed
     */
    buttonVariant: {
      type: String,
      required: false,
      default: 'medium',
      validator: (prop) => ['small', 'medium'].includes(prop)
    },

    dataCy: {
      type: String,
      required: false,
      default: ''
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

    value: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  computed: {
    buttonClass () {
      let classes = this.buttonVariant === 'small' ? 'o-form__control-search-reset--small' : 'o-form__control-search-reset'
      classes = this.$slots.default ? `${classes} grouped` : classes

      return classes
    },

    iconSize () {
      return this.buttonVariant
    }
  },

  watch: {
    value: function () {
      this.currentValue = this.value
    }
  },

  methods: {
    resetValue () {
      this.$emit('reset')
    }
  }
}
</script>
