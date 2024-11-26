<template>
  <div :class="containerClasses">
    <dp-label
      v-if="label.text !== ''"
      v-bind="{
        ...label,
        for: id,
        hint: labelHint,
        required: required
      }"
      class="mb-0.5" />
    <input
      :id="id"
      :name="name !== '' ? name : null"
      :class="prefixClass(classes)"
      :data-counter="dataCounter !== '' ? dataCounter : null"
      :data-dp-validate-error="dataDpValidateError || null"
      :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname || label.text || null"
      :data-dp-validate-if="dataDpValidateIf !== '' ? dataDpValidateIf : null"
      :data-dp-validate-should-equal="dataDpValidateShouldEqual !== '' ? dataDpValidateShouldEqual : null"
      :data-cy="dataCy !== '' ? dataCy : null"
      :aria-labelledby="ariaLabelledby"
      :maxlength="maxlength !== '' ? maxlength : null"
      :type="type"
      :pattern="pattern !== '' ? pattern : null"
      :placeholder="placeholder !== '' ? placeholder : null"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete !== '' ? autocomplete : null"
      :size="(size && size > 0) ? size : null"
      v-model="props.value"
      @blur="$emit('blur', props.value)"
      @focus="$emit('focus')"
      @input="$emit('input', props.value)"
      @keydown.enter="handleEnter">
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { exactlengthHint, maxlengthHint, minlengthHint, prefixClass } from '~/utils'
import DpLabel from '~/components/DpLabel'

// Use the interface with defineProps
const props = defineProps({
  ariaLabelledby: {
    type: String,
    required: false,
    default: null
  },

  autocomplete: {
    type: String,
    required: false,
    default: ''
  },

  dataCounter: {
    type: String,
    required: false,
    default: ''
  },

  dataCy: {
    type: String,
    required: false,
    default: ''
  },

  dataDpValidateError: {
    type: String,
    required: false,
    default: ''
  },

  dataDpValidateErrorFieldname: {
    type: String,
    required: false,
    default: ''
  },

  dataDpValidateIf: {
    type: String,
    required: false,
    default: ''
  },

  dataDpValidateShouldEqual: {
    type: String,
    required: false,
    default: ''
  },

  disabled: {
    type: Boolean,
    required: false,
    default: null
  },

  hasIcon: {
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
    required: false,
    default: () => ({
      bold: true,
      hide: false,
      hint: '',
      text: '',
      tooltip: ''
    })
  },

  maxlength: {
    type: [Number, String],
    required: false,
    default: null
  },

  minlength: {
    type: [Number, String],
    required: false,
    default: null
  },

  name: {
    type: String,
    required: false,
    default: ''
  },

  pattern: {
    type: String,
    required: false,
    default: ''
  },

  placeholder: {
    type: String,
    required: false,
    default: ''
  },

  preventDefaultOnEnter: {
    type: Boolean,
    required: false,
    default: true
  },

  readonly: {
    type: Boolean,
    required: false,
    default: null
  },

  required: {
    type: Boolean,
    required: false,
    default: null
  },

  size: {
    type: Number,
    required: false,
    default: null
  },

  type: {
    type: String,
    required: false
  },

  value: {
    type: String,
    required: false
  },

  width: {
    type: String,
    required: false,
    default: 'w-full'
  }
})

const emit = defineEmits(['blur', 'enter', 'focus', 'input'])

const classes = computed(() => {
  let _classes: string[] = [
   `px-1 py-0.5 max-w-full rounded-input
    text-base leading-4 bg-surface
    outline outline-1 outline-offset-0 outline-transparent
    focus-visible:outline-interactive focus-visible:border-interactive focus-visible:z-above-zero
    required:shadow-none`
  ]

  if (!(props.size && props.size > 0)) {
    _classes.push('w-full')
  }

  if (props.readonly || props.disabled) {
    _classes.push('bg-surface-light border-none cursor-default')
  } else {
    _classes.push('text-input bg-surface border border-input cursor-text')
  }

  if (props.hasIcon) {
    _classes.push('pr-4')
  }

  return _classes.join(' ')
})

const containerClasses = computed(() => {
  let _classes: string[] = [labelHint.value.length ? 'space-y-1' : 'space-y-0.5']

  if (props.width !== 'auto' && props.size && props.size > 0) {
    _classes.push(props.width)
  }

  return _classes
})

const labelHint = computed(() => {
  const hint: string[] = props.label.hint ? [props.label.hint] : []

  if (props.maxlength && !props.minlength) {
    hint.push(maxlengthHint(props.value.length, props.maxlength))
  } else if (props.minlength && !props.maxlength) {
    hint.push(minlengthHint(props.value.length, props.minlength))
  } else if (props.maxlength && props.minlength) {
    if (props.maxlength === props.minlength) {
      hint.push(exactlengthHint(props.value.length, props.maxlength))
    } else {
      hint.push(maxlengthHint(props.value.length, props.maxlength))
      hint.push(minlengthHint(props.value.length, props.minlength))
    }
  }

  return hint
})

// watch(props.value, (newVal) => {
//   props.value = newVal
// })

const handleEnter = (event: Event) => {
  if (props.preventDefaultOnEnter) {
    event.preventDefault()
  }

  emit('enter')
}
</script>
