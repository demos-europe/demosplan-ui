<template>
  <dp-icon
    :aria-label="ariaLabel"
    :icon="icon"
    :size="size"
    class="inline-block"
    v-tooltip="tooltip" />
</template>

<script setup lang="ts">
import { computed, onMounted, PropType } from 'vue'
import { IconName, IconSize } from '../../../types'
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon'
import { SIZES as ICON_SIZES } from '~/components/DpIcon/util/iconConfig'
import { Tooltip } from '~/directives'

const vTooltip = Tooltip

const props = defineProps({
  /**
   * The icon displayed as trigger for the tooltip.
   */
  icon: {
    type: String as PropType<IconName>,
    required: false,
    default: 'question'
  },

  /**
   * The icon size. May be small, medium, or large.
   */
  size: {
    type: String as PropType<IconSize>,
    required: false,
    default: 'medium',
    validator: (prop: IconSize) => Object.keys(ICON_SIZES).includes(prop)
  },

  /**
   * A string representing the actual tooltip content. May include html.
   * If you want to pass additional options, use the 'tooltipOptions' prop instead
   * ('tooltipOptions.content' for text)
   */
  text: {
    type: String,
    required: false,
    default: ''
  },
  /**
   * For available options check https://floating-vue.starpad.dev/api/#directive-options
   * When using, pass text via the 'content' property instead of using the 'text' prop above
   */
  tooltipOptions: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const ariaLabel = de.contextualHelp

/**
 * @return {string|object} Returns either text only or text and other options
 */
const tooltip = computed(() => {
  return Object.keys(props.tooltipOptions).length > 0
    ? props.tooltipOptions
    : props.text
})

onMounted(() => {
  if (!props.text && !props.tooltipOptions.content) {
    console.error('DpContextualHelp: No tooltip content provided. Add the "tooltipOptions.content" prop.')
  }
})
</script>
