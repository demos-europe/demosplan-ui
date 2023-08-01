import type { Meta, StoryObj } from '@storybook/vue'
import DpHeightLimit from './DpHeightLimit.vue'

const Translator = {
  trans: (key: string): string => key
}

const meta: Meta<typeof DpHeightLimit> = {
  component: DpHeightLimit,
  title: "Components/HeightLimit",
  argTypes: { 'heightLimit:toggle': { action: 'heightLimit:toggle' } }
}

export default meta
type Story = StoryObj<typeof DpHeightLimit>

export const Default: Story = {
  args: {
    shortText: 'test text',
    fullText: 'test text test text test text test text test text test text test text test text test text test text test text ',
    isShortened: true,
    noEvent: true,
    element: 'element',

  }
}
