import type { Meta, StoryObj } from '@storybook/vue3'
import DpButton from './'

const meta: Meta<typeof DpButton> = {
    component: DpButton,
    title: "Components/Button"
}

interface IDpButton {
    busy: boolean
    color: string
    hideText: boolean
    href: string
    icon: string
    iconSize: string
    iconAfter: string
    rounded: boolean
    text: string
    type: string
    variant: string
}

export default meta
type Story = StoryObj<IDpButton>

export const Default: Story = {
    args: {}
}
