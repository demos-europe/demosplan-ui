import type { Meta, StoryObj } from '@storybook/vue'
import DpSelect from './DpSelect.vue'

const meta: Meta<typeof DpSelect> = {
    component: DpSelect,
    title: "Components/Select",
    argTypes: {
        'select': { action: 'select' }
    }
}

interface IDpSelect {
    options: object[]
}

export default meta
type Story = StoryObj<IDpSelect>

export const Default: Story = {
    args: {
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
        ]
    }
}
