import type { Meta, StoryObj } from '@storybook/vue'
import DpLoading from './DpLoading.vue'

const meta: Meta<typeof DpLoading> = {
    component: DpLoading,
    title: "Components/Loading"
}

interface IDpLoading {
    hideLabel: boolean
    overlay: boolean
}

type Story = StoryObj<IDpLoading>

export default meta

export const Default: Story = {
    args: {}
}
