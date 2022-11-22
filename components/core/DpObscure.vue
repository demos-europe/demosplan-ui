<template>
  <span
    :class="obscureClass"
    :title="Translator.trans('obscure.title')">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'DpObscure',

  computed: {
    obscureClass () {
      return (hasPermission('feature_obscure_text')) ? 'u-obscure' : ''
    }
  }

}
</script>
