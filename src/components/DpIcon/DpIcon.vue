<template>
  <svg
    class="c-icon"
    :class="proportionClass"
    :height="pxSize"
    :width="pxSize"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg">
    <path :d="path" />
  </svg>
</template>

<script>
import { ICONS, SIZES } from './util/iconVariables'
import { hasOwnProp } from '~/utils'

export default {
  name: 'DpIcon',

  props: {
    icon: {
      type: String,
      required: true
    },

    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (prop) => Object.keys(SIZES).includes(prop)
    }
  },

  computed: {
    pxSize () {
      return SIZES[this.size]
    },

    path () {
      if (hasOwnProp(ICONS[this.icon], 'path') && !!ICONS[this.icon].path) {
        return ICONS[this.icon].path
      } else {
        console.warn(`DpIcon is called with an unsupported "icon" value.`)
        return ICONS.warning.path
      }
    },

    /**
     * To enable authors to adapt spacing to different icon proportions, a selector
     * is applied based on the width/height proportions of the path element.
     */
    proportionClass () {
      return ICONS[this.icon]?.proportions || 'square'
    }
  }
}
</script>
