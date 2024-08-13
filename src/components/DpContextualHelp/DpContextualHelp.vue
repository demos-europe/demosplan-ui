<template>
  <dp-icon
    :aria-label="ariaLabel"
    :icon="icon"
    :size="size"
    class="inline-block"
    v-tooltip="text" />
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
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
   */
  text: {
    type: String,
    required: true
  }
})

const ariaLabel = de.contextualHelp
</script>
