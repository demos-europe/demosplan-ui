import type { Meta, StoryObj } from '@storybook/vue3-vite'
import * as DpUploadFiles from '~/components'

/**
 * Mock function to simulate getFileByHash
 */
const mockGetFileByHash = (hash: string) => {
  // In a real application, this would return a URL to the file
  return `https://example.com/api/files/${hash}`
}

const meta: Meta<typeof DpUploadFiles> = {
  title: 'Components/UploadFiles',
  component: DpUploadFiles,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'File upload component using drag-and-drop or file browser, supporting single or multiple file uploads with validation.'
      }
    }
  },
  argTypes: {
    'upload-success': { action: 'upload-success' },
    'file-remove': { action: 'file-remove' },
    allowedFileTypes: {
      control: 'select',
      options: ['all', 'image', 'pdf', 'office', 'zip'],
      description: 'File types allowed for upload (preset or array of mime types)'
    },
    maxFileSize: {
      control: { type: 'number', min: 1000, max: 100000000, step: 1000000 },
      description: 'Maximum file size in bytes'
    },
    maxNumberOfFiles: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of files that can be uploaded'
    },
    sideBySide: {
      control: 'boolean',
      description: 'Display uploaded files next to dropzone instead of below'
    },
    required: {
      control: 'boolean',
      description: 'Mark upload field as required'
    },
    needsHiddenInput: {
      control: 'boolean',
      description: 'Add hidden input with file hashes for form submission'
    },
    allowMultipleUploads: {
      control: 'boolean',
      description: 'Allow user to upload more files after uploading some'
    }
  }
}

export default meta
type Story = StoryObj<typeof DpUploadFiles>

/**
 * Basic single file upload with PDF files only
 */
export const Basic: Story = {
  render: (args) => ({
    components: { DpUploadFiles },
    setup() {
      const handleUploadSuccess = (file: any) => {
        console.log('File uploaded:', file)
      }

      const handleFileRemove = (file: any) => {
        console.log('File removed:', file)
      }

      return { args, handleUploadSuccess, handleFileRemove }
    },
    template: `
      <div class="p-4 max-w-2xl mx-auto">
        <dp-upload-files
          v-bind="args"
          @upload-success="handleUploadSuccess"
          @file-remove="handleFileRemove"
        />
      </div>
    `
  }),
  args: {
    allowedFileTypes: 'pdf',
    tusEndpoint: 'https://example.com/tus',
    getFileByHash: mockGetFileByHash,
    maxFileSize: 10000000,
    maxNumberOfFiles: 1,
    label: {
      text: 'Upload PDF Document',
      hint: 'Drag and drop your PDF file here, or click to select',
      tooltip: 'Maximum file size: 10MB'
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-upload-files
  allowed-file-types="pdf"
  tus-endpoint="https://example.com/tus"
  :get-file-by-hash="getFileByHash"
  :max-file-size="10000000"
  :max-number-of-files="1"
  :label="{
    text: 'Upload PDF Document',
    hint: 'Drag and drop your PDF file here, or click to select',
    tooltip: 'Maximum file size: 10MB'
  }"
  @upload-success="handleUploadSuccess"
  @file-remove="handleFileRemove"
/>
`
      }
    }
  }
}

/**
 * Multiple file upload configuration
 */
export const MultipleFiles: Story = {
  render: (args) => ({
    components: { DpUploadFiles },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4 max-w-2xl mx-auto">
        <dp-upload-files v-bind="args" />
      </div>
    `
  }),
  args: {
    allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    tusEndpoint: 'https://example.com/tus',
    getFileByHash: mockGetFileByHash,
    maxFileSize: 20000000,
    maxNumberOfFiles: 5,
    allowMultipleUploads: true,
    label: {
      text: 'Upload Documents',
      hint: 'Allowed file types: JPG, PNG, PDF (max 5 files)',
      tooltip: 'Maximum file size: 20MB per file'
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-upload-files
  :allowed-file-types="['image/jpeg', 'image/png', 'application/pdf']"
  tus-endpoint="https://example.com/tus"
  :get-file-by-hash="getFileByHash"
  :max-file-size="20000000"
  :max-number-of-files="5"
  :allow-multiple-uploads="true"
  :label="{
    text: 'Upload Documents',
    hint: 'Allowed file types: JPG, PNG, PDF (max 5 files)',
    tooltip: 'Maximum file size: 20MB per file'
  }"
/>
`
      }
    }
  }
}
