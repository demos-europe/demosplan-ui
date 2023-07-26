import type { Meta, StoryObj } from '@storybook/vue'

import DpContextualHelp from './DpContextualHelp.vue'

const Translator = {
  trans: (key: string): string => key
}

const meta: Meta<typeof DpContextualHelp> = {
  component: DpContextualHelp,
  title: "Components/DpContextualHelp",
}

export default meta
type Story = StoryObj<typeof DpContextualHelp>

export const Default: Story = {
  args: {
    text: 'test text'
  }
}
