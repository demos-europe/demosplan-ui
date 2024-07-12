import type { Meta, StoryObj } from '@storybook/vue'
import DpFlyout from './'

const meta: Meta<typeof DpFlyout> = {
    component: DpFlyout,
    title: "Components/Flyout"
}

interface IDpFlyout {
    align: string
    close: object
    disabled: boolean
    hasMenu: boolean
    open: object
    padded: boolean
}

type Story = StoryObj<IDpFlyout>

export default meta

export const Default: Story = {
    args: {
        align: 'right',
        disabled: false,
        hasMenu: true,
        padded: true
    },
    argTypes: {
        open: { action: 'open' },
        close: { action: 'close' }
    }
}
