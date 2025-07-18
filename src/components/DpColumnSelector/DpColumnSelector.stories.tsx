import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpColumnSelector from './'

type ColumnEntry = [string, string]; // [value, label]

interface IDpColumnSelector {
  selectableColumns?: ColumnEntry[]
  initialSelection?: string[]
  localStorageKey?: string
  useLocalStorage?: boolean
  dataCy?: string
  'selection-changed'?: (selection: string[]) => void
}

const meta: Meta<typeof DpColumnSelector> = {
  component: DpColumnSelector,
  title: "Components/ColumnSelector",
  argTypes: {
    selectableColumns: {
      control: 'object',
      description: 'Array of column entries as [value, label] tuples'
    },
    initialSelection: {
      control: 'object',
      description: 'Array of initially selected column values'
    },
    localStorageKey: {
      control: 'text',
      description: 'Key used for storing selection in localStorage'
    },
    useLocalStorage: {
      control: 'boolean',
      description: 'Whether to persist selection to localStorage'
    },
    'selection-changed': {
      action: 'selection-changed',
      description: 'Event emitted when selection changes'
    }
  }
}

export default meta

type Story = StoryObj<IDpColumnSelector>

export const Default: Story = {
  args: {
    selectableColumns: [
      ['title', 'Title'],
      ['author', 'Author'],
      ['year', 'Year'],
      ['genre', 'Genre'],
      ['price', 'Price']
    ]
  }
}

export const WithInitialSelection: Story = {
  args: {
    selectableColumns: [
      ['title2', 'Title'],
      ['author2', 'Author'],
      ['year2', 'Year'],
      ['genre2', 'Genre'],
      ['price2', 'Price']
    ],
    initialSelection: ['title2', 'author2', 'year2']
  }
}

export const WithLocalStorage: Story = {
  args: {
    selectableColumns: [
      ['title3', 'Title'],
      ['author3', 'Author'],
      ['year3', 'Year'],
      ['genre3', 'Genre'],
      ['price3', 'Price']
    ],
    initialSelection: ['title3', 'genre3'],
    useLocalStorage: true,
    localStorageKey: 'storybook-column-selection'
  }
}
