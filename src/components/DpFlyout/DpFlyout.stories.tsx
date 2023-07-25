import type { Meta, StoryObj } from '@storybook/vue'

import DpFlyout from './DpFlyout.vue'

const meta: Meta<typeof DpFlyout> = {
    component: DpFlyout,
    parameters: {
        docs: {
            description: {
                component: 'The Flyout component renders a flyout that is intended to show further content.\n' +
                    '## Roadmap.\n' +
                    '- use https://popper.js.org/docs/v2/ for positioning instead of basic css - or find another way to make left/right offset dynamic.'
            },
        },
    },
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
