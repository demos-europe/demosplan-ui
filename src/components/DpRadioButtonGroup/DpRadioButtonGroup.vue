<template>
  <fieldset class="pb-0">
    <legend
      v-if="label !== ''"
      v-cleanhtml="label"
      class="font-size-medium is-label"
      :class="inline ? 'float-left' : 'u-mb-0_25'" />
    <dp-radio
      v-for="(option, idx) in options"
      :id="option.id"
      :key="`option_${idx}`"
      v-model="selected[option.id]"
      :class="inline ? 'inline-block u-ml' : ''"
      :data-cy="dataCy !== '' ? `${dataCy}:${option.id}` : null"
      :label="{
      text: option.label
      }"
      :name="name"
      @change="(val) => handleSelectionChange(option.id, val)"
    />
  </fieldset>
</template>

<script>
import { CleanHtml } from '~/directives'
import DpRadio from '~/components/DpRadio'

export default {
  name: "DpRadioButtonGroup",

  components: {
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
      selected: {}
    }
  },

  watch: {
    selectedOption () {
      this.selected = this.selectedOption
    }
  },

  methods: {
    setSelected () {
      this.options.forEach(option => {
        this.selected[option.id] = false
      })
    },

    handleSelectionChange (id, value) {
      Object.keys(this.selected).forEach(key => {
        this.selected[key] = false
      })
      this.selected[id] = value
      this.$emit('update', { ...this.selected })
    }
  },

  mounted () {
    this.setSelected()
  }
}

</script>

