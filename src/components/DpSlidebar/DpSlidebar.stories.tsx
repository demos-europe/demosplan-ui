import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpSlidebar from './'

interface IDpSlidebar {
  open?: boolean
  close?: (event: Event) => void
}

const meta: Meta<typeof DpSlidebar> = {
  title: 'Components/Slidebar',
  component: DpSlidebar,
  render: (args) => ({
    components: {
      DpSlidebar,
    },
    setup() {
      const isOpen = ref(args.open ?? false)

      const handleClose = (event) => {
        args.close?.(event)
      }

      return { args, isOpen, handleClose }
    },
    template: `
      <div>
        <button type="button" @click="isOpen = true">Open slidebar</button>
        <dp-slidebar
          style="position: static !important; left: 0 !important;"
          v-model:open="isOpen"
          @close="handleClose">
          Example slidebar content
        </dp-slidebar>
      </div>
    `,
  })
}

export default meta
type Story = StoryObj<IDpSlidebar>

export const Default: Story = {
  args: {
    open: false,
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Initial open/closed state, bound via v-model:open',
    },
    close: {
      action: 'close',
      description: 'Emitted alongside update:open when the slidebar closes (close button, Escape, or swipe)',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click "Open slidebar" to slide it in; close it via the close button or the Escape key.'
      }
    }
  }
}