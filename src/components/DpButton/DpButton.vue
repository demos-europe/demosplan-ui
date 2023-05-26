<template>
  <component
    :is="element"
    :type="isButtonElement && type"
    :href="!isButtonElement && sanitizedHref"
    :class="classes"
    :aria-hidden="busy"
    v-on="$listeners">
    <!-- @slot By default, the slot displays the button text. Use to render additional markup, e.g. an icon. -->
    <slot v-if="!!(this.$slots.default || [])[0]" />
    <span
        v-else
        v-text="text" />
  </component>
</template>

<script>
import { sanitizeUrl } from '@braintree/sanitize-url'

export default {
  name: 'DpButton',

  props: {
    /**
     * When waiting for an axios response, the visual state of the button can be changed via the `busy` property.
     */
    busy: {
      required: false,
      type: Boolean,
      default: false
    },

    /**
     * Define the color of the button. Possible values are `primary, secondary, warning`.
     */
    color: {
      required: false,
      type: String,
      default: 'primary',
      validator: (prop) => ['primary', 'secondary', 'warning'].includes(prop)
    },

    /**
     * When passing a href, a link is rendered instead of a button element.
     * The value of its `href` attribute is sanitized, defaulting to `'about:blank'` for unsafe values.
     */
    href: {
      required: false,
      type: String,
      default: '#'
    },

    /**
     * The text content of the button element. Can be omitted if the text content is passed via the default slot.
     */
    text: {
      required: false,
      type: String,
      default: 'save'
    },

    /**
     * The type attribute can be set to a value of `submit` manually, if the button is used to post a form.
     */
    type: {
      required: false,
      type: String,
      default: 'button',
      validator: (prop) => ['button', 'submit'].includes(prop)
    },

    /**
     * Variants of the button. Possible values are `solid`, `outline`, and `subtle`.
     * When not specified, the default style (white on colored background) is applied.
     */
    variant: {
      required: false,
      type: String,
      default: 'solid',
      validator: (prop) => ['solid', 'outline', 'subtle'].includes(prop)
    }
  },

  computed: {
    classes () {
      /*
       * @see
       * - https://vuejs.org/v2/guide/class-and-style.html#Array-Syntax
       * - https://stackoverflow.com/a/2933472
       */
      return [
        'btn',
        this.busy && 'is-busy pointer-events-none',
        ['primary', 'secondary', 'warning'].includes(this.color) && `btn--${this.color}`,
        ['solid', 'outline', 'subtle'].includes(this.variant) && `btn--${this.variant}`
      ]
    },

    element () {
      return this.isButtonElement ? 'button' : 'a'
    },

    isButtonElement () {
      return this.href === '#'
    },

    sanitizedHref () {
      return sanitizeUrl(this.href)
    }
  }
}
</script>
