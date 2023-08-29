import type { Meta, StoryObj } from '@storybook/vue'
import DpLabel from './DpLabel.vue'

const meta: Meta<typeof DpLabel> = {
    component: DpLabel,
    title: "Components/Label"
}

interface IDpLabel {
    bold: boolean
    for: string
    hint: string | string[]
    text: string
    tooltip: string
    required: boolean
}

type Story = StoryObj<IDpLabel>

export default meta

export const Default: Story = {
    args: {
        for: 'formControlId',
        text: 'Label Text'
    }
}
