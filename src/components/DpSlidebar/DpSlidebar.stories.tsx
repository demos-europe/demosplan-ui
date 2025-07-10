import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpSlidebar from './'

interface IDpSlidebar {
  close: (event: Event) => void
}

const meta: Meta<typeof DpSlidebar> = {
  title: 'Components/Slidebar',
  component: DpSlidebar,
  render: (args) => ({
    components: {
      DpSlidebar,
    },
    setup() {
      return { args }
    },
    template: `
      <dp-slidebar 
        style="position: static !important; left: 0 !important;" 
        v-bind="args"
        @close="args.close">
        Example slidebar content
      </dp-slidebar>
    `,
  })
}

export default meta
type Story = StoryObj<IDpSlidebar>

export const Default: Story = {
  args: {},
  argTypes: {
    close: { 
      action: 'close',
      description: 'Event emitted when close button is clicked'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default slidebar configuration with a close button'
      }
    }
  }
}