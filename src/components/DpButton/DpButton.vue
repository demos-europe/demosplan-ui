<template>
  <component
    :is="element"
    :type="isButtonElement ? type : null"
    :href="!isButtonElement ? sanitizedHref : null"
    :class="classes"
    :aria-hidden="busy ? true : null"
    v-tooltip="iconOnly ? text : null"
    @click="emit('click', $event)">
    <dp-icon
      v-if="icon"
      aria-hidden="true"
      :icon="icon"
      :size="iconSize" />
    <span
      :class="{'sr-only': hideText}"
      v-text="text" />
    <dp-icon
      v-if="iconAfter"
      aria-hidden="true"
      :icon="iconAfter"
      :size="iconSize" />
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, PropType } from 'vue'
import { IconName, IconSize } from '../../../types'
import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { SIZES as ICON_SIZES } from '~/components/DpIcon/util/iconConfig'
import { Tooltip } from '~/directives'

type ButtonColor = 'primary' | 'secondary' | 'warning'
type ButtonType = 'button' | 'submit'
type ButtonVariant = 'solid' | 'outline' | 'subtle'

const props = defineProps({
  /**
   * While waiting for a network response, the visual state of the button can be changed via the `busy` property.
   */
  busy: {
    type: [Boolean, null],
    required: false,
    default: null
  },

  /**
   * The color of the button may be `primary`, `secondary`, or `warning`.
   */
  color: {
    type: String as PropType<ButtonColor>,
    required: false,
    default: 'primary',
    validator: (prop: ButtonColor) => ['primary', 'secondary', 'warning'].includes(prop)
  },

  /**
   * This may be set to true to render icon-only buttons.
   * The `text` prop will be visually hidden in this case, keeping the button accessible.
   */
  hideText: {
    type: Boolean,
    required: false,
    default: false
  },

  /**
   * When passing an href, a link is rendered instead of a button element.
   * The value of its `href` attribute is sanitized, defaulting to `'about:blank'` for unsafe values.
   */
  href: {
    type: String,
    required: false,
    default: '#'
  },

  /**
   * Icon that will be placed before button text.
   */
  icon: {
    type: String as PropType<IconName>,
    required: false,
    default: ''
  },

  /**
   * Define the size of the button icons.
   */
  iconSize: {
    type: String as PropType<IconSize>,
    required: false,
    default: 'small',
    validator: (prop: IconSize) => Object.keys(ICON_SIZES).includes(prop)
  },

  /**
   * Icon that will be placed after button text.
   */
  iconAfter: {
    type: String as PropType<IconName>,
    required: false,
    default: ''
  },

  /**
   * Renders the button with a pill-like appearance when set to true.
   */
  rounded: {
    type: Boolean,
    required: false,
    default: false
  },

  /**
   * Text content of the button element.
   */
  text: {
    type: String,
    required: false,
    default: 'save'
  },

  /**
   * The type attribute can be set to a value of `submit` manually, if the button is used to post a form.
   */
  type: {
    type: String as PropType<ButtonType>,
    required: false,
    default: 'button',
    validator: (prop: ButtonType): boolean  => ['button', 'submit'].includes(prop)
  },

  /**
   * The button may have a variant of `solid`, `outline`, or `subtle`.
   * When not specified, the `solid` variant (white on colored background) is applied.
   */
  variant: {
    type: String as PropType<ButtonVariant>,
    required: false,
    default: 'solid',
    validator: (prop: ButtonVariant) => ['solid', 'outline', 'subtle'].includes(prop)
  }
})

const emit = defineEmits(['click'])

const classes = computed(() => [
  'btn inline-flex items-center space-inline-xs',
  props.busy && 'is-busy pointer-events-none',
  iconOnly && `icon-only ${props.iconSize}`,
  props.rounded && 'rounded-full',
  ['primary', 'secondary', 'warning'].includes(props.color) && btnClasses.color[props.color],
  ['solid', 'outline', 'subtle'].includes(props.variant) && btnClasses.variant[props.variant]
])

const element = computed(() => isButtonElement ? 'button' : 'a')

const iconOnly = computed(() => (props.icon || props.iconAfter) && props.hideText)

const isButtonElement = computed(() => props.href === '#')

const sanitizedHref = computed(() => sanitizeUrl(props.href))

const vTooltip = Tooltip

onMounted(() => {
  if (!(props.icon || props.iconAfter) && props.hideText) {
    console.error(`A DpButton instance is used without icon or visible text. Consider showing something to users.`)
  }
})

const btnClasses = {
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
