<template>
  <span :class="`rounded-md ${colorClasses} ${sizeClasses} badge`">
    <dp-icon
      v-if="icon"
      aria-hidden="true"
      :icon="icon"
      :size="iconSize"
    />
    <span v-text="text" />
  </span>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { IconName, IconSize } from '../../../types'
import DpIcon from '~/components/DpIcon/DpIcon.vue'

type BadgeColor = 'confirm' | 'default' | 'error' | 'info' | 'warning'
type BadgeSize = 'smaller' | 'small' | 'medium' | 'large'

const props = defineProps({
  color: {
    type: String as PropType<BadgeColor>,
    required: false,
    default: 'default',
    validator: (prop: BadgeColor) => ['confirm', 'default', 'error', 'info', 'warning'].includes(prop),
  },

  /**
   * Optional icon rendered before the text, see DpIcon for available names.
   */
  icon: {
    type: String as PropType<IconName | ''>,
    required: false,
    default: '',
  },

  size: {
    type: String as PropType<BadgeSize>,
    required: false,
    default: 'medium',
    validator: (prop: BadgeSize) => ['smaller', 'small', 'medium', 'large'].includes(prop),
  },

  text: {
    required: true,
    type: String,
  },
})

const colorClasses = computed(() => {
  const cssClassMap: Record<BadgeColor, string> = {
    default: 'text-default bg-surface-medium',
    confirm: 'text-message-success bg-message-success',
    info: 'text-message-info bg-message-info',
    warning: 'text-message-warning bg-message-warning',
    error: 'text-message-severe bg-message-severe',
  }

  return cssClassMap[props.color]
})

const iconSize = computed<IconSize>(() => props.size === 'large' ? 'medium' : 'small')

const sizeClasses = computed(() => {
  const cssClassMap: Record<BadgeSize, string> = {
    smaller: 'text-xxs px-0.5',
    small: 'text-xs py-0.5 px-1.5',
    medium: 'text-sm py-1.5 px-2',
    large: 'text-base py-2 px-3',
  }

  // The icon needs flex alignment, text-only badges keep their inline flow
  const layout = props.icon ? 'inline-flex items-center gap-1' : ''

  return `${cssClassMap[props.size]} ${layout}`.trim()
})
</script>
