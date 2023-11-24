import type { Meta, StoryObj } from '@storybook/vue'
import { DpEditor, DpModal, DpButton } from '~/components'

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
                  ref="editorModal">
                <p>
                  Insert quote from...
                </p>
                <dp-button
                  class="u-mr"
                  text="Oscar Wilde"
                  variant="subtle"
                  @click.stop="modalProps.handleInsertText('Experience is the name everyone gives to their mistakes.')" />
                <dp-button
                  text="Martin Fowler"
                  variant="subtle"
                  @click.stop="modalProps.handleInsertText('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.')" />
              </dp-modal>
            </template>
            <template v-slot:button>
              <dp-button
                  text="Add Quote"
                  variant="subtle"
                  @click.stop="$refs.editorModal.toggle()" />
            </template>
          </dp-editor>
        `,
    })
}
