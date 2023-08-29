import type { Meta, StoryObj } from '@storybook/vue'
import DpMultiselect from './DpMultiselect.vue'

const meta: Meta<typeof DpMultiselect> = {
    component: DpMultiselect,
    title: "Components/Multiselect",
    argTypes: {
        'close': { action: 'close' },
        'input': { action: 'input' },
        'open': { action: 'open' },
        'remove': { action: 'remove' },
        'searchChange': { action: 'searchChange' },
        'select': { action: 'select' },
        'selectAll': { action: 'selectAll' },
        'unselectAll': { action: 'unselectAll' },
    }
}

interface IDpMultiselect {
    required: boolean,
    options: string[]
}

export default meta
type Story = StoryObj<IDpMultiselect>

export const Default: Story = {
    args: {
        required: true,
        options: ['option 1', 'option 2']
    }
}
