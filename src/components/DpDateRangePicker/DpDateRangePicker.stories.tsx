import type { Meta, StoryObj } from '@storybook/vue'
import DpDateRangePicker from './'

const meta: Meta<typeof DpDateRangePicker> = {
    component: DpDateRangePicker,
    title: "Components/DateRangePicker",

}

interface IDpDateRangePicker {
    endId: string
    startId: string
    'input:endDate': object
    'input:startDate': object
}

type Story = StoryObj<IDpDateRangePicker>

export default meta

export const Default: Story = {
    args: {
        endId: 'endId',
        startId: 'startId'
    },
    argTypes: {
        'input:endDate': { action: 'input:endDate' },
        'input:startDate': { action: 'input:startDate' }
    }
}
