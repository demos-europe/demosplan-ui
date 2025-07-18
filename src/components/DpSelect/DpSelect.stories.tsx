import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpSelect from './'

interface IDpSelect {
  classes?: string | string[]
  dataCy?: string
  dataDpValidateErrorFieldname?: string
  disabled?: boolean
  id?: string
  label?: {
    text?: string
    hint?: string
    bold?: boolean
    tooltip?: string
  }
  name?: string
  options: Array<{
    label: string
    value: string
  }>
  required?: boolean
  showPlaceholder?: boolean
  selected?: string
  select?: (value: string) => void
}

const meta: Meta<typeof DpSelect> = {
  component: DpSelect,
  title: "Components/Select",
  parameters: {
    docs: {
      description: {
        component: 'A dropdown select component for selecting a value from a list of options.'
      }
    }
  },
  render: (args) => ({
    components: { DpSelect },
    setup() {
      // Create reactive state for select value
      const selectedValue = ref(args.selected || '')
      
      // Handle select event
      const handleSelect = (value) => {
        selectedValue.value = value
        args.select?.(value)
      }
      
      return {
        args,
        selectedValue,
        handleSelect
      }
    },
    template: `
      <dp-select
        v-model="selectedValue"
        :classes="args.classes"
        :data-cy="args.dataCy"
        :data-dp-validate-error-fieldname="args.dataDpValidateErrorFieldname"
        :disabled="args.disabled"
        :id="args.id"
        :label="args.label"
        :name="args.name"
        :options="args.options"
        :required="args.required"
        :show-placeholder="args.showPlaceholder"
        @select="handleSelect" />
    `
  })
}

export default meta
type Story = StoryObj<IDpSelect>

export const Default: Story = {
  args: {
    id: 'default-select',
    label: {
      text: 'Select an option'
    },
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ],
    selected: ''
  },
  argTypes: {
    select: { action: 'select' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic select component with a placeholder and multiple options.'
      }
    }
  }
}

export const Required: Story = {
  args: {
    id: 'required-select',
    label: {
      text: 'Required selection'
    },
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ],
    required: true
  },
  argTypes: {
    select: { action: 'select' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Required select field with asterisk in the label.'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    id: 'disabled-select',
    label: {
      text: 'Disabled select'
    },
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ],
    disabled: true
  },
  argTypes: {
    select: { action: 'select' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled select field that cannot be interacted with.'
      }
    }
  }
}

export const Selected: Story = {
  args: {
    id: 'preselected-select',
    label: {
      text: 'Preselected option'
    },
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ],
    selected: '2'
  },
  argTypes: {
    select: { action: 'select' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a preselected option.'
      }
    }
  }
}
