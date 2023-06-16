<template>
  <li>
    <span
      aria-hidden="true"
      v-if="file.mimeType === 'txt'">
      <i
        :class="fileIcon" />
    </span>
    <span v-if="isImage">
      <img
        :src="getFileByHash(file.hash)"
        :aria-label="Translator.trans('image.preview')"
        width="50px">
    </span>
    <span
      :class="prefixClass('inline-block u-pl-0_5')"
      style="width: calc(100% - 62px);">
      <span class="break-words">
        {{ file.name }}
      </span>
      ({{ fileSize }})
      <button
        type="button"
        :class="prefixClass('btn-icns u-m-0')"
        :aria-label="Translator.trans('file.remove')"
        @click="removeFile">
        <i
          :class="prefixClass('fa fa-trash')"
          aria-hidden="true" />
      </button>
    </span>
  </li>
</template>

<script>
import { convertSize } from '../../../lib'
import { prefixClassMixin } from '../../../mixins'

export default {
  name: 'DpUploadedFile',

  inject: ['getFileByHash'],

  mixins: [prefixClassMixin],

  props: {
    file: {
      type: Object,
      required: true
    }
  },

  computed: {
    fileIcon () {
      const icon = this.file.mimeType === 'txt' ? 'fa-file-text-o' : 'fa-folder-o'
      return this.prefixClass('fa ' + icon)
    },

    fileSize () {
      return convertSize('KB', this.file.size)
    },

    isImage () {
      const imageTypes = ['png', 'jpg', 'gif', 'bmp', 'ico', 'tiff', 'svg']
      return typeof imageTypes.find(type => type === this.file.mimeType) !== 'undefined'
    }
  },

  methods: {
    removeFile () {
      this.$emit('file-remove', this.file)
    }
  }
}
</script>
