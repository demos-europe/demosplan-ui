<template>
  <label
    :class="prefixClass(['o-form__label flex', bold ? 'weight--bold' : 'weight--normal', hints.length > 0 ? 'has-hint' : '', hide ? 'sr-only' : ''])"
    :for="labelFor">
    <span>
      <span v-cleanhtml="text" /><span v-if="required">*</span>
      <span
        v-if="hints.length > 0"
        :class="prefixClass('block font-size-small weight--normal')">
        <span
          :class="prefixClass(['inline-block'])"
          :key="i"
          v-for="(h, i) in hints"
          v-cleanhtml="h" />
      </span>
    </span>
    <dp-contextual-help
      v-if="tooltip !== ''"
      :class="prefixClass('mt-px ml-0.5')"
      :text="tooltip" />
  </label>
</template>

<script>
import { CleanHtml } from '~/directives'
import { de } from '~/components/shared/translations'
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
