import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpAutocomplete from './'

const meta: Meta<typeof DpAutocomplete> = {
  component: DpAutocomplete,
  title: 'Components/Autocomplete',
  parameters: {
    actions: { disable: true },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the input (required)'
    },
    modelValue: {
      control: 'text',
      description: 'Current value of the input (v-model)'
    },
    options: {
      control: 'object',
      description: 'Array of suggestion options to display in dropdown'
    },
    label: {
      control: 'text',
      description: 'Property name from options objects to display (default: "label")'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input'
    },
    minChars: {
      control: 'number',
      description: 'Minimum characters before showing suggestions (default: 3)'
    },
    searchButton: {
      control: 'boolean',
      description: 'Show search button inside input (default: true)'
    },
    searchButtonText: {
      control: 'text',
      description: 'Aria-label and title for icon-only search button'
    },
    noResultsText: {
      control: 'text',
      description: 'Text to display when no results match'
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for reset functionality'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    rounded: {
      control: 'select',
      options: ['full', 'left', 'right'],
      description: 'Border radius style (default: "full")'
    },
    ariaLabelledby: {
      control: 'text',
      description: 'ID of element that labels this input'
    },
    dataCy: {
      control: 'text',
      description: 'Cypress test identifier'
    },
    routeGenerator: {
      control: false,
      description: 'Function that generates the API route for fetching suggestions (required)'
    }
  }
}

export default meta

type Story = StoryObj<{
  id: string
  modelValue: string
  label: string
  placeholder: string
  options: Array<Record<string, unknown>>
  minChars: number
  searchButton: boolean
  routeGenerator: (query: string) => string
}>

const mockOptions = [
  { label: 'Apple', value: 'apple', id: 1 },
  { label: 'Banana', value: 'banana', id: 2 },
  { label: 'Cherry', value: 'cherry', id: 3 },
  { label: 'Dragon Fruit', value: 'dragon-fruit', id: 4 },
  { label: 'Elderberry', value: 'elderberry', id: 5 }
]

export const Default: Story = {
  args: {
    id: 'autocomplete-default',
    modelValue: '',
    label: 'label',
    placeholder: 'Start typing to see suggestions...',
    options: mockOptions,
    minChars: 3,
    searchButton: true,
    routeGenerator: (query: string) => `/api/suggestions?q=${encodeURIComponent(query)}`
  },
  render: (args) => ({
    components: { DpAutocomplete },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md h-[200px]">
        <DpAutocomplete v-bind="args" />
      </div>
    `
  })
}

export const WithoutSearchButton: Story = {
  args: {
    ...Default.args,
    id: 'autocomplete-no-search',
    searchButton: false,
    placeholder: 'Autocomplete without search button...'
  },
  render: Default.render
}

export const CustomMinChars: Story = {
  args: {
    ...Default.args,
    id: 'autocomplete-min-chars',
    minChars: 1,
    placeholder: 'Shows suggestions after 1 character...'
  },
  render: Default.render
}

export const WithCustomSlot: Story = {
  args: {
    ...Default.args,
    id: 'autocomplete-custom',
    options: [
      { label: 'Berlin', country: 'Germany', population: 3669491, id: 1 },
      { label: 'Munich', country: 'Germany', population: 1484226, id: 2 },
      { label: 'Hamburg', country: 'Germany', population: 1906411, id: 3 }
    ]
  },
  render: (args) => ({
    components: { DpAutocomplete },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md h-[200px]">
        <DpAutocomplete v-bind="args">
          <template #option="{ option }">
            <div class="flex justify-between items-center w-full">
              <div>
                <strong>{{ option.label }}</strong>
                <div class="text-sm text-gray-500">{{ option.country }}</div>
              </div>
              <div class="text-sm text-gray-400">
                {{ option.population.toLocaleString() }}
              </div>
            </div>
          </template>
        </DpAutocomplete>
      </div>
    `
  })
}

export const KeyboardNavigation: Story = {
  args: {
    ...Default.args,
    id: 'autocomplete-keyboard',
    modelValue: 'a',
    minChars: 1,
    placeholder: 'Try keyboard navigation...',
    options: [
      { label: 'Apple - Use Arrow Up/Down to navigate', value: 'apple', id: 1 },
      { label: 'Banana - Use Home/End for quick jumping', value: 'banana', id: 2 },
      { label: 'Cherry - Use Enter to select', value: 'cherry', id: 3 },
      { label: 'Dragon Fruit - Use Escape to close', value: 'dragon-fruit', id: 4 },
      { label: 'Elderberry - Use Tab to exit', value: 'elderberry', id: 5 }
    ]
  },
  render: (args) => ({
    components: { DpAutocomplete },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-lg">
        <h3 class="text-lg font-semibold mb-2">Keyboard Navigation Demo</h3>
        <p class="text-sm text-gray-600 mb-4">
          <strong>Click inside the input first to focus it</strong>, then try keyboard controls:
        </p>
        <ul class="text-sm text-gray-600 mb-4 space-y-1">
          <li><strong>↑↓</strong> Navigate suggestions</li>
          <li><strong>Home/End</strong> Jump to first/last</li>
          <li><strong>Enter</strong> Select highlighted option</li>
          <li><strong>Escape</strong> Close dropdown</li>
          <li><strong>Tab</strong> Move to next element</li>
        </ul>
        <DpAutocomplete v-bind="args" />
        <p class="text-xs text-gray-500 mt-2">
          Screen readers will announce suggestion count and position.
        </p>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Focus me to test Tab behavior
        </button>
      </div>
    `
  })
}
