<template>
  <fieldset class="u-pb-0">
    <legend
      v-if="props.label !== ''"
      v-text="props.label"
      class="font-size-medium is-label"
      :class="inline ? 'float-left' : 'u-mb-0_25'" />
    <dp-radio
      v-for="(option, idx) in props.options"
      :id="option.id"
      :key="`option_${idx}`"
      :checked="selected === option.id"
      :class="inline ? 'inline-block u-ml' : ''"
      :data-cy="dataCy !== '' ? `${dataCy}:${option.id}` : null"
      :label="{ text: option.label }"
      :name="name"
      :value="option.id"
      @change="() => updateSelection(option)" />
  </fieldset>
</template>

<script setup>
import { ref, watch } from 'vue'
import DpRadio from '~/components/DpRadio'

const props = defineProps({
  dataCy: {
    type: String,
    required: false,
    default: ''
  },
  inline: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  selectedOption: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update'])

const selected = ref(props.selectedOption)

const updateSelection = (option) => {
  selected.value = option.id
  emit('update', option)
}

watch(() => props.selectedOption, (newVal) => {
  selected.value = newVal
})
</script>
