import type { Meta, StoryObj } from '@storybook/vue3'
import DpIcon from './'

interface IDpIcon {
    icon: string
    size: string
}

const meta: Meta<typeof DpIcon> = {
    component: DpIcon,
    title: "Components/Icon",
    argTypes: {}
}

export default meta

type Story = StoryObj<IDpIcon>

export const Default: Story = {
    args: {
        icon: 'history'
    }
}
