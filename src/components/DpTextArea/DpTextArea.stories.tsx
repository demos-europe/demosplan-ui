import type { Meta, StoryObj } from '@storybook/vue'
import DpTextArea from './DpTextArea.vue'

const meta: Meta<typeof DpTextArea> = {
    component: DpTextArea,
    title: "Components/TextArea",
    argTypes: {
        'input': { action: 'input' }
    }
}

export default meta
type Story = StoryObj<typeof DpTextArea>

export const Default: Story = {
    args: {}
}
