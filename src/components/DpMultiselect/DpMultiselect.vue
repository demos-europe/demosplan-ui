<template>
  <div>
    <vue-multiselect
      :close-on-select="closeOnSelect"
      :custom-label="customLabel"
      :data-cy="dataCy"
      :deselect-group-label="deselectGroupLabel"
      :deselect-label="deselectLabel"
      :disabled="disabled"
      :group-label="groupLabel"
      :group-select="groupSelect"
      :group-values="groupValues"
      :id="id"
      :label="label"
      :loading="loading"
      :max-height="maxHeight"
      :multiple="multiple"
      :name="name"
      :options="options"
      :placeholder="placeholder"
      :searchable="searchable"
      :select-group-label="selectGroupLabel"
      :select-label="selectLabel"
      :selected-label="selectedLabel"
      :tag-placeholder="Translator.trans('tag.create')"
      :track-by="trackBy"
      :value="value"
      v-dp-validate-multiselect="required"
      @close="newVal => $emit('close', newVal)"
      @input="newVal => $emit('input', newVal)"
      @open="newVal => $emit('open', newVal)"
      @remove="newVal => $emit('remove', newVal)"
      @search-change="newVal => $emit('search-change', newVal)"
      @select="newVal => $emit('select', newVal)"
      @tag="newVal => $emit('tag', newVal)">
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
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: true
    },

    customLabel: {
      type: Function,
      required: false,
      default: () => {}
    },

    dataCy: {
      type: String,
      required: false,
      default: ''
    },

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

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    groupLabel: {
      type: String,
      required: false,
      default: ''
    },

    groupSelect: {
      type: Boolean,
      required: false,
      default: false
    },

    groupValues: {
      type: String,
      required: false,
      default: ''
    },

    id: {
      type: String,
      required: false,
      default: ''
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    },

    maxHeight: {
      type: Number,
      required: false,
      default: 300
    },

    multiple: {
      required: false,
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      required: false,
      default: ''
    },

    options: {
      type: Array,
      required: true
    },

    placeholder: {
      type: String,
      required: false,
      default: () => Translator.trans('choose')
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
