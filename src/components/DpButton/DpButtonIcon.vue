<template>
  <dp-icon
    v-if="icon"
    aria-hidden="true"
    :icon="icon"
    size="small" />
</template>

<script>
import DpIcon from '../DpIcon/DpIcon'

export default {
  name: 'DpButtonIcon',

  components: {
    DpIcon
  },

  props: {
    icon: {
      required: false,
      type: String,
      default: ''
    }
  }
}
</script>
