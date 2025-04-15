<template>
  <fieldset class="u-pb-0">
    <legend
      v-if="label !== ''"
      v-cleanhtml="label"
      class="font-size-medium is-label"
      :class="inline ? 'float-left' : 'u-mb-0_25'" />
    <div v-for="(group, groupIdx) in groups" :key="`group_${groupIdx}`" class="u-mb-1">
      <p class="font-size-medium u-mb-0_5">{{ group.label }}</p>
      <dp-radio
        v-for="(option, idx) in group.options"
        :id="option.id"
        :key="`option_${groupIdx}_${idx}`"
        v-model="selected[group.name]"
        :class="inline ? 'inline-block u-ml' : ''"
        :label="{
          text: option.label
        }"
        :name="group.name"
        :value="option.id"
        :data-cy="dataCy !== '' ? `${dataCy}:${group.name}:${option.id}` : null"
        @change="emitUpdate(group.name, option.id)" />
    </div>
  </fieldset>
</template>

<script>
import { CleanHtml } from '~/directives'
import DpRadio from '~/components/DpRadio'

export default {
  name: 'DpRadioGroup',

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

    groups: {
      type: Array,
      required: true,
      validator: (groups) => {
        return groups.every(group =>
          group.name && group.label && Array.isArray(group.options)
        )
      }
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
      selected: { ...this.selectedOptions }
    }
  },

  methods: {
    emitUpdate (group, value) {
      this.$emit("update", { group, value });
    }
  },

  watch: {
    selectedOptions (newVal) {
      this.selected = { ...newVal }
    }
  }
}
</script>
