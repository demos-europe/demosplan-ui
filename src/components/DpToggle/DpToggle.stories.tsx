import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpToggle from './'

interface IDpToggle {
  value: boolean
  disabled: boolean
  input: (value: boolean) => void
}

const meta: Meta<typeof DpToggle> = {
  component: DpToggle,
  title: 'Components/Toggle',
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Current state of the toggle (true = on, false = off)',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    input: {
      description: 'Event emitted when the toggle state changes',
      table: { type: { summary: 'event' } }
    }
  }
}

export default meta
type Story = StoryObj<IDpToggle>

export const Default: Story = {
  args: {
    value: false,
    disabled: false
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default toggle component in the off state'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    value: false,
    disabled: true
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle component that cannot be interacted with'
      }
    }
  }
}
