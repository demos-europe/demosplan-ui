import type { Meta, StoryObj } from '@storybook/vue'
import DpDetails from './DpDetails.vue'

const meta: Meta<typeof DpDetails> = {
    component: DpDetails,
    title: "Components/Details",
    render: (args) => ({
        components: {
            DpDetails,
        },
        setup() {
            return { args }
        },
        template: `<dp-details v-bind="args">
        Content to be revealed onClick of the summary.
        </dp-details>`,
    })
}

interface IDpDetails {
    default: string
    summary: string
}

type Story = StoryObj<IDpDetails>

export default meta

export const Default: Story = {
    args: {
        default: 'Content to be revealed onClick of the summary.',
        summary: 'The summary tells users what to find in the details'
    }
}
