<template>
  <div>
    <h4
      :class="prefixClass('u-mb-0_25')"
      data-cy="uploadFile:uploadedFiles">
      {{ translations.uploadedFiles }}
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
import { de } from "~/components/shared/translations"

export default {
  name: 'DpUploadedFileList',

  emits: ['file-remove'],

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
  },

  data () {
    return {
      translations: {
        uploadedFiles: de.upload.uploadedFiles,
      },
    }
  },
}
</script>
