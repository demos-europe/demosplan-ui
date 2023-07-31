import type { Meta, StoryObj } from '@storybook/vue'

import DpButtonRow from './DpButtonRow.vue'

const meta: Meta<typeof DpButtonRow> = {
    component: DpButtonRow,
    title: "Components/ButtonRow",
    argTypes: {
        'primaryAction': { action: 'primaryAction' },
        'secondaryAction': { action: 'secondaryAction' }
    },
    render: (args) => ({
        components: {
            DpButtonRow,
        },
        setup() {
            return { args }
        },
        template: `<dp-button-row primary secondary v-bind="args"></dp-button-row>`,
    })
}

export default meta
type Story = StoryObj<typeof DpButtonRow>

export const Default: Story = {
    args: {},
}
