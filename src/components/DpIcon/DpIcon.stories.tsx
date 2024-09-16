import type { Meta, StoryObj } from '@storybook/vue3'
import DpIcon from './'

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
