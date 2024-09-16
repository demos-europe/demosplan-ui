import type { Meta, StoryObj } from '@storybook/vue3'
import DpTooltip from './'

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
          Tooltip Trigger.
        </dp-tooltip>`,
    })
}

interface IDpTooltip {
    text: string
}

type Story = StoryObj<IDpTooltip>

export default meta

export const Default: Story = {
    args: {
        text: 'Need assistance? Click here for help and support.',
    },
    argTypes: { }
}
