import type { Meta, StoryObj } from '@storybook/vue'

import DpBadge from './DpBadge.vue'

const meta: Meta<typeof DpBadge> = {
  component: DpBadge,
  title: "Components/DpBadge",
  argTypes: {
    'text':  { action: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof DpBadge>

export const Default: Story = {
  args: {
    text: 'Info text'
  }
}