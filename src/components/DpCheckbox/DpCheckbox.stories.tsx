import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpCheckbox from './'

interface CheckboxLabel {
  text: string
  hint?: string
  tooltip?: string
  bold?: boolean
}

interface IDpCheckbox {
  change?: (checked: boolean) => void
  checked?: boolean
  dataCy?: string
  dataDpValidateErrorFieldname?: string
  disabled?: boolean
  id: string
  label: CheckboxLabel
  name?: string
  readonly?: boolean
  required?: boolean
  valueToSend?: string
}

const meta: Meta<typeof DpCheckbox> = {
  component: DpCheckbox,
  title: "Components/Checkbox",
  argTypes: {
    change: { 
      action: 'change',
      description: 'Event emitted when checkbox state changes'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    id: {
      control: 'text',
      description: 'ID for the checkbox input'
    },
    label: {
      control: 'object',
      description: 'Label configuration for the checkbox'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the checkbox is readonly'
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required'
    }
  }
}

export default meta

type Story = StoryObj<IDpCheckbox>

export const Default: Story = {
  args: {
    id: 'checkboxId',
    label: {
      text: 'Checkbox label'
    }
  }
}

export const Disabled: Story = {
  args: {
    id: 'disabledCheckboxId',
    label: {
      text: 'Disabled checkbox'
    },
    disabled: true
  }
}

export const Checked: Story = {
  args: {
    id: 'checkedCheckboxId',
    label: {
      text: 'Checked checkbox'
    },
    checked: true
  }
}

export const Required: Story = {
  args: {
    id: 'requiredCheckboxId',
    label: {
      text: 'Required checkbox'
    },
    required: true
  }
}

export const Hint: Story = {
  args: {
    id: 'hintCheckboxId',
    label: {
      text: 'Checkbox with hint',
      hint: "This is a hint text that provides additional information"
    }
  }
}

export const Tooltip: Story = {
  args: {
    id: 'tooltipCheckboxId',
    label: {
      text: 'Checkbox with tooltip',
      tooltip: "This tooltip explains the purpose of this checkbox"
    }
  }
}
