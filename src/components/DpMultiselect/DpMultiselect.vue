<template>
  <div>
    <vue-multiselect
      v-bind="{
        closeOnSelect,
        customLabel,
        deselectGroupLabel,
        deselectLabel,
        disabled,
        groupLabel,
        groupSelect,
        groupValues,
        id,
        label,
        loading,
        maxHeight,
        multiple,
        name,
        options,
        placeholder,
        searchable,
        selectGroupLabel,
        selectLabel,
        selectedLabel,
        tagPlaceholder,
        trackBy,
        value
      }"
      :data-cy="dataCy"
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
import { dpValidateMultiselectDirective } from '../../lib/validation'
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'DpMultiselect',

  components: {
    VueMultiselect
  },

  directives: {
    dpValidateMultiselectDirective
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
      default: undefined
    },

    dataCy: {
      type: String,
      required: false,
      default: 'multiselect'
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

    tagPlaceholder: {
      type: String,
      required: false,
      default: () => Translator.trans('tag.create')
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
