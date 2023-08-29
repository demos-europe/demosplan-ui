import type { Meta, StoryObj } from '@storybook/vue'
import DpHeightLimit from './DpHeightLimit.vue'

const Translator = {
  trans: (key: string): string => key
}

const meta: Meta<typeof DpHeightLimit> = {
  component: DpHeightLimit,
  title: "Components/HeightLimit"
}

interface IDpHeightLimit {
  shortText: string
  fullText: string
  'heightLimit:toggle': object
  noEvent: boolean
  element: string
  isShortened: boolean

}

type Story = StoryObj<IDpHeightLimit>

export default meta

export const Default: Story = {
  args: {
    shortText: 'test text',
    fullText: 'test text test text test text test text test text test text test text test text test text test text test text ',
    isShortened: true,
    noEvent: true,
    element: 'element'
  },
  argTypes: {
    'heightLimit:toggle': { action: 'heightLimit:toggle' }
  }
}
