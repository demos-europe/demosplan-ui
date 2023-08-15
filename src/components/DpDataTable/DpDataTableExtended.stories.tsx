import type { Meta, StoryObj } from '@storybook/vue'
import DpDataTableExtended from './DpDataTableExtended.vue'

const meta: Meta<typeof DpDataTableExtended> = {
    component: DpDataTableExtended,
    title: "Components/DataTableExtended",
    argTypes: {
        'updated:filteredItems': { action: 'updated:filteredItems' },
        'updated:onPageItems': { action: 'updated:onPageItems' },
        'itemsSelected': { action: 'itemsSelected' },
        'updated:sortOrder': { action: 'updated:sortOrder' },
    }
}

export default meta
type Story = StoryObj<typeof DpDataTableExtended>

export const Default: Story = {
    args: {

    }
}
