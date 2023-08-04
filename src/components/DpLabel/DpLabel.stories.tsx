import type { Meta, StoryObj } from '@storybook/vue'
import DpLabel from './DpLabel.vue'

const meta: Meta<typeof DpLabel> = {
    component: DpLabel,
    title: "Components/Label"
}

export default meta
type Story = StoryObj<typeof DpLabel>

export const Default: Story = {
    args: {
        for: 'formControlId',
        text: 'Label Text'
    }
}
