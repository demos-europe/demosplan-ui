import type { Meta, StoryObj } from '@storybook/vue3'
import DpLabel from './'

interface IDpLabel {
    bold: boolean
    for: string
    hint: string | string[]
    text: string
    tooltip: string
    required: boolean
}

const meta: Meta<typeof DpLabel> = {
    component: DpLabel,
    title: "Components/Label"
}

export default meta

type Story = StoryObj<IDpLabel>

export const Default: Story = {
    args: {
        for: 'formControlId',
        text: 'Label Text'
    }
}
