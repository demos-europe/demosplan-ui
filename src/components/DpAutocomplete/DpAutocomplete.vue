<template>
  <vue-omnibox
    :box-height="height"
    :disable-search="true"
    :label="label"
    :options="options"
    :placeholder="placeholder"
    :value="currentQuery"
    @input="emitAndFetch"
    @searched="emit($event, 'searched')"
    @selected="emit($event, 'selected')">
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      v-slot:[scopedSlotName]="slotData">
      <slot
        :name="scopedSlotName"
        v-bind="slotData" />
    </template>
  </vue-omnibox>
</template>

<script>
import { dpApi } from '../../lib'
import { prefixClassMixin } from '../../mixins'
import { de } from '../shared/translations'
import VueOmnibox from 'vue-omnibox'

export default {
  name: 'DpAutocomplete',

  components: {
    VueOmnibox
  },

  mixins: [prefixClassMixin],

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
      default: de.placeholder
    },

    routeGenerator: {
      type: Function,
      required: true
    },

    value: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      currentQuery: this.value,
      isLoading: false
    }
  },

  watch: {
    value () {
      if (this.currentQuery !== this.value) {
        this.currentQuery = this.value
      }
    }
  },

  methods: {
    emit (e, type) {
      this.$emit(type, e)
    },

    emitAndFetch (value) {
      this.emit(value, 'input')
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
