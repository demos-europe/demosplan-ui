import type { Meta, StoryObj } from '@storybook/vue'
import DpDataTable from './DpDataTable.vue'

const meta: Meta<typeof DpDataTable> = {
    component: DpDataTable,
    title: "Components/DataTable",
    argTypes: {
        'selectAll': { action: 'selectAll' },
        'changedOrder': { action: 'changedOrder' },
        'itemsSelected': { action: 'itemsSelected' },
        'itemsToggled': { action: 'itemsToggled' },
    }
}

export default meta
type Story = StoryObj<typeof DpDataTable>

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
    }
}
