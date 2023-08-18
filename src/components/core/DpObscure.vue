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

  data () {
    return {
      title: de.obscure.title
    }
  }
}
</script>
