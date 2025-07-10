import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpMultiselect from './'

interface IDpMultiselect {
  options: any[]
  value: any
  trackBy?: string
  multiple?: boolean
  allowEmpty?: boolean
  closeOnSelect?: boolean
  clearOnSelect?: boolean
  selectionControls?: boolean
  required?: boolean
  label?: string
  'input': (value: any) => void
  'close': () => void
  'open': () => void
  'remove': (value: any) => void
  'search-change': (query: string) => void
  'select': (option: any) => void
  'selectAll': () => void
  'deselectAll': () => void
}

const meta: Meta<typeof DpMultiselect> = {
  component: DpMultiselect,
  title: "Components/Multiselect",
  parameters: {
    docs: {
      description: {
        component: 'This is the generic multiselect functional component for vue instances. It is a wrapper for vue-multiselect.'
      }
    }
  },
  // Remove the directive from the component for Storybook
  render: (args) => ({
    components: { DpMultiselect },
    setup() {
      const { value, ...otherArgs } = args

      // Handle input changes (selection)
      const inputHandler = (newVal) => {
        args.input(newVal)
        // For Storybook controls to work with selection
        args.value = newVal
      }

      // Handle select all action
      const selectAllHandler = () => {
        // Call the original action handler
        args['selectAll']()

        // Set the value to all options
        if (args.multiple) {
          args.value = [...args.options];
        }
      }

      // Handle unselect all action
      const unselectAllHandler = () => {
        // Call the original action handler
        args['deselectAll']()

        // Clear the value
        args.value = args.multiple ? [] : ''
      }

      return {
        args,
        value,
        otherArgs,
        inputHandler,
        selectAllHandler,
        unselectAllHandler
      }
    },
    template: `
      <div>
        <dp-multiselect
          :options="args.options"
          :value="args.value"
          :track-by="args.trackBy"
          :multiple="args.multiple"
          :allow-empty="args.allowEmpty"
          :close-on-select="args.closeOnSelect"
          :clear-on-select="args.clearOnSelect"
          :selection-controls="args.selectionControls"
          :label="args.label"
          :required="args.required"
          @input="inputHandler"
          @close="args.close"
          @open="args.open"
          @remove="args.remove"
          @search-change="args['search-change']"
          @select="args.select"
          @selectAll="selectAllHandler"
          @deselectAll="unselectAllHandler" />
      </div>
    `
  })
}

export default meta
type Story = StoryObj<IDpMultiselect>

export const Default: Story = {
  args: {
    options: [
      { id: 1, name: 'First Option' },
      { id: 2, name: 'Second Option' },
      { id: 3, name: 'Third Option' }
    ],
    value: { id: 2, name: 'Second Option' },
    trackBy: 'id',
    label: 'name'
  },
  argTypes: {
    'input': { action: 'input' },
    'select': { action: 'select' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiselect with object options using trackBy'
      }
    }
  }
}

export const MultipleSelection: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
    value: ['Option 1', 'Option 3'],
    multiple: true,
    closeOnSelect: false
  },
  argTypes: {
    'input': { action: 'input' },
    'select': { action: 'select' },
    'remove': { action: 'remove' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection enabled with closeOnSelect=false to allow selecting multiple options in succession'
      }
    }
  }
}

export const WithSelectionControls: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
    value: ['Option 2'],
    multiple: true,
    selectionControls: true
  },
  argTypes: {
    'input': { action: 'input' },
    'selectAll': { action: 'selectAll' },
    'deselectAll': { action: 'deselectAll' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiselect with selection controls to select or deselect all options at once'
      }
    }
  }
}
