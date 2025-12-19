<template>
  <vue-multiselect
    v-dp-validate-multiselect="required"
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
      openDirection,
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
    :aria-required="required"
    :class="{ 'is-required' : required }"
    :data-cy="dataCy"
    :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname"
    :internal-search="useDefaultSearch"
    :model-value="value"
    @close="newVal => $emit('close', newVal)"
    @update:model-value="newVal => $emit('input', newVal)"
    @open="newVal => $emit('open', newVal)"
    @remove="newVal => $emit('remove', newVal)"
    @search-change="newVal => $emit('search-change', newVal)"
    @select="newVal => $emit('select', newVal)"
    @tag="newVal => $emit('tag', newVal)"
  >
    <template v-slot:noOptions>
      <slot name="noOptions">
        {{ translations.noEntriesAvailable }}
      </slot>
    </template>

    <template v-slot:noResult>
      <slot name="noResult">
        {{ translations.autocompleteNoResults }}
      </slot>
    </template>

    <template
      v-for="slot in subSlots"
      v-slot:[slot]="props"
    >
      <slot
        :props="props"
        :name="slot"
      />
    </template>

    <!-- put more slots here -->

    <template
      v-if="selectionControls"
      v-slot:beforeList="props"
    >
      <slot
        name="beforeList"
        :props="props"
      >
        <div class="border-bottom">
          <button
            class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
            :disabled="value.length === options.length"
            type="button"
            @click="$emit('selectAll')"
            v-text="translations.selectAll"
          />

          <button
            class="btn--blank weight--bold u-ph-0_5 u-pv-0_25"
            :disabled="value.length === 0"
            type="button"
            @click="$emit('deselectAll')"
            v-text="translations.deselectAll"
          />
        </div>
      </slot>
    </template>
  </vue-multiselect>
</template>

<script>
import { de } from '~/components/shared/translations'
import { dpValidateMultiselectDirective } from '~/lib/validation'
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'DpMultiselect',

  components: {
    VueMultiselect,
  },

  directives: {
    dpValidateMultiselectDirective,
  },

  props: {
    /**
     * Allows the selected value to be cleared/deselected.
     * When set to false, at least one value must always be selected.
     * Note: When set to true and the value is cleared, the component's value becomes NULL,
     * which may affect computed properties or functions using the value.
     */
    allowEmpty: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * When set to false, the search query remains unchanged after selecting an option.
     * Useful for keeping the filter active while making multiple selections.
     */
    clearOnSelect: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * When set to false, the dropdown remains open after selecting an option.
     * Particularly useful when combined with multiple=true to select multiple options in succession.
     */
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * Function that customizes the display label for each option.
     * Must return a string. Useful for complex object options or custom formatting.
     * Example: option => `${option.id} - ${option.name}`
     */
    customLabel: {
      type: Function,
      required: false,
      default: undefined,
    },

    /**
     * Data attribute for Cypress testing.
     */
    dataCy: {
      type: String,
      required: false,
      default: 'multiselect',
    },

    /**
     * Custom field name for validation error messages.
     */
    dataDpValidateErrorFieldname: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Custom label shown when hovering over a selected option to deselect it.
     */
    deselectLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Custom label shown when hovering over a group label to deselect it.
     */
    deselectGroupLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Disables the component when set to true.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Property name for the option groups' label when using grouped options.
     * Used to locate the group label within a group object.
     */
    groupLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * When true, clicking a group label selects/deselects all options in that group.
     * When false, clicking a group label does nothing.
     */
    groupSelect: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Property name for the options list within a group when using grouped options.
     * Specifies which property contains the group's option list.
     */
    groupValues: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * HTML ID attribute for the multiselect.
     */
    id: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Property name to use as display text for object options.
     * For example, if options are objects with 'id' and 'name' properties,
     * setting label="name" will display the name property in the dropdown.
     */
    label: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Shows a loading spinner when set to true.
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Maximum height of the dropdown in pixels.
     */
    maxHeight: {
      type: Number,
      required: false,
      default: 300,
    },

    /**
     * Enables multiple selection mode when true.
     * When enabled, the selected value becomes an array.
     */
    multiple: {
      required: false,
      type: Boolean,
      default: false,
    },

    /**
     * HTML name attribute for the multiselect.
     */
    name: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Controls the direction in which the dropdown opens.
     * Possible values: '', 'top', 'bottom'
     */
    openDirection: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Array of options to display in the dropdown.
     * Can be an array of objects or simple values (strings, numbers).
     */
    options: {
      type: Array,
      required: true,
    },

    /**
     * Placeholder text shown when no option is selected.
     */
    placeholder: {
      type: String,
      required: false,
      default: de.choose,
    },

    /**
     * Makes the field required for validation.
     */
    required: {
      required: false,
      type: Boolean,
      default: false,
    },

    /**
     * Enables search/filtering functionality when true.
     */
    searchable: {
      required: false,
      type: Boolean,
      default: true,
    },

    /**
     * Shows "Select All" and "Deselect All" buttons in the dropdown.
     * When enabled, you should handle @selectAll and @deselectAll events.
     * Only meaningful when multiple=true.
     */
    selectionControls: {
      required: false,
      type: Boolean,
      default: false,
    },

    /**
     * Custom label shown when hovering over a group label to select it.
     */
    selectGroupLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Custom label shown when hovering over an option to select it.
     */
    selectLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Custom label shown next to selected options.
     */
    selectedLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Array of slot names to expose from vue-multiselect.
     * See https://vue-multiselect.js.org/#sub-slots for available slots.
     */
    subSlots: {
      type: Array,
      required: false,
      default: () => ['option', 'tag'],
    },

    /**
     * Placeholder displayed when creating new tags.
     */
    tagPlaceholder: {
      type: String,
      required: false,
      default: de.tag.create,
    },

    /**
     * Property name to use for tracking object options' identity.
     * Essential when options are objects to ensure correct selection tracking.
     * For example, if options are objects with an 'id' property,
     * setting trackBy="id" will track selections by their id.
     */
    trackBy: {
      type: [String, null],
      required: false,
      default: null,
    },

    /**
     * The selected value(s) of the component.
     * For single selection (multiple=false): string, number, or object.
     * For multiple selection (multiple=true): array.
     */
    value: {
      type: [String, Number, Array, Object],
      required: false,
      default: '',
    },

    useDefaultSearch:  {
      type: Boolean,
      required: false,
      default: true,
    }
  },

  emits: [
    'close',
    'input',
    'open',
    'remove',
    'search-change',
    'select',
    'selectAll',
    'tag',
    'deselectAll',
  ],

  data () {
    return {
      translations: {
        autocompleteNoResults: de.autocompleteNoResults,
        deselectAll: de.operations.deselect.all,
        noEntriesAvailable: de.noEntriesAvailable,
        selectAll: de.operations.select.all,
      },
    }
  },
}
</script>
