<template>
  <vue-omnibox
    :box-height="height"
    :disable-search="true"
    :label="label"
    :options="options"
    :placeholder="placeholder"
    :model-value="currentQuery"
    @searched="emit($event, 'searched')"
    @selected="emit($event, 'selected')"
    @update:model-value="emitAndFetch">
    <template
      v-for="(_, slotName) in $slots"
      v-slot:[slotName]="slotData">
      <slot
        v-bind="slotData"
        :name="slotName" />
    </template>
  </vue-omnibox>
</template>

<script>
import { dpApi } from '~/lib'
import { prefixClassMixin } from '~/mixins'
import { de } from '~/components/shared/translations'
import VueOmnibox from 'vue-omnibox'

export default {
  name: 'DpAutocomplete',

  components: {
    VueOmnibox
  },

  compatConfig: {
    COMPONENT_V_MODEL: false
  },

  mixins: [prefixClassMixin],

  emits: ['update:model-value'],

  props: {
    height: {
      type: String,
      required: false,
      default: '28px'
    },

    label: {
      type: String,
      required: false,
      default: 'label'
    },

    options: {
      type: Array,
      required: false,
      default: () => ([])
    },

    placeholder: {
      type: String,
      required: false,
      default: de.placeholderAutoSuggest
    },

    routeGenerator: {
      type: Function,
      required: true
    },

    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      currentQuery: this.modelValue,
      isLoading: false
    }
  },

  watch: {
    modelValue () {
      if (this.currentQuery !== this.modelValue) {
        this.currentQuery = this.modelValue
      }
    }
  },

  methods: {
    emit (e, type) {
      this.$emit(type, e)
    },

    emitAndFetch (value) {
      this.emit(value, 'update:modelValue')
      this.currentQuerry = value
      if (value.length >= 3) this.fetchOptions(value)
    },

    async fetchOptions (searchString) {
      this.isLoading = true
      try {
        const route = this.routeGenerator(searchString)
        const response = await dpApi.get(route)
        // Only emit results that match the current search -> prevents race conditions
        if (this.currentQuerry === searchString) this.$emit('search-changed', response)
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
