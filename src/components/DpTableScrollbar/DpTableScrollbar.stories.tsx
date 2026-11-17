import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpTableScrollbar from './'

interface IDpTableScrollbar {
  controls: string
  isFullscreen?: boolean
  scrollPercent: number
  thumbStyle: Record<string, string>
}

const meta: Meta<typeof DpTableScrollbar> = {
  component: DpTableScrollbar,
  title: 'Components/TableScrollbar',
  parameters: {
    docs: {
      description: {
        component: 'The TableScrollbar component displays a custom, always visible scrollbar below a horizontally scrollable table.'
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpTableScrollbar>

export const Default: Story = {
  args: {
    controls: 'scroll-container',
    isFullscreen: false,
    scrollPercent: 30,
    thumbStyle: { left: '80px', width: '200px' }
  }
}
