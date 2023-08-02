import type { Meta, StoryObj } from '@storybook/vue'
import DpIcon from './DpIcon.vue'

const meta: Meta<typeof DpIcon> = {
    component: DpIcon,
    title: "Components/Icon",
    argTypes: {}
}

export default meta
type Story = StoryObj<typeof DpIcon>

export const Default: Story = {
    args: {
        icon: 'history'
    }
}
