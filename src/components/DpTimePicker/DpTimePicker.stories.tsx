import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpTimePicker from './'

interface IDpTimePicker {
  id: string
  label?: string
  value?: string
  minuteSteps?: number
  minValue?: string
  disabled?: boolean
  dataCy?: string
  input: (value: string) => void
}

const meta: Meta<typeof DpTimePicker> = {
  component: DpTimePicker,
  title: 'Components/TimePicker',
  argTypes: {
    id: {
      control: 'text',
      description: 'ID attribute for the time picker element',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' }
      }
    },
    label: {
      control: 'text',
      description: 'Label text for the time picker',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '""' }
      }
    },
    value: {
      control: 'text',
      description: 'Current time value in HH:MM format',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '"00:00"' }
      }
    },
    minuteSteps: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Interval between available minute options',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '15' }
      }
    },
    minValue: {
      control: 'text',
      description: 'Minimum allowed time value in HH:MM format',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '""' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the time picker is disabled',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    dataCy: {
      control: 'text',
      description: 'Data-cy attribute for testing',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '"timePicker"' }
      }
    },
    input: {
      description: 'Event emitted when the time value changes',
      table: { type: { summary: 'event' } }
    }
  }
}

export default meta
type Story = StoryObj<IDpTimePicker>

export const Default: Story = {
  args: {
    id: 'timePicker1',
    value: '09:00'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default time picker with 15-minute intervals'
      }
    }
  }
}

export const CustomMinuteSteps: Story = {
  args: {
    id: 'timePicker2',
    value: '10:30',
    minuteSteps: 5
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with 5-minute intervals instead of the default 15 minutes'
      }
    }
  }
}

export const WithLabel: Story = {
  args: {
    id: 'timePicker3',
    label: 'Meeting Start Time',
    value: '14:00'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with a descriptive label'
      }
    }
  }
}

export const WithMinValue: Story = {
  args: {
    id: 'timePicker4',
    label: 'Select Time (after 13:30)',
    value: '14:00',
    minValue: '13:30'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with a minimum allowed time value of 13:30'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    id: 'timePicker5',
    label: 'Time (Disabled)',
    value: '16:45',
    disabled: true
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled time picker that cannot be edited'
      }
    }
  }
}