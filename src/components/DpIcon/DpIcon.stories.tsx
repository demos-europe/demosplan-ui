import type { Meta, StoryObj } from '@storybook/vue'
import DpIcon from './DpIcon.vue'

const meta: Meta<typeof DpIcon> = {
    component: DpIcon,
    title: "Components/Icon",
    argTypes: {}
}


interface IDpIcon {
    icon: string
    size: string
}

type Story = StoryObj<IDpIcon>

export default meta

export const Default: Story = {
    args: {
        icon: 'history'
    }
}
