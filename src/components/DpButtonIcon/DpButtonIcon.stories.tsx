import type { Meta, StoryObj } from '@storybook/vue'
import DpButtonIcon from './'

const meta: Meta<typeof DpButtonIcon> = {
    component: DpButtonIcon,
    title: "Components/ButtonIcon",

}

interface IDpButtonIcon {
    icon: string
    text: string
    click: object
}

type Story = StoryObj<IDpButtonIcon>

export default meta

export const Default: Story = {
    args: {
        icon: 'fa fa-check',
        text: 'Tooltip-Text'
    },
    argTypes: {
        click: { action: 'click' },
    }
}
