import type { Meta, StoryObj } from '@storybook/vue3'
import DpTimePicker from './'

const meta: Meta<typeof DpTimePicker> = {
    component: DpTimePicker,
    title: "Components/TimePicker",

}

interface IDpTimePicker {
    id: string
    input: object
}

type Story = StoryObj<IDpTimePicker>

export default meta

export const Default: Story = {
    args: {
        id: 'TimePicker_id'
    },
    argTypes: {
        input: { action: 'input' },
    }
}
