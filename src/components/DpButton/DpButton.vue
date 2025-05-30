<!--suppress GrazieInspection -->
<template>
  <component
    :is="element"
    v-tooltip="iconOnly ? text : null"
    :type="isButtonElement ? type : null"
    :href="!isButtonElement ? sanitizedHref : null"
    :class="classes"
    :disabled="disabled"
    :aria-hidden="busy"
    :aria-label="hideText ? text : null"
    @blur="emit('blur', $event)"
    @click="emit('click', $event)"
    @focus="emit('focus', $event)"
    @mousedown="emit('mousedown', $event)">
    <dp-icon
      v-if="icon"
      aria-hidden="true"
      :icon="icon"
      :size="iconSize" />
    <span
      v-if="!hideText"
      v-text="text" />
    <dp-icon
      v-if="iconAfter"
      aria-hidden="true"
      :icon="iconAfter"
      :size="iconSize" />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType } from 'vue'
import { proportions as ICON_PROPORTIONS, SIZES as ICON_SIZES } from '~/components/DpIcon/util/iconConfig'
import { IconName, IconSize } from '../../../types'
import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { sanitizeUrl } from '@braintree/sanitize-url'
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

  disabled: {
    type: [Boolean, null],
    required: false,
    default: null
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
   * When set to 'reset', the button will reset all the form fields in the form it is placed in. Use with caution,
   * since users tend to find this annoying.
   */
  type: {
    type: String as PropType<ButtonType>,
    required: false,
    default: 'button',
    validator: (prop: ButtonType): boolean  => ['button', 'reset', 'submit'].includes(prop)
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

const emit = defineEmits([
  'blur',
  'click',
  'focus',
  'mousedown'
])

const iconOnly = computed(() => (props.icon || props.iconAfter) && props.hideText)

const classes = computed(() => [
  'inline-flex items-center leading-3 text-button select-none focus:z-above-zero focus:relative hover:cursor-pointer',
  ...colorClasses.value,
  ...spacingClasses.value,
  props.busy && 'bg-busy animate-busy pointer-events-none',
  props.disabled && 'opacity-40 pointer-events-none',
  props.rounded ? 'rounded-full' : 'rounded-button'
])

const colorClasses = computed(() => {
  const colors = allColorClasses[props.color]
  const renderedColors = [colors.solidOutlineSubtle]

  switch (props.variant) {
  case 'solid':
    renderedColors.push(colors.solidOutline, colors.solid)
    break
  case 'outline':
    renderedColors.push(colors.solidOutline, colors.outlineSubtle)
    break
  case 'subtle':
    renderedColors.push(colors.outlineSubtle, colors.subtle)
    break
  default:
    break
  }

  return renderedColors
})

// Visually compensate button padding for icons with portrait proportions
const iconPortrait = computed(() => !props.hideText && ICON_PROPORTIONS[props.icon] === 'portrait')
const iconAfterPortrait = computed(() => !props.hideText && ICON_PROPORTIONS[props.iconAfter] === 'portrait')

const spacingClasses = computed(() => {
  // Default padding for text buttons, resulting in a 30px height that matches input fields.
  let padding = `${iconPortrait.value ? 'pl-1' : 'pl-2'} py-1 ${iconAfterPortrait.value ? 'pr-1' : 'pr-2'}`

  // The small and large iconOnly buttons create a scale alongside the medium iconOnly button which shares its 30px height with input fields.
  if (iconOnly.value) {
    switch (props.iconSize) {
    case 'large':
      padding = 'p-1.5'
      break
    case 'small':
      padding = 'p-0.5'
      break
    case 'medium':
      padding = 'p-[5px]'
      break
    default:
      break
    }
  }
  return [
    'space-x-1',
    padding
  ]
})

const element = computed(() => isButtonElement.value ? 'button' : 'a')
const isButtonElement = computed(() => props.href === '#')
const sanitizedHref = computed(() => sanitizeUrl(props.href))

const vTooltip = Tooltip

onMounted(() => {
  if (!(props.icon || props.iconAfter) && props.hideText) {
    console.error(`A DpButton instance is used without icon or visible text. Consider showing something to users.`)
  }
})

const allColorClasses = {
  primary: {
    /**
     * SolidOutlineSubtle: classes that apply to all button color variants.
     *
     * Instead of hardcoding #005eb1 here, focus-visible:outline-interactive-hover/50 could be used.
     * However, for this to work, token css variables would have to be rendered within @layer base with modern rbg
     * syntax, to be able to utilize the "<alpha-value>" placeholder to support opacity on css variables.
     * See
     * - https://tailwindcss.com/docs/customizing-colors#using-css-variables
     * - https://www.natestephens.dev/opacity-with-css-variable-color
     */
    solidOutlineSubtle: `
      outline-4 outline-offset-0 outline-transparent
      focus-visible:outline-[#005eb1]/50 focus-visible:z-above-zero`,
    /**
     * SolidOutline: classes that apply to "solid" and "outline" button color variants.
     *
     * Solid buttons have a 1px border with the same color as the bg color, to be the same overall size as outline buttons.
     * The same border is applied to outline buttons.
     */
    solidOutline: `
      border border-interactive\
      hover:border-interactive-hover\
      focus:border-interactive-hover\
      focus-visible:border-interactive-hover\
      active:border-interactive-active `,
    // OutlineSubtle: classes that apply to "outline" and "subtle" button color variants.
    outlineSubtle: `
      bg-surface text-interactive\
      hover:bg-interactive-subtle-hover hover:text-interactive-hover\
      focus:bg-interactive-subtle-hover focus:text-interactive-hover\
      focus-visible:bg-interactive-subtle-hover focus-visible:text-interactive-hover\
      active:bg-interactive-subtle-active active:text-interactive-active `,
    // Solid: classes that only apply to "solid" button color variant.
    solid: `
      bg-interactive text-on-dark\
      hover:text-on-dark hover:no-underline hover:bg-interactive-hover\
      focus:bg-interactive-hover\
      focus-visible:bg-interactive-hover\
      active:bg-interactive-active `,
    // Subtle: classes that only apply to "subtle" button color variant.
    subtle: `
      border border-on-dark\
      hover:border-interactive-subtle-hover\
      focus:border-interactive-subtle-hover\
      focus-visible:border-interactive-subtle-hover\
      active:border-interactive-subtle-active `
  },
  secondary: {
    solidOutlineSubtle: ' outline-4 outline-offset-0 outline-transparent focus-visible:outline-[#595959]/50 ',
    solidOutline: `
      border border-interactive-secondary\
      hover:border-interactive-secondary-hover\
      focus:border-interactive-secondary-hover\
      focus-visible:border-interactive-secondary-hover\
      active:border-interactive-secondary-active `,
    outlineSubtle: `
      bg-surface text-interactive-secondary\
      hover:bg-interactive-secondary-subtle-hover hover:text-interactive-secondary-hover\
      focus:bg-interactive-secondary-subtle-hover focus:text-interactive-secondary-hover\
      focus-visible:bg-interactive-secondary-subtle-hover focus-visible:text-interactive-secondary-hover\
      active:bg-interactive-secondary-subtle-active active:text-interactive-secondary-active `,
    solid: `
      bg-interactive-secondary text-on-dark\
      hover:text-on-dark hover:no-underline hover:bg-interactive-secondary-hover\
      focus:bg-interactive-secondary-hover\
      focus-visible:bg-interactive-secondary-hover\
      active:bg-interactive-secondary-active `,
    subtle: `
      border border-on-dark\
      hover:border-interactive-secondary-subtle-hover\
      focus:border-interactive-secondary-subtle-hover\
      focus-visible:border-interactive-secondary-subtle-hover\
      active:border-interactive-secondary-subtle-active `
  },
  warning: {
    solidOutlineSubtle: ' outline-4 outline-offset-0 outline-transparent focus-visible:outline-[#B20000]/50 ',
    solidOutline: `
      border border-interactive-warning\
      hover:border-interactive-warning-hover\
      focus:border-interactive-warning-hover\
      focus-visible:border-interactive-warning-hover\
      active:border-interactive-warning-active `,
    outlineSubtle: `
      bg-surface text-interactive-warning\
      hover:bg-interactive-warning-subtle-hover hover:text-interactive-warning-hover\
      focus:bg-interactive-warning-subtle-hover focus:text-interactive-warning-hover\
      focus-visible:bg-interactive-warning-subtle-hover focus-visible:text-interactive-warning-hover\
      active:bg-interactive-warning-subtle-active active:text-interactive-warning-active `,
    solid: `
      bg-interactive-warning text-on-dark\
      hover:text-on-dark hover:no-underline hover:bg-interactive-warning-hover\
      focus:bg-interactive-warning-hover\
      focus-visible:bg-interactive-warning-hover\
      active:bg-interactive-warning-active `,
    subtle: `
      border border-on-dark\
      hover:border-interactive-warning-subtle-hover\
      focus:border-interactive-warning-subtle-hover\
      focus-visible:border-interactive-warning-subtle-hover\
      active:border-interactive-warning-subtle-active `
  }
}
</script>
