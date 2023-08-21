import type { Meta, StoryObj } from '@storybook/vue'
import DpToggle from './DpToggle.vue'

const meta: Meta<typeof DpToggle> = {
    component: DpToggle,
    title: "Components/Toggle",
    argTypes: {
        'input': { action: 'input' }
    }
}

export default meta
type Story = StoryObj<typeof DpToggle>

export const Default: Story = {
    args: {}
}
