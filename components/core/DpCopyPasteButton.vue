<template>
  <a
    @click.stop.prevent="$emit('set-text', copyContent)"
    href="">
    <i
      aria-hidden="true"
      class="fa fa-files-o" />
    {{ Translator.trans(buttonLabel) }}
  </a>
</template>

<script>
export default {
  name: 'DpCopyPasteButton',

  props: {
    copyContent: {
      required: true,
      type: String
    },

    buttonLabel: {
      required: false,
      type: String,
      default: 'copy'
    }
  }
}
</script>
