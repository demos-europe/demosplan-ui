import type { Meta, StoryObj } from '@storybook/vue'
import DpCard from './DpCard.vue'

const meta: Meta<typeof DpCard> = {
    component: DpCard,
    title: "Components/Card",
    argTypes: {},
    render: (args) => ({
        components: {
            DpCard
        },
        setup() {
            return { args }
        },
        template: `<dp-card v-bind="args">
          Content goes here (into the default slot).
        </dp-card>`,
    })
}

interface IDpCard {
    heading: string,
    headingTooltip: string
}

export default meta
type Story = StoryObj<IDpCard>

export const Default: Story = {
    args: {
        heading: 'Heading',
        headingTooltip: 'This is a tooltip'
    }
}
