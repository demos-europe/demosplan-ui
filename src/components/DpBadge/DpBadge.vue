<template>
  <span
    :class="`rounded-md ${colorClasses} ${sizeClasses} badge`"
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
        default: 'text-default bg-surface-medium',
        confirm: 'text-message-success bg-message-success',
        info: 'text-message-info bg-message-info',
        warning: 'text-message-warning bg-message-warning',
        error: 'text-message-severe bg-message-severe'
      }

      return cssClassMap[this.color]
    },

    sizeClasses () {
      const cssClassMap = {
        smaller: 'text-xxs px-0.5',
        small: 'text-xs py-0.5 px-1.5',
        medium: 'text-sm py-1.5 px-2',
        large: 'text-base py-2 px-3'
      }

      return cssClassMap[this.size]
    }
  }
}
</script>
