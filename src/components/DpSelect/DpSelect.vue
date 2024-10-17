<template>
  <div>
    <dp-label
      v-if="label.text"
      v-bind="{
        ...label,
        for: nameOrId,
        required: required
      }" /><!--
 --><select
      :id="nameOrId"
      :data-cy="dataCy"
      :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname || label.text || null"
      :required="required"
      :name="name !== '' ? name : false"
      class="o-form__control-select"
      :class="[disabled ? ' bg-color--grey-light-2' : '', classes]"
      :disabled="disabled"
      @change="update">
      <option
        v-if="showPlaceholder"
        data-id="placeholder"
        disabled
        value=""
        :selected="selected === ''">
        {{ selectPlaceholder }}
      </option>
      <option
        v-for="(option, idx) in options"
        :selected="option.value === selected"
        :value="option.value"
        :key="idx">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import DpLabel from '~/components/DpLabel'
import { de } from '~/components/shared/translations'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpSelect',

  components: {
    DpLabel
  },

  mixins: [prefixClassMixin],

  /*
   * Customize the v-model binding names
   * see https://learn.adamwathan.com/advanced-vue/customizing-controlled-component-bindings
   */
  model: {
    prop: 'selected',
    event: 'select'
  },

  props: {
    /**
     * @deprecated
     */
    classes: {
      type: [Array, String],
      required: false,
      default: ''
    },

    dataCy: {
      type: String,
      required: false,
      default: 'selectElement'
    },

    dataDpValidateErrorFieldname: {
      type: String,
      required: false,
      default: ''
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    id: {
      type: String,
      required: false,
      default: () => ''
    },

    label: {
      type: Object,
      required: false,
      default: () => ({}),
      validator: (prop) => {
        return Object.keys(prop).every(key => ['bold', 'hint', 'text', 'tooltip'].includes(key))
      }
    },

    name: {
      type: String,
      required: false,
      default: ''
    },

    // Need label and value
    options: {
      required: true,
      type: Array
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    showPlaceholder: {
      type: Boolean,
      required: false,
      default: true
    },

    selected: {
      type: [String, Number],
      required: false,
      default: ''
    }
  },

  data () {
    return {
      selectPlaceholder: de.operations.select.placeholder
    }
  },

  computed: {
    nameOrId () {
      /*
       * As long as there is no necessity of having the id to differ from name,
       * it should not be required to specify it.
       */
      return this.id === '' ? this.name : this.id
    }
  },

  methods: {
    update (event) {
      this.$emit('select', event.target.value)
    }
  }
}
</script>
