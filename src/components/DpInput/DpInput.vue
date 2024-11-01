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
      :minlength="minlength !== '' ? minlength : null"
      :type="type"
      :pattern="pattern !== '' ? pattern : null"
      :placeholder="placeholder !== '' ? placeholder : null"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete !== '' ? autocomplete : null"
      :size="(size && size > 0) ? size : null"
      v-model="currentValue"
      @blur="$emit('blur', currentValue)"
      @focus="$emit('focus')"
      @input="$emit('input', currentValue)"
      @keydown.enter="handleEnter">
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { exactlengthHint, maxlengthHint, minlengthHint, prefixClass } from '~/utils'
import DpLabel from '~/components/DpLabel'

// Define an interface for the props
interface Props {
  ariaLabelledby: string | null
  autocomplete: string
  dataCounter: string
  dataCy: string
  dataDpValidateError: string
  dataDpValidateErrorFieldname: string
  dataDpValidateIf: string
  dataDpValidateShouldEqual: string
  disabled: boolean | null
  hasIcon: boolean
  id: string
  label: {
    bold: boolean
    hide: boolean
    hint: string
    text: string
    tooltip: string
  };
  maxlength: boolean | string | null
  minlength: boolean | string | null
  name: string
  pattern: string
  placeholder: string
  preventDefaultOnEnter: boolean
  readonly: boolean | null
  required: boolean | null
  size: number | null
  type: string
  value: string
  width: string
}

// Use the interface with defineProps
const props = defineProps<Props>();

const emit = defineEmits(['blur', 'enter', 'focus', 'input'])

const {
  ariaLabelledby = null,
  autocomplete = '',
  dataCounter = '',
  dataCy = '',
  dataDpValidateError = '',
  dataDpValidateErrorFieldname = '',
  dataDpValidateIf = '',
  dataDpValidateShouldEqual = '',
  disabled = null,
  hasIcon = false,
  id,
  name = '',
  pattern = '',
  placeholder = '',
  preventDefaultOnEnter = true,
  readonly = null,
  required = null,
  type = 'text',
} = props

const {
  label = {
    bold: true,
    hide: false,
    hint: '',
    text: '',
    tooltip: ''
  },
  maxlength = null,
  minlength = null,
  size = null,
  value = '',
  width = 'w-full'
} = toRefs(props)
const currentValue = ref(value.value)

const classes = computed(() => {
  let _classes: string[] = [
   `px-1 py-0.5 max-w-full rounded-input
    text-base leading-4 bg-surface
    outline outline-1 outline-offset-0 outline-transparent
    focus-visible:outline-interactive focus-visible:border-interactive focus-visible:z-above-zero
    required:shadow-none`
  ]

  if (!(size.value && size.value > 0)) {
    _classes.push('w-full')
  }

  if (readonly || disabled) {
    _classes.push('bg-surface-light border-none cursor-default')
  } else {
    _classes.push('text-input bg-surface border border-input cursor-text')
  }

  if (hasIcon) {
    _classes.push('pr-4')
  }

  return _classes.join(' ')
})

const containerClasses = computed(() => {
  let _classes: string[] = [labelHint.value.length ? 'space-y-1' : 'space-y-0.5']

  if (width.value !== 'auto' && size.value && size.value > 0) {
    _classes.push(width.value)
  }

  return _classes
})

const labelHint = computed(() => {
  const hint: string[] = typeof label.value.hint !== 'undefined' && label.value.hint !== '' ? [label.value.hint] : []

  if (maxlength.value && !minlength.value) {
    hint.push(maxlengthHint(currentValue.value.length, maxlength.value))
  } else if (minlength.value && !maxlength.value) {
    hint.push(minlengthHint(currentValue.value.length, minlength.value))
  } else if (maxlength.value && minlength.value) {
    if (maxlength.value === minlength.value) {
      hint.push(exactlengthHint(currentValue.value.length, maxlength.value))
    } else {
      hint.push(maxlengthHint(currentValue.value.length, maxlength.value))
      hint.push(minlengthHint(currentValue.value.length, minlength.value))
    }
  }

  return hint
})

watch(value, (newVal) => {
  currentValue.value = newVal
})

const handleEnter = (event: Event) => {
  if (preventDefaultOnEnter === true) {
    event.preventDefault()
  }
  emit('enter')
}
</script>
