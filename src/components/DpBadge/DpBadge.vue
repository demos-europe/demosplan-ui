<template>
  <span
    :class="`rounded ${colorClasses} ${sizeClasses} badge`"
    v-text="text" />
</template>

<script>
export default {
  name: 'DpBadge',

  props: {
    color: {
      type: String,
      required: false,
      default: 'default',
      validator: (prop) => ['confirm', 'default', 'error', 'info', 'warning'].includes(prop)
    },

    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (prop) => ['smaller', 'small', 'medium', 'large'].includes(prop)
    },

    text: {
      required: true,
      type: String
    }
  },

  computed: {
    colorClasses () {
      const cssClassMap = {
        default: 'color-text-default bg-color-light',
        confirm: 'color-message-success-text bg-color-message-success',
        info: 'color-message-info-text bg-color-message-info',
        warning: 'color-message-warning-text bg-color-message-warning',
        error: 'color-message-severe-text bg-color-message-severe'
      }

      return cssClassMap[this.color]
    },

    sizeClasses () {
      const cssClassMap = {
        smaller: 'font-size-small u-ph-0_25',
        small: 'font-size-small u-pv-0_125 u-ph-0_25',
        medium: 'font-size-medium u-pv-0_25 u-ph-0_5',
        large: 'font-size-large u-pv-0_5 u-ph-0_75'
      }

      return cssClassMap[this.size]
    }
  }
}
</script>
