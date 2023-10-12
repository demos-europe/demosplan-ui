import type { Meta, StoryObj } from '@storybook/vue'
import DpEditor from './DpEditor.vue'
import DpModal from '~/components/DpModal'
import DpButton from '~/components/DpButton'

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
    routes: object
    toolbarItems: object
    tusEndpoint: string
    value: string
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
        routes: {
            getFileByHash: () => {}
        },
        toolbarItems: {
            fullscreenButton: true,
            headings: [2,3,4],
            imageButton: true,
            insertAndDelete: true,
            linkButton: true,
            strikethrough: true,
            table: true
        },
        tusEndpoint: 'tusEndpointPath',
        value: '',
    },
    render: (args) => ({
        components: {
            DpButton,
            DpEditor,
            DpModal
        },
        setup() {
            return { args }
        },
        template: `
          <dp-editor v-bind="args">
            <template v-slot:modal="modalProps">
              <dp-modal
                  id="editorModal"
                  ref="editorModal"
                  @insert="text => modalProps.handleInsertText(textFromParentComponent)">
                Add an component
              </dp-modal>
            </template>
            <template v-slot:button>
              <dp-button
                  text="Add Text"
                  variant="subtle"
                  @click.stop="$refs.editorModal.toggle()" />
            </template>
          </dp-editor>
        `,
    })
}
