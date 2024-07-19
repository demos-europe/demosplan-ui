<template>
  <dp-modal
    ref="uploadModal"
    content-classes="w-fit"
    data-cy="editor:uploadModal"
    @modal:toggled="(isOpen) => { if (!isOpen) reset() }">
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
      <div v-if="!editAltTextOnly">
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
      <div v-else>
        <img
          :alt="altText"
          class="mb-4"
          :src="this.imgSrc">
      </div>
      <dp-input
        id="altText"
        v-model="altText"
        class="u-mb"
        data-cy="uploadModal:altText"
        :label="{
          hint: translations.altTextHint,
          text: translations.altText,
        }" />
      <div class="u-mt text--right w-full space-inline-s">
        <button
          class="btn btn--primary"
          data-cy="uploadModal:save"
          type="button"
          @click="emitAndClose()"
          v-text="editAltTextOnly ? Translator.trans('save') : translations.insert">
        </button>
        <button
          class="btn btn--secondary"
          data-cy="uploadModal:abort"
          type="button"
          @click="closeAndReset()">
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
      imgSrc: '',
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
    closeAndReset () {
      this.reset()
      this.$emit('close')
      this.toggleModal()
    },

    emitAndClose () {
      if (this.editAltTextOnly) {
        this.$emit('add-alt', this.altText)
      } else if (this.fileUrl) {
        this.$emit('insert-image', this.fileUrl, this.altText)
      }

      this.closeAndReset()
    },

    reset () {
      this.altText = ''
      this.fileUrl = ''
      this.editAltTextOnly = false
    },

    setFile ({ hash }) {
      this.fileUrl = this.getFileByHash(hash)
      // Force-update the component so that DpModal updates and therefore check for new focusable elements
      this.$forceUpdate()
    },

    toggleModal (data) {
      if (data) {
        this.editAltTextOnly = data.editAltOnly
        this.altText = data.currentAlt
        this.imgSrc = data.imgSrc
      }

      this.$refs.uploadModal.toggle()
    }
  }
}
</script>
