import type { Meta, StoryObj } from '@storybook/vue'
import DpLoading from './DpLoading.vue'

const meta: Meta<typeof DpLoading> = {
    component: DpLoading,
    title: "Components/Loading"
}

export default meta
type Story = StoryObj<typeof DpLoading>

export const Default: Story = {
    args: {}
}
