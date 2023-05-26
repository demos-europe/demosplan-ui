<template>
  <component
    :is="element"
    :type="isButtonElement && type"
    :href="!isButtonElement && sanitizedHref"
    :class="classes"
    :aria-hidden="busy"
    v-on="$listeners">
    <span
      v-if="icon"
      class="btn__icon u-pr-0_25"
      v-tooltip="iconTooltip">
      <dp-icon
        :icon="icon"
        aria-hidden="true" />
    </span>
    <span
      class="btn__text"
      :class="{'hide-visually': hideText}"
      v-text="text" />
    <span
      v-if="iconAfter"
      class="btn__icon u-pl-0_25">
      <dp-icon
        :icon="iconAfter"
        aria-hidden="true" />
    </span>
  </component>
</template>

<script>
import DpIcon from '../DpIcon/DpIcon'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { Tooltip } from '../../directives'

export default {
  name: 'DpButton',

  components: {
    DpIcon
  },

  directives: {
    tooltip: Tooltip
  },

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
     * The color of the button may be `primary`, `secondary`, or `warning`.
     */
    color: {
      required: false,
      type: String,
      default: 'primary',
      validator: (prop) => ['primary', 'secondary', 'warning'].includes(prop)
    },

    /**
     * This may be set to true to render icon-only buttons.
     * The `text` prop will be visually hidden in this case, keeping the button accessible.
     */
    hideText: {
      required: false,
      type: Boolean,
      default: false
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
     * Icon that will be placed before button text.
     */
    icon: {
      required: false,
      type: String,
      default: ''
    },

    /**
     * Icon that will be placed after button text.
     */
    iconAfter: {
      required: false,
      type: String,
      default: ''
    },

    /**
     * Text content of the button element. Can be omitted if the text content is passed via the default slot.
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
     * The button may have a variant of `solid`, `outline`, and `subtle`.
     * When not specified, the `solid` variant (white on colored background) is applied.
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

    /*
     * Render a tooltip to show when hovering icon-only buttons.
     */
    iconTooltip () {
      if ((this.icon || this.iconAfter) && this.hideText) {
        return {
          content: this.text,
          delay: { show: 1000, hide: 200 }
        }
      } else {
        return null
      }
    },

    isButtonElement () {
      return this.href === '#'
    },

    sanitizedHref () {
      return sanitizeUrl(this.href)
    }
  },

  mounted () {
    if (!(this.icon || this.iconAfter) && this.hideText) {
      console.error(`A DpButton instance is used without icon or visible text. Consider showing something to users.`)
    }
  }
}
</script>
