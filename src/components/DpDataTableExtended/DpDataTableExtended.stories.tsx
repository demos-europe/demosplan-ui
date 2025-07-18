import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpDataTableExtended from './'

interface HeaderField {
  field: string
  label: string
  colClass?: string
  tooltip?: string
}

interface DataItem {
  [key: string]: any
}

interface IDpDataTableExtended {
  headerFields: HeaderField[]
  tableItems: DataItem[]
  trackBy?: string
  hasFlyout?: boolean
  isExpandable?: boolean
  isLoading?: boolean
  isResizable?: boolean
  isSelectable?: boolean
  isSortable?: boolean
  isTruncatable?: boolean
  initItemsPerPage?: number
  itemsPerPageOptions?: number[]
  lockCheckboxBy?: string
  defaultSortOrder?: { key: string, direction: number } | null
  translations?: Record<string, string>
  'items-selected'?: (items: string[]) => void
  'updated:filteredItems'?: (fields: HeaderField[]) => void
  'updated:onPageItems'?: (items: DataItem[]) => void
  'updated:sortOrder'?: (order: { key: string, direction: number }) => void
}

const meta: Meta<typeof DpDataTableExtended> = {
  component: DpDataTableExtended,
  title: "Components/DataTableExtended",
  argTypes: {
    headerFields: {
      control: 'object',
      description: 'Array of column header definitions with field, label and optional styling'
    },
    tableItems: {
      control: 'object',
      description: 'Array of data objects to display in the table'
    },
    trackBy: {
      control: 'text',
      description: 'Property name to use as unique identifier for each item',
      defaultValue: 'id'
    },
    hasFlyout: {
      control: 'boolean',
      description: 'Whether to display a flyout menu for each row'
    },
    isExpandable: {
      control: 'boolean',
      description: 'Whether rows can be expanded to show additional content'
    },
    isSelectable: {
      control: 'boolean',
      description: 'Whether to display checkboxes for selecting rows'
    },
    isSortable: {
      control: 'boolean',
      description: 'Whether columns can be sorted by clicking on headers'
    },
    initItemsPerPage: {
      control: 'number',
      description: 'Initial number of items to display per page',
      defaultValue: 50
    },
    itemsPerPageOptions: {
      control: 'object',
      description: 'Available options for items per page',
      defaultValue: [10, 50, 100, 200]
    },
    'items-selected': {
      action: 'items-selected',
      description: 'Event emitted when items are selected'
    }
  }
}

export default meta

type Story = StoryObj<IDpDataTableExtended>

const defaultHeaderFields: HeaderField[] = [
  {
    field: "name",
    label: "Name"
  },
  {
    field: "email",
    label: "Email"
  },
  {
    field: "role",
    label: "Role"
  }
]

const defaultItems: DataItem[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor'
  },
  {
    id: 'user3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer'
  },
  {
    id: 'user4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Editor'
  },
  {
    id: 'user5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Viewer'
  }
]

export const Default: Story = {
  args: {
    headerFields: defaultHeaderFields,
    tableItems: defaultItems,
    isSortable: true
  }
}

export const WithSelection: Story = {
  args: {
    headerFields: defaultHeaderFields,
    tableItems: defaultItems,
    isSelectable: true,
    isSortable: true
  }
}

export const WithCustomPaging: Story = {
  args: {
    headerFields: defaultHeaderFields,
    tableItems: [
      ...defaultItems,
      {
        id: 'user6',
        name: 'David Garcia',
        email: 'david.garcia@example.com',
        role: 'Admin'
      },
      {
        id: 'user7',
        name: 'Eva Martinez',
        email: 'eva.martinez@example.com',
        role: 'Editor'
      },
      {
        id: 'user8',
        name: 'Frank Thomas',
        email: 'frank.thomas@example.com',
        role: 'Viewer'
      }
    ],
    initItemsPerPage: 3,
    itemsPerPageOptions: [3, 5, 10],
    isSortable: true
  }
}

export const WithFooterActions: Story = {
  args: {
    headerFields: defaultHeaderFields,
    tableItems: defaultItems,
    isSelectable: true,
    isSortable: true
  },
  render: (args) => ({
    components: { DpDataTableExtended },
    setup() {
      return { args }
    },
    template: `
      <dp-data-table-extended v-bind="args" @items-selected="args['items-selected']">
        <template #footer>
          <div class="p-3 flex justify-end space-x-2">
            <button class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          </div>
        </template>
      </dp-data-table-extended>
    `
  })
}