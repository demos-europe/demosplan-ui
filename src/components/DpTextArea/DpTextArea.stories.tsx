import type { Meta, StoryObj } from '@storybook/vue3'
import DpTextArea from './'

const meta: Meta<typeof DpTextArea> = {
    component: DpTextArea,
    title: "Components/TextArea"
}

interface IDpTextArea {
    input: object
}

export default meta
type Story = StoryObj<IDpTextArea>

export const Default: Story = {
    args: {},
    argTypes: {
        input: { action: 'input' }
    }
}
