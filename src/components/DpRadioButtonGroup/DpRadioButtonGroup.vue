<template>
  <fieldset class="u-pb-0">
    <legend
      v-if="label !== ''"
      v-cleanhtml="label"
      class="font-size-medium is-label"
      :class="inline ? 'float-left' : 'u-mb-0_25'" />
    <dp-radio
      v-for="(option, idx) in options"
      :id="option.id"
      :key="`option_${idx}`"
      v-model="selected"
      :class="inline ? 'inline-block u-ml' : ''"
      :label="{
        text: option.label
      }"
      :name="name"
      :value="option.id"
      :data-cy="dataCy !== '' ? `${dataCy}:${option.id}` : null"
      @change="(val) => $emit('update', val)" />
  </fieldset>
</template>

<script>
import { CleanHtml } from '~/directives'
import DpRadio from '~/components/DpRadio'
import DpCheckbox from '~/components/DpCheckbox'

export default defineComponent({
  name: "DpRadioButtonGroup",

  components: {
    DpCheckbox,
    DpRadio
  },

  directives: {
    cleanhtml: CleanHtml
  },

  emits: [
    'update'
  ],

  props: {
    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    options: {
      type: Array,
      required: true
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    inline: {
      type: Boolean,
      required: false,
      default: false
    },

    name: {
      type: String,
      required: true
    },

    selectedOption: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      selected: this.selectedOption
    }
  },

  watch: {
    selectedOption (newVal) {
      this.selected = newVal
    }
  }
})

</script>

