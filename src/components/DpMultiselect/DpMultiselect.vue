<template>
  <div>
    <vue-multiselect
        :value="value"
        :options="options"
        :label="label"
        :multiple="multiple"
        :select-label="selectLabel"
        :select-group-label="selectGroupLabel"
        :selected-label="selectedLabel"
        :deselect-label="deselectLabel"
        :deselect-group-label="deselectGroupLabel"
        :tag-placeholder="Translator.trans('tag.create')"
        :track-by="trackBy"
        :placeholder="Translator.trans('choose')"
        v-dp-validate-multiselect="required"
        @input="newVal => $emit('input', newVal)"
        @select="newVal => $emit('select', newVal)">
      <template v-slot:noResult>
        {{ Translator.trans('autocomplete.noResults') }}
      </template>

      <template v-slot:noOptions>
        {{ Translator.trans('explanation.noentries') }}
      </template>

      <template v-slot:option="props">
        <slot name="options" />
      </template>

      <template v-slot:tag="props">
        <slot name="tag" />
      </template>

      <!-- put more slots here -->

      <template v-slot:beforeList="props">
        <div class="border-bottom">
          <button
              class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
              type="button"
              :disabled="value.length === options.length === 0"
              @click="$emit('select-all')">
          </button>

          <button
              class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
              type="button"
              :disabled="value.length === 0"
              @click="$emit('unselect-all')">
          </button>
        </div>
      </template>
    </vue-multiselect>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'DpMultiselect',

  components: {
    VueMultiselect
  },

  props: {
    deselectLabel: {
      type: String,
      required: false,
      default: ''
    },

    deselectGroupLabel: {
      type: String,
      required: false,
      default: ''
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    multiple: {
      required: false,
      type: Boolean,
      default: false
    },

    options: {
      type: Array,
      required: true
    },

    required: {
      required: false,
      type: Boolean,
      default: false
    },

    selectionControls: {
      required: false,
      type: Boolean,
      default: false
    },

    selectGroupLabel: {
      type: String,
      required: false,
      default: ''
    },

    selectLabel: {
      type: String,
      required: false,
      default: ''
    },

    selectedLabel: {
      type: String,
      required: false,
      default: ''
    },

    trackBy: {
      type: [String, null],
      required: false,
      default: null
    },

    value: {
      type: [String, Number],
      required: false,
      default: ''
    }
  }
}
</script>
