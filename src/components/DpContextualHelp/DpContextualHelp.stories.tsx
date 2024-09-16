import type { Meta, StoryObj } from '@storybook/vue3'
import DpContextualHelp from './'

const meta: Meta<typeof DpContextualHelp> = {
  component: DpContextualHelp,
  title: "Components/ContextualHelp",
}

interface IDpContextualHelp {
  icon: string
  size: string
  text: string
}

type Story = StoryObj<IDpContextualHelp>

export default meta

export const Default: Story = {
  args: {
    text: 'test text'
  }
}
