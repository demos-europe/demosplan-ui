<template>
  <div
    :data-cy="dataCy"
    ref="fileInput" />
</template>

<script>
import { de } from './utils/UppyTranslations'
import { hasOwnProp } from '../../utils'
import { getFileTypes } from '../../lib'
import DragDrop from '@uppy/drag-drop'
import ProgressBar from '@uppy/progress-bar'
import Tus from '@uppy/tus'
import Uppy from '@uppy/core'

export default {
  name: 'DpUpload',

  emits: [
    'file-added',
    'file-error',
    'upload',
    'uploads-completed',
    'upload-success'
  ],

  props: {
    /**
     * Array of mimeTypes or a defined preset as String
     * @see  '@DemosPlanCoreBundle/lib/FileInfo'
     */
    allowedFileTypes: {
      type: [Array, String],
      required: false,
      default: 'pdf'
    },

    /**
     * Warning message that will be rendered if files are added that are not allowed in `allowedFileTypes`.
     */
    allowedFileTypesWarning: {
      type: String,
      default: de().strings.warningFileType
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
     * Define chunk size for huge files like PDFs.
     * Important: Only change the default value if you are very sure about the consequences.
     * It is recommended to change the value via setting the chunkSize prop instead of adjusting
     * the default here, which basically allows the upload chunks to be as big as possible.
     */
    chunkSize: {
      type: Number,
      default: Infinity,
      required: false
    },

    dataCy: {
      type: String,
      required: false,
      default: 'upload'
    },

    /**
     * Maximum file size in bytes for each individual file.
     */
    maxFileSize: {
      type: Number,
      default: 10000000
    },

    /**
     * Maximum number of files that can be uploaded.
     * By default, it's allowed to upload a single file.
     */
    maxNumberOfFiles: {
      type: Number,
      required: false,
      default: 1
    },

    translations: {
      type: Object,
      required: false,
      default: () => ({})
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
      currentFileHash: '',
      currentFileId: '',
      uppy: null,
      uppyTranslations: {
        strings: {
          ...de().strings, ...this.translations
        }
      },
    }
  },

  computed: {
    allowedFileTypeArray () {
      return getFileTypes(this.allowedFileTypes)
    }
  },

  methods: {
    getCookieValue (a) {
      const b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)')
      return b ? b.pop() : ''
    },

    /**
     * Fires immediately before a file is added to the Uppy store.
     *
     * The hook is used here to clean file names from characters that would
     * break the tus endpoint. This could as well be implemented within the backend.
     *
     * @param currentFile
     * @param files
     * @return {(*&{meta: (*&{name: *}), name: *})|*}
     * @see https://github.com/transloadit/uppy/blob/main/packages/@uppy/core/src/Uppy.js#L503
     */
    handleOnBeforeFileAdded (currentFile, files) {
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
        '\\'
      ]

      for (let i = 0; i < reservedCharacters.length; i++) {
        if (fileName.includes(reservedCharacters[i])) {
          fileName = fileName.replace(reservedCharacters[i], '_')
        }
      }

      if (fileName !== currentFile.name) {
        return {
          ...currentFile,
          name: fileName,
          meta: {
            ...currentFile.meta,
            name: fileName
          }
        }
      } else {
        return currentFile
      }
    },

    initialize () {
      this.uppy = new Uppy({
        disabled: true,
        autoProceed: true,
        allowMultipleUploads: this.allowMultipleUploads,
        restrictions: {
          allowedFileTypes: this.allowedFileTypeArray,
          maxFileSize: this.maxFileSize,
          maxNumberOfFiles: this.maxNumberOfFiles
        },
        onBeforeFileAdded: this.handleOnBeforeFileAdded,
        locale: this.uppyTranslations
      })

      this.uppy.use(DragDrop, {
        target: this.$refs.fileInput,
        width: '100%',
        note: null,
        locale: this.uppyTranslations
      })

      this.uppy.use(ProgressBar, {
        target: this.$refs.fileInput,
        fixed: false,
        hideAfterFinish: false
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

      this.uppy.use(Tus, {
        endpoint: this.tusEndpoint,
        chunkSize: this.chunkSize,
        limit: 5,
        onAfterResponse: (_req, res) => {
          this.currentFileHash = res.getHeader('X-Demosplan-File-Hash')
          this.currentFileId = res.getHeader('X-Demosplan-File-Id')
        },
        removeFingerprintOnSuccess: true,
        headers
      })

      // Access the hidden input element, that accepted files array.
      const uppyInputs = document.querySelectorAll('.uppy-DragDrop-input')
      if (uppyInputs) {
        uppyInputs.forEach((uppyInput, index) => {
          // Add data-cy attribute
          uppyInput.setAttribute('data-cy', `uppyDragDropInput:${index}`)
        })
      }
    }
  },

  mounted () {
    this.initialize()

    this.uppy.on('complete', result => {
      setTimeout(() => {
        /*
         * Triggers uppy file-removed event (we are instead using a custom file-remove event. we do not want files to
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
      const { name, size, type } = file.data
      const newFile = {
        name: name,
        hash: this.currentFileHash,
        size: size,
        type: type,
        id: file.id, // The uppy internal file id
        fileId: this.currentFileId // The id of the file within demosplan
      }
      this.currentFileHash = ''
      this.currentFileId = ''
      this.$emit('upload-success', newFile)
    })
  },

  beforeUnmount () {
    if (this.uppy) {
      this.uppy.close()
    }
  }
}
</script>
