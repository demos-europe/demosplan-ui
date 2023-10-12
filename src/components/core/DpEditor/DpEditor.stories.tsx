import type { Meta, StoryObj } from '@storybook/vue'
import DpEditor from './DpEditor.vue'
import DpModal from '~/components/DpModal'

const meta: Meta<typeof DpEditor> = {
    component: DpEditor,
    title: 'Components/Editor',
    render: (args) => ({
        components: {
            DpEditor
        },
        setup() {
            return { args }
        },
        template: `<dp-editor v-bind="args"></dp-editor>`,
    })
}

interface IDpEditor {
    tusEndpoint: string
    value: string
    toolbarItems: object
    routes: object
}

type Story = StoryObj<IDpEditor>

export default meta

export const Default: Story = {
    args: {
        value: ''
    },
    argTypes: {}
}

export const Extended: Story = {
    args: {
        tusEndpoint: 'tusEndpointPath',
        value: '',
        toolbarItems: {
            fullscreenButton: true,
            insertAndDelete: true,
            table: true,
            headings: [2,3,4],
            imageButton: true,
            linkButton: true,
            strikethrough: true
        },
        routes: {
            getFileByHash: () => {}
        }
    },
    render: (args) => ({
        components: {
            DpEditor,
            DpModal
        },
        setup() {
            return { args }
        },
        template: `<dp-editor v-bind="args">
          <template v-slot:modal="modalProps">
            <dp-modal
                id="openModal"
                ref="openModal">
              Add an component
            </dp-modal>
          </template>
        </dp-editor>`,
    })
}
