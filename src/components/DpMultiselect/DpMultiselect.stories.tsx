import type { Meta, StoryObj } from '@storybook/vue'
import DpMultiselect from './'

const meta: Meta<typeof DpMultiselect> = {
    component: DpMultiselect,
    title: "Components/Multiselect",
}

interface IDpMultiselect {
    required: boolean
    options: string[]
    close: object
    input: object
    open: object
    remove: object
    searchChange: object
    select: object
    selectAll: object
    unselectAll: object
}

export default meta
type Story = StoryObj<IDpMultiselect>

export const Default: Story = {
    args: {
        required: true,
        options: ['option 1', 'option 2']
    },
    argTypes: {
        close: { action: 'close' },
        input: { action: 'input' },
        open: { action: 'open' },
        remove: { action: 'remove' },
        searchChange: { action: 'searchChange' },
        select: { action: 'select' },
        selectAll: { action: 'selectAll' },
        unselectAll: { action: 'unselectAll' },
    }
}
