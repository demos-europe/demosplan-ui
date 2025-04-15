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
      :checked="selected === option.id"
      :class="inline ? 'inline-block u-ml' : ''"
      :data-cy="dataCy !== '' ? `${dataCy}:${option.id}` : null"
      :label="{
          text: option.label
        }"
      :name="name"
      :value="option.id"
      @change="() => updateSelection(option)" />
  </fieldset>
</template>

<script>
import { CleanHtml } from '~/directives'
import DpRadio from '~/components/DpRadio'

export default {
  name: 'DpRadioButtonGroup',

  components: {
    DpRadio
  },

  directives: {
    cleanhtml: CleanHtml
  },

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
      default: false
    },

    selectedOption: {
      type: String,
      default: null
    },

    name: {
      type: String,
      required: true
    }
  },

  emits: [
    'update'
  ],

  data () {
    return {
      selected: this.selectedOption
    }
  },

  watch: {
    selectedOption (newVal) {
      this.selected = newVal
    }
  },

  methods: {
    updateSelection (option) {
      this.selected = option.id
      this.$emit('update', option)
    }
  }
}
</script>
