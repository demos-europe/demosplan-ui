<template>
  <component
    :is="_icon"
    :class="proportionClass"
    :size="SIZES[size as IconSize]"
    :weight="weight" />
</template>

<script setup lang="ts">
import {
  computed,
  markRaw,
  PropType,
  toRefs,
  watchEffect
} from 'vue'

import {
  iconComponents,
  proportions,
  SIZES
} from './util/iconConfig'

import {
  IconName,
  IconSize,
  IconWeight
} from '../../../types'

import type { Component } from 'vue'

const props = defineProps({
  icon: {
    type: String as PropType<IconName>,
    required: true,
    validator: (prop: IconName) => Object.keys(iconComponents).includes(prop)
  },

  /**
   * Size of the icon
   * Small: 16
   * Medium: 20
   * Large: 24
   * Xlarge: 32
   */
  size: {
    type: String as PropType<IconSize>,
    required: false,
    default: 'medium',
    validator: (prop: IconSize) => Object.keys(SIZES).includes(prop)
  },

  weight: {
    type: String as PropType<IconWeight>,
    required: false,
    default: 'regular',
    validator: (prop: IconWeight) => ['light', 'regular', 'bold', 'fill'].includes(prop)
  }
})

/**
 * To enable authors to adapt spacing to different icon proportions, a selector
 * is applied based on the width/height proportions of the path element.
 */
const proportionClass = computed(() => {
  return proportions[props.icon] || 'square'
})

const { icon, size, weight } = toRefs(props)

let _icon: Component

/**
 * Icons may be reactive.
 * However, it seems like <component :is /> needs an extra invitation to be reactive.
 */
watchEffect(() => {
  const iconComponent = iconComponents[icon.value as IconName]

  if (iconComponent) {
    _icon = markRaw(iconComponent)
  }
})
</script>
