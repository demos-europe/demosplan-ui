import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpToggle from './'

interface IDpToggle {
  modelValue: boolean
  disabled: boolean
  'update:modelValue': (value: boolean) => void
}

const meta: Meta<typeof DpToggle> = {
  component: DpToggle,
  title: 'Components/Toggle',
  argTypes: {
    modelValue: {
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
    'onUpdate:modelValue': {
      description: 'Event emitted when the toggle state changes',
      table: { type: { summary: 'event' } }
    }
  }
}

export default meta
type Story = StoryObj<IDpToggle>

export const Default: Story = {
  args: {
    modelValue: false,
    disabled: false
  },
  argTypes: {
    'update:modelValue': { action: 'update:modelValue' }
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
    modelValue: false,
    disabled: true
  },
  argTypes: {
    'update:modelValue': { action: 'update:modelValue' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle component that cannot be interacted with'
      }
    }
  }
}
