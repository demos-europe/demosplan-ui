<template>
  <svg
    class="c-icon"
    :class="proportionClass"
    :height="pxSize"
    :width="pxSize"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg">
    <path
      ref="path"
      :d="path" />
  </svg>
</template>

<script>
import { ICONS, SIZES } from './util/iconVariables'

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

  data () {
    return {
      /**
       * To enable authors to adapt spacing to different icon proportions, a selector
       * is applied based on the width/height proportions of the path element.
       */
      proportionClass: '',
    }
  },

  computed: {
    pxSize () {
      return SIZES[this.size]
    },

    path () {
      return ICONS[this.icon].path
    }
  },

  mounted () {
    const w = this.$refs.path.getBoundingClientRect().width
    const h = this.$refs.path.getBoundingClientRect().height
    const aspectRatio = w / h;

    if (Math.abs(aspectRatio - 1) < 0.1) {
      this.proportionClass = 'square';
    } else if (aspectRatio > 1) {
      this.proportionClass = 'landscape';
    } else {
      this.proportionClass = 'portrait';
    }
  }
}
</script>
