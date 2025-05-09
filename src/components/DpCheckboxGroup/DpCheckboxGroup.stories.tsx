import type { Meta, StoryObj } from '@storybook/vue3'
import DpCheckboxGroup from './'

interface CheckboxOption {
  id: string
  label: string
  name?: string
}

interface IDpCheckboxGroup {
  options: CheckboxOption[]
  label?: string
  inline?: boolean
  selectedOptions?: Record<string, boolean>
  dataCy?: string
  update?: (selected: Record<string, boolean>) => void
}

const meta: Meta<typeof DpCheckboxGroup> = {
  component: DpCheckboxGroup,
  title: "Components/CheckboxGroup",
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of checkbox options with id, label, and optional name'
    },
    label: {
      control: 'text',
      description: 'Label for the checkbox group'
    },
    inline: {
      control: 'boolean',
      description: 'Whether to display checkboxes inline'
    },
    selectedOptions: {
      control: 'object',
      description: 'Object with pre-selected checkbox options'
    },
    update: {
      action: 'update',
      description: 'Event emitted when selections change'
    },
    dataCy: {
      control: 'text',
      description: 'Data attribute for Cypress testing'
    }
  }
}

export default meta

type Story = StoryObj<IDpCheckboxGroup>

/**
 * Creates a set of checkbox options with unique IDs for each story
 * @param prefix Story-specific prefix for the IDs
 * @returns Array of checkbox options
 */
const createOptions = (prefix: string) => [
  { id: `${prefix}-option-1`, label: 'Option 1', name: `${prefix}-option-1` },
  { id: `${prefix}-option-2`, label: 'Option 2', name: `${prefix}-option-2` },
  { id: `${prefix}-option-3`, label: 'Option 3', name: `${prefix}-option-3` }
];

export const Default: Story = {
  args: {
    options: createOptions('default')
  }
}

export const Inline: Story = {
  args: {
    options: createOptions('inline'),
    inline: true
  }
}

export const WithLabel: Story = {
  args: {
    options: createOptions('with-label'),
    label: 'Select your preferences'
  }
}
