<template>
  <span
    :style="{height: height, width: width}"
    class="c-skeleton-box" />
</template>

<script>
export default {
  name: 'DpSkeletonBox',

  props: {
    height: {
      type: String,
      default: '1em'
    },

    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>
