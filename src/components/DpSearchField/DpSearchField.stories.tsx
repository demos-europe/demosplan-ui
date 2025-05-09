import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import DpSearchField from './'

interface IDpSearchField {
  initSearchTerm?: string
  inputWidth?: string
  placeholder?: string
  'search'?: (term: string) => void
  'reset'?: () => void
}

const meta: Meta<typeof DpSearchField> = {
  component: DpSearchField,
  title: 'Components/SearchField',
  parameters: {
    docs: {
      description: {
        component: 'A search field component with a reset button and search button.'
      }
    }
  },
  render: (args) => ({
    components: { DpSearchField },
    setup() {
      // Create reactive state for tracking search operations
      const lastSearchTerm = ref('')

      // Handle search event
      const handleSearch = (term) => {
        lastSearchTerm.value = term
        args.search?.(term)
      }

      // Handle reset event
      const handleReset = () => {
        lastSearchTerm.value = ''
        args.reset?.()
      }

      return {
        args,
        lastSearchTerm,
        handleSearch,
        handleReset
      }
    },
    template: `
      <div>
        <dp-search-field
          :init-search-term="args.initSearchTerm"
          :input-width="args.inputWidth"
          :placeholder="args.placeholder"
          @search="handleSearch"
          @reset="handleReset" />
      </div>
    `
  })
}

export default meta
type Story = StoryObj<IDpSearchField>

export const Default: Story = {
  args: {
    initSearchTerm: 'Start typing to search',
    inputWidth: '',
    placeholder: 'search'
  },
  argTypes: {
    'reset': { action: 'reset' },
    'search': { action: 'search' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default search field with empty value. Type something and hit enter or click the search button to trigger a search.'
      }
    }
  }
}

export const WithInitialSearchTerm: Story = {
  args: {
    initSearchTerm: 'initial search',
    inputWidth: '',
    placeholder: 'search'
  },
  argTypes: {
    'reset': { action: 'reset' },
    'search': { action: 'search' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Search field initialized with a search term. Click the reset button to clear the field.'
      }
    }
  }
}
