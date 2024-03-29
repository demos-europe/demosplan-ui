<template>
  <label
    :class="prefixClass(['o-form__label flex', bold ? 'weight--bold' : 'weight--normal', hints.length > 0 ? 'has-hint' : ''])"
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
    <i
      v-if="tooltip !== ''"
      :class="prefixClass('fa fa-question-circle u-mt-0_125 ml-auto')"
      :aria-label="ariaLabel"
      v-tooltip="tooltip" />
  </label>
</template>

<script>
import { CleanHtml, Tooltip } from '~/directives'
import { de } from '~/components/shared/translations'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpLabel',

  directives: {
    cleanhtml: CleanHtml,
    tooltip: Tooltip
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

  data () {
    return {
      ariaLabel: de.contextualHelp
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
