<template>
  <div>
    <vue-multiselect
      :deselect-group-label="deselectGroupLabel"
      :deselect-label="deselectLabel"
      :label="label"
      :multiple="multiple"
      :options="options"
      :placeholder="Translator.trans('choose')"
      :searchable="searchable"
      :select-group-label="selectGroupLabel"
      :select-label="selectLabel"
      :selected-label="selectedLabel"
      :tag-placeholder="Translator.trans('tag.create')"
      :track-by="trackBy"
      :value="value"
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
        <slot
          :props="props"
          name="option" />
      </template>

      <template v-slot:tag="props">
        <slot
          :props="props"
          name="tag" />
      </template>

      <!-- put more slots here -->

      <template
        v-if="selectionControls"
        v-slot:beforeList="props">
        <div class="border-bottom">
          <button
            class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
            :disabled="value.length === options.length === 0"
            type="button"
            v-text="Translator.trans('select.all')"
            @click="$emit('select-all')">
          </button>

          <button
            class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
            :disabled="value.length === 0"
            type="button"
            v-text="Translator.trans('unselect.all')"
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

    searchable: {
      required: false,
      type: Boolean,
      default: true
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
      type: [String, Number, Array, Object],
      required: false,
      default: ''
    }
  }
}
</script>
