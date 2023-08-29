import type { Meta, StoryObj } from '@storybook/vue'
import DpSelect from './DpSelect.vue'

const meta: Meta<typeof DpSelect> = {
    component: DpSelect,
    title: "Components/Select"
}

interface IDpSelect {
    options: object[],
    select: object
}

export default meta
type Story = StoryObj<IDpSelect>

export const Default: Story = {
    args: {
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
        ]
    },
    argTypes: {
        'select': { action: 'select' }
    }
}
