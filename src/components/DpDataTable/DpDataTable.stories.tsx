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
            },
            {
                colClass: "u-1-of-2",
                field: false,
                label: false
            }
        ],
        items: [
            {
                id: 'name',
                name: 'Name'
            },
            {
                id: 'login',
                name: 'Login'
            },
            {
                id: 'email',
                name: 'E-Mail'
            }
        ],
        trackBy: 'ID'
    }
}
