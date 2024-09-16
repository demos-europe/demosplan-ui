import type { Meta, StoryObj } from '@storybook/vue3'
import DpTooltipIcon from './'

interface IDpTooltipIcon {
    icon: string,
    text: string,
}

const meta: Meta<typeof DpTooltipIcon> = {
    component: DpTooltipIcon,
    title: "Components/TooltipIcon",
    argTypes: {}
}

export default meta
type Story = StoryObj<IDpTooltipIcon>

export const Default: Story = {
    args: {
        icon: 'fa-question-circle',
        text: 'Content of the tooltip'
    }
}
