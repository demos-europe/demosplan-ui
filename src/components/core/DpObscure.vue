<template>
  <span
    class="u-obscure"
    :title="Translator.trans('obscure.title')">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'DpObscure'
}
</script>
