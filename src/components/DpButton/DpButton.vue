<template>
  <component
    :is="element"
    :type="isButtonElement ? type : null"
    :href="!isButtonElement ? sanitizedHref : null"
    :class="classes"
    :aria-hidden="busy ? true : null"
    v-tooltip="iconOnly ? text : null">
    <dp-icon
      v-if="icon"
      aria-hidden="true"
      :icon="icon"
      :size="iconSize" />
    <span
      :class="{'hide-visually': hideText}"
      v-text="text" />
    <dp-icon
      v-if="iconAfter"
      aria-hidden="true"
      :icon="iconAfter"
      :size="iconSize" />
  </component>
</template>

<script lang="ts">
import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { Tooltip } from '~/directives'
import { SIZES as ICON_SIZES } from '~/components/DpIcon/util/iconVariables'

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
      type: [Boolean, null],
      default: null
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
     * Define the size of the button icons.
     */
    iconSize: {
      required: false,
      type: String,
      default: 'small',
      validator: prop => Object.keys(ICON_SIZES).includes(prop)
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
     * Renders the button with a pill-like appearance when set to true.
     */
    rounded: {
      required: false,
      type: Boolean,
      default: false
    },

    /**
     * Text content of the button element.
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
      validator: (prop: string): boolean  => ['button', 'submit'].includes(prop)
    },

    /**
     * The button may have a variant of `solid`, `outline`, or `subtle`.
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
        'btn inline-flex items-center space-inline-xs',
        this.busy && 'is-busy pointer-events-none',
        this.iconOnly && 'icon-only',
        this.rounded && 'rounded-full',
        ['primary', 'secondary', 'warning'].includes(this.color) && classes.color[this.color],
        ['solid', 'outline', 'subtle'].includes(this.variant) && classes.variant[this.variant]
      ]
    },

    element () {
      return this.isButtonElement ? 'button' : 'a'
    },

    iconOnly () {
      return (this.icon || this.iconAfter) && this.hideText
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

const classes = {
  color: {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    warning: 'btn--warning'
  },
  variant: {
    solid: 'btn--solid',
    outline: 'btn--outline',
    subtle: 'btn--subtle'
  }
}
</script>
