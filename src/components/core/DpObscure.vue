<template>
  <span
    class="u-obscure"
    :title="title">
    <slot />
  </span>
</template>

<script>
import { de } from '../shared/translations'

export default {
  name: 'DpObscure',

  computed: {
    title () {
      return de.obscure.title
    }
  }
}
</script>
