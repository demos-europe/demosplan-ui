<template>
  <label
    :class="classes"
    :for="labelFor">
    <span>
      <span v-cleanhtml="text" /><span v-if="required" aria-hidden="true">*</span>
      <dp-contextual-help
        v-if="tooltip"
        :class="prefixClass('ml-0.5')"
        :text="tooltip" />
    </span>
    <span
      v-if="hints.length"
      :class="prefixClass('block text-sm font-normal')">
      <span
        v-for="(hint, i) in hints"
        :key="i"
        :class="prefixClass('inline-block')"
        v-cleanhtml="hint" />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { CleanHtml as vCleanhtml } from '~/directives'
import { prefixClass } from '~/utils'
import DpContextualHelp from '~/components/DpContextualHelp'

const props = defineProps({
  bold: {
    type: Boolean,
    required: false,
    default: true
  },

  for: {
    type: String,
    required: true
  },

  // This is used to hide the label visually, but keep it accessible for screen readers
  hide: {
    type: Boolean,
    required: false,
    default: false
  },

  // Can be string or array (the second element being the "maxlength" hint).
  hint: {
    type: [String, Array] as PropType<string | string[]>,
    required: false,
    default: () => []
  },

  text: {
    type: String,
    required: true
  },

  tooltip: {
    type: String,
    required: false,
    default: ''
  },

  required: {
    type: Boolean,
    required: false,
    default: false
  }
})

const classes = computed(() : string[] => {
  let cssClasses: string[] = ['flex flex-col']

  if (props.hide) {
    cssClasses.push('sr-only')
  }

  if (props.bold) {
    cssClasses.push('font-semibold')
  }

  return cssClasses.map((selector) => prefixClass(selector))
})

const hints = computed(() : string[] => {
  if (props.hint) {
    return Array.isArray(props.hint) ? props.hint : [props.hint]
  }

  return []
})

const labelFor = computed(() : string => props.for)

</script>
