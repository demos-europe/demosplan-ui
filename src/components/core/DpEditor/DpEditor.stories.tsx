import type { Meta, StoryObj } from '@storybook/vue'
import DpEditor from './DpEditor.vue'

const meta: Meta<typeof DpEditor> = {
    component: DpEditor,
    title: "Components/Editor",
    argTypes: {
        'input': { action: 'input' }
    }
}

export default meta
type Story = StoryObj<typeof DpEditor>

export const Default: Story = {
    args: {
        value: 'Text',
    }
}
