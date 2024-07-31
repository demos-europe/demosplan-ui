<template>
  <div :class="containerWidth !== '' ? prefixClass(containerWidth) : null">
    <dp-label
      v-if="label.text !== ''"
      v-bind="{
        ...label,
        for: id,
        hint: labelHint,
        required: required
      }" />
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
import { length } from '~/shared'

const props = defineProps({
  /**
   * Reference another element on the page to define an accessible name if there is no label or
   * you want to override the label.
   */
  ariaLabelledby: {
    type: [String, null],
    required: false,
    default: null
  },

  /**
   * Tell the browser if autocomplete is allowed or not. If enabled the browser is allowed
   * to automatically complete the input. You can also provide a type of data which is expected.
   */
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

  /**
   * Use: when input field used with Icon || Button, then input field has padding right.
   */
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
    default: () => ({
      bold: true,
      hide: false,
      hint: '',
      text: '',
      tooltip: ''
    }),
    validator: (prop) => {
      return Object.keys(prop).every(key => ['bold', 'hide', 'hint', 'text', 'tooltip'].includes(key))
    }
  },

  /**
   * Limit the maximum allowed number of characters to the given amount.
   */
  maxlength: length,

  /**
   * Define the minimum number of characters that need to be given.
   */
  minlength: length,

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

  /**
   * Set to false to prevent default behavior onEnter.
   */
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

  /**
   * When setting a number for the `size` prop, this is directly rendered
   * as html attribute on the input element. Also, it is assumed that visual sizing
   * based on that value shall be applied, that is why both container classes
   * and element classes do not define any width styles when a size is set here.
   */
  size: {
    type: [Number, null],
    required: false,
    default: null
  },

  type: {
    type: String,
    required: false,
    default: 'text'
  },

  value: {
    type: String,
    required: false,
    default: ''
  },

  /**
   * Full width by default; set to 'auto' to have no width defined.
   * @deprecated Apply width to the parent element of DpInput.
   */
  width: {
    type: String,
    default: 'w-full'
  }
})

const emit = defineEmits(['blur', 'enter', 'focus', 'input'])

const { value, maxlength, minlength, width, size, label } = toRefs(props)
const currentValue = ref(value.value)

const classes = computed(() => {
  let cssClasses: string[] = [
    'px-1 py-0.5 max-w-full rounded-input',
    'text-base leading-4 bg-surface',
    'outline outline-1 outline-offset-0 outline-transparent',
    'focus-visible:outline-interactive focus-visible:border-interactive focus-visible:z-above-zero'
  ]

  if (!(size.value && size.value > 0)) {
    cssClasses.push('w-full')
  }

  if (props.readonly || props.disabled) {
    cssClasses.push('bg-surface-light border-none cursor-default')
  } else {
    cssClasses.push('text-input bg-surface border border-input cursor-text')
  }

  if (props.hasIcon) {
    cssClasses.push('pr-4')
  }

  // o-form__control-search is nowhere styled directly
  // cssClasses = props.type !== 'search' ? [...cssClasses, 'o-form__control-input'] : [...cssClasses, 'o-form__control-search']

  return cssClasses.join(' ')
})

const containerWidth = computed(() => (width.value === 'auto' || (size.value && size.value > 0)) ? '' : width.value)

const labelHint = computed(() => {
  const hint = typeof label.value.hint !== 'undefined' && label.value.hint !== '' ? [label.value.hint] : []

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
  if (props.preventDefaultOnEnter === true) {
    event.preventDefault()
  }
  emit('enter')
}
</script>
