import type { Meta, StoryObj } from '@storybook/vue3'
import DpLoading from './'

interface IDpLoading {
    hideLabel: boolean
    overlay: boolean
}

const meta: Meta<typeof DpLoading> = {
    component: DpLoading,
    title: "Components/Loading"
}

export default meta

type Story = StoryObj<IDpLoading>

export const Default: Story = {
    args: {}
}
