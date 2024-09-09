import type { Meta, StoryObj } from '@storybook/vue3'
import DpDatepicker from './'

const meta: Meta<typeof DpDatepicker> = {
    component: DpDatepicker,
    title: "Components/Datepicker",

}

interface IDpDatepicker {
    id: string
    input: object
}

type Story = StoryObj<IDpDatepicker>

export default meta

export const Default: Story = {
    args: {
        id: 'id'
    },
    argTypes: {
        input: { action: 'input' },
    }
}
