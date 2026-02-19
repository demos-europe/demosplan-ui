<template>
  <div :class="['relative', $attrs.class]">
    <dp-input
      v-bind="inputAttributes"
      :id="id"
      v-model="currentValue"
      :data-cy="dataCy"
      has-icon
      :number-of-icons="totalIcons"
      :required="required"
      :rounded="rounded"
      :pattern="pattern"
      @blur="$emit('blur', currentValue)"
      @enter="$emit('enter', currentValue)"
      @focus="$emit('focus')"
      @keydown="$emit('keydown', $event)"
      @update:model-value="handleUpdate"
    />
    <span
      v-if="hasSlotContent"
      class="absolute top-0 right-0 h-full flex items-center"
    >
      <button
        v-if="!inputAttributes.disabled"
        class="btn--blank o-link--default relative"
        data-cy="resetButton"
        :aria-label="translations.reset"
        :title="currentValue === defaultValue ? null : translations.reset"
        :disabled="currentValue === defaultValue"
        @click="resetValue"
      >
        <dp-icon
          aria-hidden="true"
          icon="xmark"
          :size="iconSize"
        />
      </button>
      <slot />
    </span>
    <button
      v-else-if="!inputAttributes.disabled"
      class="btn--blank o-link--default"
      :class="buttonClass"
      data-cy="resetButton"
      :aria-label="translations.reset"
      :title="currentValue === defaultValue ? null : translations.reset"
      :disabled="currentValue === defaultValue"
      @click="resetValue"
    >
      <dp-icon
        aria-hidden="true"
        icon="xmark"
        :size="iconSize"
      />
    </button>
  </div>
</template>

<script>
import { Comment, Fragment, Text } from 'vue'
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import DpInput from '~/components/DpInput'

export default {
  name: 'DpResettableInput',

  components: {
    DpIcon,
    DpInput,
  },

  inheritAttrs: false,

  props: {
    /**
     * By default, the normal variant is used. If set to 'small', a smaller variant is displayed
     */
    buttonVariant: {
      type: String,
      required: false,
      default: 'medium',
      validator: (prop) => ['small', 'medium'].includes(prop),
    },

    dataCy: {
      type: String,
      required: false,
      default: '',
    },

    defaultValue: {
      type: String,
      required: false,
      default: '',
    },

    id: {
      type: String,
      required: true,
    },

    inputAttributes: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    pattern: {
      type: String,
      required: false,
      default: '',
    },

    required: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * Prop to define the rounded corners of the input.
     *
     * @property {String} rounded - The rounded corners style.
     *                              Can be 'full', 'left', or 'right'.
     * @default 'full'
     * @validator Ensures the value is one of 'full', 'left', or 'right'.
     */
    rounded: {
      type: String,
      required: false,
      default: 'full',
      validator: (prop) => ['full', 'left', 'right'].includes(prop),
    },

    value: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: [
    'blur',
    'enter',
    'focus',
    'input',
    'keydown',
    'reset',
  ],

  data () {
    return {
      currentValue: this.value,
      translations: {
        reset: de.operations.reset,
      },
    }
  },

  computed: {
    buttonClass () {
      return this.buttonVariant === 'small' ? 'o-form__control-search-reset--small' : 'o-form__control-search-reset'
    },

    hasSlotContent () {
      return this.slotChildrenCount > 0
    },

    iconSize () {
      return this.buttonVariant
    },


    slotChildrenCount () {
      if (!this.$slots.default) return 0

      const nodes = this.$slots.default()

      // Flatten fragments and filter meaningful nodes
      const getMeaningfulNodes = (nodeList) => {
        const meaningful = []

        for (const node of nodeList) {
          // Skip comments
          if (node.type === Comment) continue

          // Skip empty text nodes
          if (node.type === Text) {
            if (node.children && node.children.trim()) {
              meaningful.push(node)
            }
            continue
          }

          // Unwrap fragments recursively
          if (node.type === Fragment) {
            meaningful.push(...getMeaningfulNodes(node.children || []))
            continue
          }

          meaningful.push(node)
        }

        return meaningful
      }

      return getMeaningfulNodes(nodes).length
    },

    totalIcons () {
      // Automatically count slot children + 1 (for the reset button itself)
      return this.slotChildrenCount + 1
    },
  },

  watch: {
    value: function () {
      this.currentValue = this.value
    },
  },

  methods: {
    handleUpdate (val) {
      this.currentValue = val
      this.$emit('input', val)
    },

    resetValue () {
      this.$emit('reset')
    },
  },
}
</script>
