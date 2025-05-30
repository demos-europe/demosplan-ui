<template>
  <div
    :class="[align, $attrs.class]"
    class="space-x-2">
    <dp-button
      v-if="primary"
      :busy="busy ? true : null"
      :data-cy="`${dataCy}:saveButton`"
      :disabled="isDisabledPrimary"
      :text="primaryText"
      :variant="variant"
      @click.prevent="$emit('primary-action')" />
    <dp-button
      v-if="secondary"
      color="secondary"
      :data-cy="`${dataCy}:abortButton`"
      :disabled="isDisabledSecondary"
      :href="href"
      :text="secondaryText"
      :variant="variant"
      @click.prevent="$emit('secondary-action')" />
    <slot />
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpButton from '~/components/DpButton'

export default {
  name: 'DpButtonRow',

  components: {
    DpButton
  },

  props: {
    /**
     * Specifies if the buttons should align left or right inside their container.
     */
    alignment: {
      type: String,
      required: false,
      default: 'right',
      validator: (prop) => ['right', 'left'].includes(prop)
    },

    /**
     * The primary button may have a "busy" state to indicate system progress.
     */
    busy: {
      type: [Boolean, null],
      required: false,
      default: null
    },

    dataCy: {
      type: String,
      required: false,
      default: 'buttonRow'
    },

    /**
     * The primary, secondary or both buttons may have a "disabled" state to prevent unwanted user interaction e.g if no data is changed yet.
     *
     * @type {Boolean|Object} - Can be a boolean to disable both buttons or an object to specify which button to disable.
     * @property {Boolean} [primary] - If true, disables the primary button.
     * @property {Boolean} [secondary] - If true, disables the secondary button.
     * @default false - By default, no buttons are disabled.
     */
    disabled: {
      type: [Boolean, Object],
      required: false,
      default: false
    },

    /**
     * The secondary button may be a link under the hood, e.g. for jumping back to another view.
     * The default value corresponds with the respective value in the `DpButton` component.
     */
    href: {
      type: String,
      required: false,
      default: '#'
    },

    /**
     * Display a primary button intended to save changes.
     */
    primary: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Custom text for the primary button.
     */
    primaryText: {
      type: String,
      required: false,
      default: de.operations.save
    },

    /**
     * Display a secondary button intended to cancel a process or reset input.
     */
    secondary: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Custom text for the secondary button.
     */
    secondaryText: {
      type: String,
      required: false,
      default: de.operations.abort
    },

    /**
     * The buttons may have a variant of `solid`, `outline`, or `subtle`.
     * When not specified, the `solid` variant (white on colored background) is applied.
     */
    variant: {
      required: false,
      type: String,
      default: 'solid',
      validator: (prop) => ['solid', 'outline', 'subtle'].includes(prop)
    }
  },

  emits: [
    'primary-action',
    'secondary-action'
  ],

  computed: {
    align () {
      return this.alignment === 'left' ? 'text-left' : 'text-right'
    },

    isDisabledPrimary () {
      return this.disabled === true || (this.disabled.primary || false)
    },

    isDisabledSecondary () {
      return this.disabled === true || (this.disabled.secondary || false)
    }
  }
}
</script>
