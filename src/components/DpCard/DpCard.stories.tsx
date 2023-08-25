import type { Meta, StoryObj } from '@storybook/vue'
import DpCard from './DpCard.vue'
import DpLoading from '../DpLoading/DpLoading.vue'

const meta: Meta<typeof DpCard> = {
    component: DpCard,
    title: "Components/Card",
    argTypes: {},
    render: (args) => ({
        components: {
            DpCard,
            DpLoading
        },
        setup() {
            return { args }
        },
        template: `<dp-card v-bind="args">
          <dp-loading class="u-mt-0_5" />
        </dp-card>`,
    })
}

export default meta
type Story = StoryObj<typeof DpCard>

export const Default: Story = {
    args: {
        heading: 'Heading',
        headingTooltip: 'This is a tooltip'
    }
}
