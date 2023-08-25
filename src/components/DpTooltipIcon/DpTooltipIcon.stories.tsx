import type { Meta, StoryObj } from '@storybook/vue'
import DpTooltipIcon from './DpTooltipIcon.vue'

const meta: Meta<typeof DpTooltipIcon> = {
    component: DpTooltipIcon,
    title: "Components/TooltipIcon",
    argTypes: {}
}

export default meta
type Story = StoryObj<typeof DpTooltipIcon>

export const Default: Story = {
    args: {
        icon: 'fa-question-circle',
        text: 'Content of the tooltip'
    }
}
