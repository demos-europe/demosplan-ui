import type { Meta, StoryObj } from '@storybook/vue'
import DpDatetimePicker from './'

const meta: Meta<typeof DpDatetimePicker> = {
    component: DpDatetimePicker,
    title: "Components/DatetimePicker",

}

interface IDpDatetimePicker {
    id: string
    input: object
    value: string
}

type Story = StoryObj<IDpDatetimePicker>

export default meta

export const Default: Story = {
    args: {
        id: 'DatetimePicker_id',
        value: '2023-07-13T07:20:00.000Z'
    },
    argTypes: {
        input: { action: 'input' },
    }
}
