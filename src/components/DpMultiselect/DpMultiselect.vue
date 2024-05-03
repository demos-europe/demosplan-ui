<template>
  <div>
    <vue-multiselect
      v-bind="{
        allowEmpty,
        clearOnSelect,
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
        required,
        searchable,
        selectGroupLabel,
        selectLabel,
        selectedLabel,
        tagPlaceholder,
        trackBy,
        modelValue
      }"
      :data-cy="dataCy"
      :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname"
      :model-value="modelValue"
      v-dp-validate-multiselect="required"
      @close="newVal => $emit('close', newVal)"
      @update:model-value="newVal => $emit('update:model-value', newVal)"
      @open="newVal => $emit('open', newVal)"
      @remove="newVal => $emit('remove', newVal)"
      @search-change="newVal => $emit('search-change', newVal)"
      @select="newVal => $emit('select', newVal)"
      @tag="newVal => $emit('tag', newVal)">
      <template v-slot:noOptions>
        <slot name="noOptions">
          {{ Translator.trans('explanation.noentries') }}
        </slot>
      </template>

      <template v-slot:noResult>
        <slot name="noResult">
          {{ Translator.trans('autocomplete.noResults') }}
        </slot>
      </template>

      <template
        v-for="slot in subSlots"
        v-slot:[slot]="props">
        <slot
          :props="props"
          :name="slot" />
      </template>

      <!-- put more slots here -->

      <template
        v-if="selectionControls"
        v-slot:beforeList="props">
        <slot
          name="beforeList"
          :props="props">
          <div class="border-bottom">
            <button
                class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
                :disabled="modelValue.length === options.length === 0"
                type="button"
                v-text="translations.selectAll"
                @click="$emit('select-all')">
            </button>

            <button
                class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
                :disabled="modelValue.length === 0"
                type="button"
                v-text="translations.deselectAll"
                @click="$emit('unselect-all')">
            </button>
          </div>
        </slot>
      </template>
    </vue-multiselect>
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'
import { dpValidateMultiselectDirective } from '~/lib/validation'
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'DpMultiselect',

  components: {
    VueMultiselect
  },

  directives: {
    dpValidateMultiselectDirective
  },

  emits: [
    'close',
    'open',
    'remove',
    'search-change',
    'select',
    'select-all',
    'tag',
    'unselect-all',
    'update:model-value',
  ],

  props: {
    allowEmpty: {
      type: Boolean,
      required: false,
      default: true
    },

    clearOnSelect: {
      type: Boolean,
      required: false,
      default: true
    },

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

    dataDpValidateErrorFieldname: {
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
      default: de.choose
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

    /**
     * If necessary, slots can be added
     * according to this List
     * https://vue-multiselect.js.org/#sub-slots
     */
    subSlots: {
      type: Array,
      required: false,
      default: () => ['option', 'tag']
    },

    tagPlaceholder: {
      type: String,
      required: false,
      default: de.tag.create
    },

    trackBy: {
      type: [String, null],
      required: false,
      default: null
    },

    modelValue: {
      type: [String, Number, Array, Object],
      required: false,
      default: ''
    }
  },

  data () {
    return {
      translations: {
        deselectAll: de.operations.deselect.all,
        selectAll: de.operations.select.all
      }
    }
  }
}
</script>
