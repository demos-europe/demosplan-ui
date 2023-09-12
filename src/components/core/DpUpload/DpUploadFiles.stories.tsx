import type { Meta, StoryObj } from '@storybook/vue'
import DpUploadFiles from './DpUploadFiles.vue'

const meta: Meta<typeof DpUploadFiles> = {
    component: DpUploadFiles,
    title: 'Components/UploadFiles',
    render: (args) => ({
        components: {
            DpUploadFiles
        },
        setup() {
            return { args }
        },
        template: `<dp-upload-files v-bind="args"></dp-upload-files>`,
    })
}

interface IDpUploadFiles {
    fileRemove: object
    uploadSuccess: object
    allowedFileTypes: string
    getFileByHash: Function
    tusEndpoint: string
}

type Story = StoryObj<IDpUploadFiles>

export default meta

export const Default: Story = {
    args: {
        allowedFileTypes: 'all',
        tusEndpoint: '',
        getFileByHash: () => ''
    },
    argTypes: {
        fileRemove: { action: 'fileRemove' },
        uploadSuccess: { action: 'uploadSuccess' }
    }
}
