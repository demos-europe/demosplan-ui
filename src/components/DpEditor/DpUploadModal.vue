<template>
  <dp-modal
    ref="uploadModal"
    content-classes="u-2-of-3-lap-up u-1-of-2-desk-up">
    <template>
      <h3
        v-if="editAltTextOnly"
        class="u-mb">
        {{ translations.editImage }}
      </h3>
      <h3
        v-else
        class="u-mb">
        {{ translations.insertImage }}
      </h3>
      <div v-show="editAltTextOnly === false">
        <dp-upload-files
          allowed-file-types="img"
          :basic-auth="basicAuth"
          id="imageFile"
          :get-file-by-hash="getFileByHash"
          :max-file-size="20 * 1024 * 1024/* 20 MiB */"
          :max-number-of-files="1"
          ref="uploader"
          :translations="{ dropHereOr: translations.uploadImage('20MB')}"
          :tus-endpoint="tusEndpoint"
          @upload-success="setFile" />
      </div>
      <dp-input
        id="altText"
        v-model="altText"
        class="u-mb"
        :label="{
          hint: translations.altTextHint,
          text: translations.altText,
        }" />
      <div class="u-mt text--right w-full space-inline-s">
        <button
          class="btn btn--primary"
          type="button"
          @click="emitAndClose()">
          {{ translations.insert }}
        </button>
        <button
          class="btn btn--secondary"
          type="button"
          @click="resetAndClose()">
          {{ translations.abort }}
        </button>
      </div>
    </template>
  </dp-modal>
</template>

<script>
import { de } from '../shared/translations'
import DpInput from '~/components/DpInput'
import DpModal from '~/components/DpModal'
import DpUploadFiles from '~/components/DpUploadFiles'

export default {
  name: 'DpUploadModal',

  components: {
    DpInput,
    DpModal,
    DpUploadFiles
  },

  props: {
    /**
     * The Tus endpoint requires basicAuth to be added to the file header.
     */
    basicAuth: {
      type: String,
      required: false,
      default: ''
    },

    getFileByHash: {
      type: Function,
      required: true
    },

    /**
     * Global path for file uploader endpoint.
     */
    tusEndpoint: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      fileUrl: '',
      altText: '',
      editAltTextOnly: false,
      translations: {
        altText: de.altText.default,
        altTextHint: de.image.alt.explanation,
        abort: de.operations.abort,
        editImage: de.image.edit,
        insert: de.operations.insert,
        insertImage: de.image.insert,
        uploadImage: de.upload.select.image
      }
    }
  },

  methods: {
    emitAndClose () {
      if (this.editAltTextOnly) {
        this.$emit('add-alt', this.altText)
      } else if (this.fileUrl) {
        this.$emit('insert-image', this.fileUrl, this.altText)
      }
      this.resetAndClose()
    },

    resetAndClose () {
      this.altText = ''
      this.fileUrl = ''
      this.editAltTextOnly = false
      this.$emit('close')
      this.toggleModal()
    },

    setFile ({ hash }) {
      this.fileUrl = this.getFileByHash(hash)
      // Force-update the component so that DpModal updates and therefore check for new focusable elements
      this.$forceUpdate()
    },

    toggleModal (data) {
      const willCloseModal = this.$refs.uploadModal.isOpenModal === true

      if (willCloseModal) {
        this.$refs.uploader.clearFilesList()
      } else if (data) {
        this.editAltTextOnly = data.editAltOnly
        this.altText = data.currentAlt
      }

      this.$refs.uploadModal.toggle()
    }
  }
}
</script>
