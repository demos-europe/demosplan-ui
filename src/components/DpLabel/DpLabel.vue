<template>
  <label
    :class="prefixClass(['o-form__label flex flex-col', bold ? 'weight--bold' : 'weight--normal',
    hints.length > 0 ? 'has-hint' : '', hide ? 'sr-only' : '', isDisabled ? 'cursor-default' : 'cursor-pointer'])"
    :for="labelFor">
    <span>
      <span v-cleanhtml="text" /><span v-if="required" aria-hidden="true">*</span>
      <dp-contextual-help
        v-if="tooltip"
        :class="prefixClass('ml-0.5')"
        :text="tooltip" />
    </span>
    <span
      v-if="hints.length"
      :class="prefixClass('block font-size-small weight--normal')">
      <span
        v-for="(hint, i) in hints"
        :key="i"
        :class="prefixClass(['inline-block'])"
        v-cleanhtml="hint" />
    </span>
  </label>
</template>

<script>
import { CleanHtml } from '~/directives'
import { prefixClassMixin } from '~/mixins'
import DpContextualHelp from '~/components/DpContextualHelp'

export default {
  name: 'DpLabel',
  components: { DpContextualHelp },

  directives: {
    cleanhtml: CleanHtml
  },

  mixins: [prefixClassMixin],

  props: {
    bold: {
      type: Boolean,
      required: false,
      default: true
    },

    for: {
      type: String,
      required: true
    },

    // This is used to hide the label visually, but keep it accessible for screen readers
    hide: {
      type: Boolean,
      required: false,
      default: false
    },

    // Can be string or array (the second element being the "maxlength" hint).
    hint: {
      type: [String, Array],
      required: false,
      default: () => []
    },

    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },

    text: {
      type: String,
      required: true
    },

    tooltip: {
      type: String,
      required: false,
      default: ''
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    /**
     * List of Hints
     *
     * @return Array{String}
     */
    hints () {
      if (this.hint) {
        return this.wrapItemIntoArray(this.hint)
      }
      return []
    },

    labelFor () {
      return this.for
    }
  },

  methods: {
    wrapItemIntoArray (item) {
      return Array.isArray(item) ? item : [item]
    }
  }
}
</script>
