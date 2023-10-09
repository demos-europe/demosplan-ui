import type { Meta, StoryObj } from '@storybook/vue'
import DpEditor from './DpEditor.vue'

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
