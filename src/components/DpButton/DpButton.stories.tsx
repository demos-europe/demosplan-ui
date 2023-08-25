import type { Meta, StoryObj } from '@storybook/vue'

import DpButton from './DpButton.vue'

const meta: Meta<typeof DpButton> = {
    component: DpButton,
    title: "Components/Button"
}

export default meta
type Story = StoryObj<typeof DpButton>

export const Default: Story = {
    args: {}
}
