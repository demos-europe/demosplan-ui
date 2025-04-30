import type { Meta, StoryObj } from '@storybook/vue3'
import DpDataTable from './'

interface HeaderField {
  field: string
  label: string
  colClass?: string
  tooltip?: string
  initialWidth?: string
  initialMaxWidth?: string
  initialMinWidth?: string
}

interface DataItem {
  [key: string]: any
}

interface IDpDataTable {
  headerFields: HeaderField[]
  items: DataItem[]
  trackBy: string
  hasFlyout?: boolean
  hasStickyHeader?: boolean
  initSelectedItems?: DataItem[]
  isDraggable?: boolean
  isExpandable?: boolean
  isLoading?: boolean
  isResizable?: boolean
  isSelectable?: boolean
  isSelectableName?: string
  isTruncatable?: boolean
  lockCheckboxBy?: string
  multiPageAllSelected?: boolean
  multiPageSelectionItemsToggled?: number
  multiPageSelectionItemsTotal?: number
  searchString?: string | null
  shouldBeSelectedItems?: Record<string, boolean>
  tableClass?: string
  tableDescription?: string
  translations?: Record<string, any>
  dataCy?: string
  'changed-order'?: (event: any, item: any) => void
  'items-selected'?: (items: string[]) => void
  'items-toggled'?: (items: {id: string}[], selected: boolean) => void
  'select-all'?: (selected: boolean) => void
}

const meta: Meta<typeof DpDataTable> = {
  component: DpDataTable,
  title: "Components/DataTable",
  argTypes: {
    headerFields: {
      control: 'object',
      description: 'Array of column header definitions with field, label and optional styling'
    },
    items: {
      control: 'object',
      description: 'Array of data objects to display in the table'
    },
    trackBy: {
      control: 'text',
      description: 'Property name to use as unique identifier for each item'
    },
    hasFlyout: {
      control: 'boolean',
      description: 'Whether to display a flyout menu for each row'
    },
    hasStickyHeader: {
      control: 'boolean',
      description: 'Whether to make the table header sticky during scrolling'
    },
    isExpandable: {
      control: 'boolean',
      description: 'Whether rows can be expanded to show additional content'
    },
    isSelectable: {
      control: 'boolean',
      description: 'Whether to display checkboxes for selecting rows'
    },
    tableClass: {
      control: 'text',
      description: 'Custom CSS class for the table element'
    },
    'items-selected': {
      action: 'items-selected',
      description: 'Event emitted when items are selected'
    },
    'select-all': {
      action: 'select-all',
      description: 'Event emitted when all items are selected or deselected'
    }
  }
}

export default meta

type Story = StoryObj<IDpDataTable>

const defaultHeaderFields: HeaderField[] = [
  {
    colClass: "u-1-of-2",
    field: "name",
    label: "Name"
  },
  {
    colClass: "u-1-of-2",
    field: "count",
    label: "Count"
  }
]

const defaultItems: DataItem[] = [
  {
    id: 'item1',
    name: 'Item 1',
    count: "99"
  },
  {
    id: 'item2',
    name: 'Item 2',
    count: "60"
  },
  {
    id: 'item3',
    name: 'Item 3',
    count: "100"
  }
]

export const Default: Story = {
  args: {
    headerFields: defaultHeaderFields,
    items: defaultItems,
    trackBy: 'id'
  }
}

export const WithSelection: Story = {
  args: {
    headerFields: defaultHeaderFields,
    items: defaultItems,
    trackBy: 'id',
    isSelectable: true
  }
}

export const WithFlyout: Story = {
  args: {
    headerFields: defaultHeaderFields,
    items: defaultItems,
    trackBy: 'id',
    hasFlyout: true
  },
  render: (args) => ({
    components: { DpDataTable },
    setup() {
      return { args }
    },
    template: `
      <dp-data-table v-bind="args">
        <template #flyout="item">
          <div class="p-2">
            <button class="mb-1 block">Edit</button>
            <button class="mb-1 block">Delete</button>
            <button class="block">Details</button>
          </div>
        </template>
      </dp-data-table>
    `
  })
}

export const WithExpandableRows: Story = {
  args: {
    headerFields: defaultHeaderFields,
    items: defaultItems,
    trackBy: 'id',
    isExpandable: true
  },
  render: (args) => ({
    components: { DpDataTable },
    setup() {
      return { args }
    },
    template: `
      <dp-data-table v-bind="args">
        <template #expandedContent="item">
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">Expanded details for {{ item.name }}</h3>
            <p>This is additional information that is shown when the row is expanded.</p>
            <p>ID: {{ item.id }}</p>
          </div>
        </template>
      </dp-data-table>
    `
  })
}

export const WithCustomStyling: Story = {
  args: {
    headerFields: [
      {
        field: "name",
        label: "Name",
        tooltip: "Full name of the item"
      },
      {
        field: "count",
        label: "Count"
      },
      {
        field: "status",
        label: "Status"
      }
    ],
    items: [
      {
        id: 'item1',
        name: 'Item 1',
        count: "99",
        status: "Active"
      },
      {
        id: 'item2',
        name: 'Item 2',
        count: "60",
        status: "Inactive"
      },
      {
        id: 'item3',
        name: 'Item 3',
        count: "100",
        status: "Pending"
      }
    ],
    trackBy: 'id',
    tableClass: 'c-data-table border-collapse',
    hasStickyHeader: true
  }
}
