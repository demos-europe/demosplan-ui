import type { Meta, StoryObj } from '@storybook/vue'
import DpBadge from './'

interface IDpBadge {
  text: string
}

const meta: Meta<typeof DpBadge> = {
  component: DpBadge,
  title: "Components/Badge"
}

export default meta
type Story = StoryObj<IDpBadge>

export const Default: Story = {
  args: {
    text: 'Info text'
  },
  argTypes: {
    'text':  { action: 'text' }
  }
}
