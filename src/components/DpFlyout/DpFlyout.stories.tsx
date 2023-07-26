import type { Meta, StoryObj } from '@storybook/vue'
import DpFlyout from './DpFlyout.vue'

const meta: Meta<typeof DpFlyout> = {
    component: DpFlyout,
    title: "Components/DpFlyout",
    argTypes: {
        'open': { action: 'open' },
        'close': { action: 'close' }
    }
}

export default meta
type Story = StoryObj<typeof DpFlyout>

export const Default: Story = {
    args: {
        align: 'right',
        disabled: false,
        hasMenu: true,
        padded: true
    }
}
