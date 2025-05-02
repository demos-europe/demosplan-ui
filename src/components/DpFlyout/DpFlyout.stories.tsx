import type { Meta, StoryObj } from '@storybook/vue3'
import DpFlyout from './'

interface IDpFlyout {
    align: string
    close: object
    disabled: boolean
    hasMenu: boolean
    open: object
    padded: boolean
}

const meta: Meta<typeof DpFlyout> = {
    component: DpFlyout,
    title: "Components/Flyout"
}

export default meta

type Story = StoryObj<IDpFlyout>

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
