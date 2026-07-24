<template>
  <uppy-context-provider
    v-if="uppy"
    :uppy="uppy"
  >
    <dp-upload-area
      :browse-label="uppyTranslations.strings.browse"
      :data-cy="dataCy"
      :drop-label="uppyTranslations.strings.dropHereOr"
    />
  </uppy-context-provider>
</template>

<script>
import { de } from './utils/UppyTranslations'
import DpUploadArea from './DpUploadArea'
import { getFileTypes } from '../../lib'
import { hasOwnProp } from '../../utils'
import { markRaw } from 'vue'
import Tus from '@uppy/tus'
import Uppy from '@uppy/core'
import { UppyContextProvider } from '@uppy/vue'

/*
 * Guarantees a unique uppy instance id per component instance. Without it every
 * uploader has the same id, and if several uploaders coexist in one view, `document.getElementById`
 * always returns the first input, so clicking any dropzone opens the wrong file picker
 */
let uppyInstanceCount = 0

export default {
  name: 'DpUpload',

  components: {
    DpUploadArea,
    UppyContextProvider,
  },

  props: {
    /**
     * Array of mimeTypes or a defined preset as String
     * @see  '@DemosPlanCoreBundle/lib/FileInfo'
     */
    allowedFileTypes: {
      type: [Array, String],
      required: false,
      default: 'pdf',
    },

    /**
     * Warning message that will be rendered if files are added that are not allowed in `allowedFileTypes`.
     */
    allowedFileTypesWarning: {
      type: String,
      default: de().strings.warningFileType,
    },

    /**
     * Allow users to upload more files after uploading some
     */
    allowMultipleUploads: {
      type: Boolean,
      default: false,
    },

    basicAuth: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Define chunk size for huge files like PDFs.
     * Important: Only change the default value if you are very sure about the consequences.
     * It is recommended to change the value via setting the chunkSize prop instead of adjusting
     * the default here, which basically allows the upload chunks to be as big as possible.
     */
    chunkSize: {
      type: Number,
      default: Infinity,
      required: false,
    },

    dataCy: {
      type: String,
      required: false,
      default: 'upload',
    },

    /**
     * Maximum file size in bytes for each individual file.
     */
    maxFileSize: {
      type: Number,
      default: 10000000,
    },

    /**
     * Maximum number of files that can be uploaded.
     * By default, it's allowed to upload a single file.
     */
    maxNumberOfFiles: {
      type: Number,
      required: false,
      default: 1,
    },

    translations: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    /**
     * Global path for file uploader endpoint.
     */
    tusEndpoint: {
      type: String,
      required: true,
    },
  },

  emits: [
    'file-added',
    'file-error',
    'upload',
    'uploads-completed',
    'upload-success',
  ],

  data () {
    return {
      currentFileHash: '',
      currentFileId: '',
      uppy: null,
      uppyTranslations: {
        strings: {
          ...de().strings, ...this.translations,
        },
      },
    }
  },

  computed: {
    allowedFileTypeArray () {
      return getFileTypes(this.allowedFileTypes)
    },
  },

  methods: {
    /**
     * Fires immediately before a file is added to the Uppy store.
     *
     * The hook is used here to clean file names from characters that would
     * break the tus endpoint. This could as well be implemented within the backend.
     *
     * @param currentFile
     * @return {(*&{meta: (*&{name: *}), name: *})|*}
     * @see https://uppy.io/docs/uppy/#onbeforefileaddedcurrentfile-files
     */
    handleOnBeforeFileAdded (currentFile) {
      let fileName = currentFile.name

      /*
       * This is not an exhaustive list - the characters have been determined
       * simply by trying out which break or do not break the tus endpoint.
       */
      const reservedCharacters = [
        '?',
        '#',
        '&',
        '\'',
        '"',
        '/',
        ':',
        '\\',
      ]

      for (let i = 0; i < reservedCharacters.length; i++) {
        if (fileName.includes(reservedCharacters[i])) {
          fileName = fileName.replace(reservedCharacters[i], '_')
        }
      }

      if (fileName === currentFile.name) {
        return currentFile
      } else {
        return {
          ...currentFile,
          name: fileName,
          meta: {
            ...currentFile.meta,
            name: fileName,
          },
        }
      }
    },

    /**
     * Create and configure the uppy instance (core restrictions + tus transport).
     * The drag & drop UI and the upload status are rendered by DpUploadArea via
     * the headless @uppy/vue hooks, fed through <UppyContextProvider>
     */
    createUppy () {
      uppyInstanceCount += 1
      const uppy = new Uppy({
        id: `uppy-${this.dataCy}-${uppyInstanceCount}`,
        autoProceed: true,
        allowMultipleUploads: this.allowMultipleUploads,
        restrictions: {
          allowedFileTypes: this.allowedFileTypeArray,
          maxFileSize: this.maxFileSize,
          maxNumberOfFiles: this.maxNumberOfFiles,
        },
        onBeforeFileAdded: this.handleOnBeforeFileAdded,
        locale: this.uppyTranslations,
      })

      let currentProcedureId = null

      if (typeof dplan !== 'undefined' && hasOwnProp(dplan, 'procedureId')) {
        currentProcedureId = dplan.procedureId
      }

      const headers = {}
      // Add current procedure id only if set
      if (currentProcedureId !== null && currentProcedureId !== '0') {
        headers['X-Demosplan-Procedure-Id'] = currentProcedureId
      }

      // If we have a basic auth, for some reason it has to be added to the header
      if (this.basicAuth !== '') {
        headers.Authorization = this.basicAuth
      }

      uppy.use(Tus, {
        endpoint: this.tusEndpoint,
        chunkSize: this.chunkSize,
        limit: 5,
        onAfterResponse: (_req, res) => {
          this.currentFileHash = res.getHeader('X-Demosplan-File-Hash')
          this.currentFileId = res.getHeader('X-Demosplan-File-Id')
        },
        removeFingerprintOnSuccess: true,
        headers,
        withCredentials: true,
      })

      return uppy
    },

    registerUppyEvents () {
      this.uppy.on('complete', result => {
        setTimeout(() => {
          /*
           * Triggers uppy file-removed event (we are instead using a custom file-remove event). we do not want files to
           * be removed on resetting the uppy ui
           */
          this.uppy.cancelAll()
        }, 2000)

        this.$emit('uploads-completed', result)
      })

      this.uppy.on('upload-error', (file, error, response) => {
        console.error(error)
        dplan.notify.error(this.uppyTranslations.strings.errorFileUpload)
        this.$emit('file-error', { file, error, response })
      })

      this.uppy.on('file-added', file => {
        this.$emit('file-added', file)
      })

      this.uppy.on('upload', data => {
        this.$emit('upload', data)
      })

      this.uppy.on('restriction-failed', () => {
        dplan.notify.warning(this.allowedFileTypesWarning)
      })

      /*
       * `upload-success` fires each time a single upload completes successfully.
       * @see https://uppy.io/docs/uppy/#upload-success
       */
      this.uppy.on('upload-success', (file) => {
        const newFile = {
          name: file.name,
          hash: this.currentFileHash,
          size: file.size ?? file.data?.size,
          type: file.type ?? file.data?.type,
          id: file.id, // The uppy internal file id
          fileId: this.currentFileId, // The id of the file within demosplan
        }
        this.currentFileHash = ''
        this.currentFileId = ''
        this.$emit('upload-success', newFile)
      })
    },
  },

  created () {
    /*
     * markRaw prevents vue from wrapping the uppy instance in a reactive proxy: uppy v5 relies
     * on private class fields, and a proxy breaks those identity checks
     */
    this.uppy = markRaw(this.createUppy())
    this.registerUppyEvents()
  },

  beforeUnmount () {
    if (this.uppy) {
      this.uppy.clear()
    }
  },
}
</script>
