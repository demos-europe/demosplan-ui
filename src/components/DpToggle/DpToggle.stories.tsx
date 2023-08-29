import type { Meta, StoryObj } from '@storybook/vue'
import DpToggle from './DpToggle.vue'

const meta: Meta<typeof DpToggle> = {
    component: DpToggle,
    title: "Components/Toggle"
}

interface IDpToggle {
    input: object
}

type Story = StoryObj<IDpToggle>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        input: { action: 'input' }
    }
}
