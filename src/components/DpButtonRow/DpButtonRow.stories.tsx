import type { Meta, StoryObj } from '@storybook/vue'

import DpButtonRow from './DpButtonRow.vue'

const meta: Meta<typeof DpButtonRow> = {
    component: DpButtonRow,
    title: "Components/ButtonRow",
    argTypes: {
        'primaryAction': { action: 'primaryAction' },
        'secondaryAction': { action: 'secondaryAction' }
    }
}

export default meta
type Story = StoryObj<typeof DpButtonRow>

export const Default: Story = {
    args: {
        default: `<div><span>Example</span></div>`,
    },
}
