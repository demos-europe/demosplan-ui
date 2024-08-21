<template>
  <fieldset :class="prefixClass('layout')">
    <legend
      class="sr-only"
      v-text="mergedTranslations.uploadFiles" />
    <dp-label
      v-if="label.text"
      class="layout__item"
      v-bind="{
        for: id,
        required: required,
        ...label
      }" />
    <dp-upload
      :allowed-file-types="allowedFileTypes"
      :allow-multiple-uploads="allowMultipleUploads"
      :basic-auth="basicAuth"
      :chunk-size="chunkSize"
      :class="[prefixClass('layout__item u-1-of-1-palm'), prefixClass(sideBySide ? 'u-1-of-2' : 'u-1-of-1')]"
      :data-cy="dataCy"
      :max-number-of-files="maxNumberOfFiles"
      :max-file-size="maxFileSize"
      :translations="mergedTranslations"
      :tus-endpoint="tusEndpoint"
      @upload-success="handleUpload" /><!--

 --><dp-uploaded-file-list
      v-if="uploadedFiles.length > 0"
      @file-remove="handleRemove"
      :class="[prefixClass('layout__item u-1-of-1-palm'), prefixClass(sideBySide ? 'u-1-of-2' : 'u-1-of-1 u-mt')]"
      :files="uploadedFiles" />

    <!--
      If the component is used in the context of a "traditional" form post, the hashes (ids)
      of the uploaded files must be included in that form post. Also, when requiring a file upload,
      the hidden input element is used by dpValidate to check for validation state.
     -->
    <input
      v-if="needsHiddenInput"
      type="hidden"
      :name="name !== 'uploadedFiles' ? `uploadedFiles[${name}]` : 'uploadedFiles'"
      :required="required"
      :data-dp-validate-if="dataDpValidateIf ? true : null"
      :value="fileHashes">
  </fieldset>
</template>

<script>
import { de } from '~/components/shared/translations'
import { prefixClassMixin, sessionStorageMixin } from '~/mixins'
import DpLabel from '../DpLabel/DpLabel'
import DpUpload from './DpUpload'
import DpUploadedFileList from './DpUploadedFileList'

export default {
  name: 'DpUploadFiles',

  components: {
    DpLabel,
    DpUpload,
    DpUploadedFileList
  },

  mixins: [prefixClassMixin, sessionStorageMixin],

  provide () {
    return {
      getFileByHash: this.getFileByHash
    }
  },

  props: {
    /**
     * Array of mimeTypes or a defined preset as String
     * @see ./src/lib/FileInfo.js
     */
    allowedFileTypes: {
      type: [Array, String],
      required: true,
      default: 'pdf'
    },

    /**
     * Allow users to upload more files after uploading some
     */
    allowMultipleUploads: {
      type: Boolean,
      default: false
    },

    basicAuth: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Define chunk size for huge files like PDFs
     */
    chunkSize: {
      type: Number,
      default: Infinity,
      required: false
    },

    dataCy: {
      type: String,
      required: false,
      default: 'uploadFile'
    },

    /**
     * Use to conditionally validate a required upload field
     * "required" and "needsHiddenInput" need to be set to true in that case
     */
    dataDpValidateIf: {
      type: [Boolean, String],
      required: false,
      default: false
    },

    /**
     * Use as routing function that receives a file hash as parameter and returns a route to that file.
     */
    getFileByHash: {
      type: Function,
      required: true
    },

    /**
     * The ID of the upload files component is derived from this prop.
     */
    id: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * The label is passed to the DpUploadFiles component.
     * This prop as Object, has 3 keys:
     * text: use as label text.
     * hint: use as description text.
     * tooltip: use as tooltip text.
     */
    label: {
      type: Object,
      default: () => ({}),
      validator: (prop) => {
        return Object.keys(prop).every(key => ['hint', 'text', 'tooltip'].includes(key))
      }
    },

    /**
     * Sets the maximally allowed file size for a single file in bytes.
     */
    maxFileSize: {
      type: Number,
      required: false,
      default: 10000000
    },

    /**
     * Maximum number of files that can be uploaded
     * Defaults to single file upload
     */
    maxNumberOfFiles: {
      type: Number,
      required: false,
      default: 1
    },

    /**
     * Used to set the name of the hidden input field if the backend needs a specific name.
     */
    name: {
      type: String,
      required: false,
      default: 'uploadedFiles'
    },

    /**
     * Adds a hidden input with fileHash(es) as its value to the DOM.
     * Must be set to true if the uploaded file(s) are intended to be saved via form post, or if the "required"
     * prop is set to true (because dpValidate uses the input field to check the validity).
     */
    needsHiddenInput: {
      type: Boolean,
      default: false
    },

    /**
     * If set to true, dpValidate checks if at least one file has been uploaded.
     * "needsHiddenInput" must also be true in that case.
     */
    required: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Use to overwrite the default translations
     * you can find all available keys here
     * @see https://github.com/transloadit/uppy/blob/master/packages/%40uppy/locales/src/de_DE.js
     * some are already overwritten here
     * @see ./src/components/DpUploadFiles/utils/UppyTranslations.js
     */
    translations: {
      type: Object,
      required: false,
      default: () => ({})
    },

    /**
     * If true the uploaded files list will be displayed next to the dropzone
     * if false it will be displayed below
     */
    sideBySide: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Set a storageName if you want the uploaded files to be stored
     * in the sessionStorage (i.e., be available across page reloads)
     */
    storageName: {
      type: String,
      required: false,
      default: ''
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
      fileHashes: [],
      defaultTranslations: {
        uploadFiles: de.upload.files,
      },
      mergedTranslations: {},
      uploadedFiles: []
    }
  },

  watch: {
    storageName () {
      this.updateSessionStorage(this.storageName, this.uploadedFiles)
    }
  },

  methods: {
    addFile (file) {
      // To only show as many files as allowed
      if (this.maxNumberOfFiles <= this.uploadedFiles.length) {
        this.fileHashes.shift()
        this.uploadedFiles.shift()
      }
      if (this.needsHiddenInput) {
        this.fileHashes.push(file.hash)
      }

      this.uploadedFiles.push(file)
      this.updateSessionStorage(this.storageName, this.uploadedFiles)
    },

    clearFilesList () {
      this.uploadedFiles.forEach(file => {
        this.removeFile(file)
      })
    },

    handleRemove (file) {
      this.removeFile(file)
      this.$emit('file-remove', file)
    },

    handleUpload (file) {
      this.addFile(file)
      this.$emit('upload-success', file)

      // Let plain javascript logic also use 'upload-success' event.
      document.dispatchEvent(new CustomEvent('uploadSuccess', { detail: { file: file, fieldName: this.name } }))
    },

    removeFile (file) {
      if (this.needsHiddenInput) {
        this.fileHashes = this.fileHashes.filter(hash => hash !== file.hash)
      }

      this.uploadedFiles = this.uploadedFiles.filter(el => el.hash !== file.hash)
      this.updateSessionStorage(this.storageName, this.uploadedFiles)
    }
  },

  created () {
    this.mergedTranslations = { ...this.defaultTranslations, ...this.translations }
  },

  mounted () {
    this.uploadedFiles = this.getItemFromSessionStorage(this.storageName) || []
  }
}
</script>
