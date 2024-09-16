import type { Meta, StoryObj } from '@storybook/vue3'
import DpDataTable from './'

const meta: Meta<typeof DpDataTable> = {
    component: DpDataTable,
    title: "Components/DataTable"
}

interface IDpDataTable {
    changedOrder: object
    hasFlyout:boolean
    hasStickyHeader:boolean
    headerFields: object[]
    initSelectedItems: object[]
    isDraggable: boolean
    isExpandable: boolean
    isLoading: boolean
    isResizable: boolean
    isSelectable: boolean
    isSelectableName: string
    isTruncatable: boolean
    items: object[]
    itemsSelected: object
    itemsToggled: object
    multiPageAllSelected: boolean
    lockCheckboxBy: string
    multiPageSelectionItemsToggled: number
    multiPageSelectionItemsTotal: number
    selectAll: object
    searchString: string | null
    shouldBeSelectedItems: object
    tableClass: string
    tableDescription: string
    trackBy:string
    translations: object
}

type Story = StoryObj<IDpDataTable>

export default meta

export const Default: Story = {
    args: {
        headerFields: [
            {
                colClass: "u-1-of-2",
                field: "name",
                label: "Name"
            },
            {
                colClass: "u-1-of-2",
                field: "anzahl",
                label: "Anzahl"
            }
        ],
        items: [
            {
                id: 'name',
                name: 'Test 1',
                anzahl: "99"
            },
            {
                id: 'login',
                name: 'Test 2',
                anzahl: "60"
            },
            {
                id: 'email',
                name: 'Test 3',
                anzahl: "100"
            }
        ],
        trackBy: 'ID'
    },
    argTypes: {
        selectAll: { action: 'selectAll' },
        changedOrder: { action: 'changedOrder' },
        itemsSelected: { action: 'itemsSelected' },
        itemsToggled: { action: 'itemsToggled' },
    }
}
