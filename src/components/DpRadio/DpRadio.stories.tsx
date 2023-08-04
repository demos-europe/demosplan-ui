import type { Meta, StoryObj } from '@storybook/vue'
import DpRadio from './DpRadio.vue'

const meta: Meta<typeof DpRadio> = {
    component: DpRadio,
    title: "Components/Radio",
    argTypes: {
        'change': { action: 'change' }
    }
}

export default meta
type Story = StoryObj<typeof DpRadio>

export const Default: Story = {
    args: {
        id: 'radioId'
    }
}
