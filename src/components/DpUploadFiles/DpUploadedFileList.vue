<template>
  <div>
    <h4
      :class="prefixClass('u-mb-0_25')"
      data-cy="uploadFile:uploadedFiles">
      {{ Translator.trans('uploaded.files') }}
    </h4>
    <ul :class="prefixClass('o-list space-stack-xs')">
      <dp-uploaded-file
        v-for="(file, idx) in files"
        :file="file"
        @file-remove="file => $emit('file-remove', file)"
        :key="idx" />
    </ul>
  </div>
</template>

<script>
import DpUploadedFile from './DpUploadedFile'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpUploadedFileList',

  components: {
    DpUploadedFile
  },

  mixins: [prefixClassMixin],

  props: {
    files: {
      type: Array,
      required: false,
      default: () => ([])
    }
  }
}
</script>
