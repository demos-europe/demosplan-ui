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

<script lang="ts">
import { CleanHtml, Tooltip } from '~directives'
import { de } from '../shared/translations'
import { prefixClassMixin } from '~mixins'
import Vue from 'vue'

export default Vue.extend({
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

  computed: {
    ariaLabel () {
      return de.contextualHelp
    },
    /**
     * List of Hints
     *
     * @return Array{String}
     */
    hints () {
      if (this.hint) {
        return  Array.isArray(this.hint) ? this.hint : [this.hint]
      }
      return []
    },

    labelFor () {
      return this.for
    }
  }
})
</script>
