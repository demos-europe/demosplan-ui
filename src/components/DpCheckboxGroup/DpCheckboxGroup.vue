<template>
  <fieldset class="u-pb-0">
    <legend
      v-if="label !== ''"
      v-cleanhtml="label"
      class="font-size-medium is-label"
      :class="inline ? 'float-left' : 'u-mb-0_25'" />
    <dp-checkbox
      v-for="(option, idx) in options"
      :id="option.id"
      :key="`option_${idx}`"
      v-model="selected[option.id]"
      :class="inline ? 'inline-block u-ml' : ''"
      :label="{
        text: option.label
      }"
      :name="option.name || ''"
      :data-cy="dataCy !== '' ? `${dataCy}:${option.id}` : null"
      @change="(val) => $emit('update', { ...selected, [option.id]: val })" />
  </fieldset>
</template>

<script>
import { CleanHtml } from '~/directives'
import DpCheckbox from '~/components/DpCheckbox'

export default {
  name: 'DpCheckboxGroup',

  components: {
    DpCheckbox
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

    selectedOptions: {
      type: Object,
      default: () => ({})
    }
  },

  emits: [
    'update'
  ],

  data () {
    return {
      selected: {}
    }
  },

  watch: {
      selectedOptions () {
      this.selected = this.selectedOptions
    }
  },

  methods: {
    setSelected () {
      this.options.forEach(option => {
        this.selected[option.id] = false
      })
    }
  },

  mounted () {
    this.setSelected()
  }
}
</script>
