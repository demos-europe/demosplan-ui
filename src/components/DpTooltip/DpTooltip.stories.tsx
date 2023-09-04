import type { Meta, StoryObj } from '@storybook/vue'
import DpTooltip from './DpTooltip.vue'

const meta: Meta<typeof DpTooltip> = {
    component: DpTooltip,
    title: 'Components/Tooltip',
    render: (args) => ({
        components: {
            DpTooltip,
        },
        setup() {
            return { args }
        },
        template: `<dp-tooltip v-bind='args'>
          my text
        </dp-tooltip>`,
    })
}

interface IDpAccordion {
    text: string
}

type Story = StoryObj<IDpAccordion>

export default meta

export const Default: Story = {
    args: {
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    argTypes: { }
}
