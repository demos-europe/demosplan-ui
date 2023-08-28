import type { Meta, StoryObj } from '@storybook/vue'
import DpCheckboxGroup from './DpCheckboxGroup.vue'

const meta: Meta<typeof DpCheckboxGroup> = {
    component: DpCheckboxGroup,
    title: "Components/CheckboxGroup",
    argTypes: {
        'update': { action: 'update' }
    }
}

export default meta
type Story = StoryObj<typeof DpCheckboxGroup>

export const Default: Story = {
    args: {
        options: [
            { id: 'option-1-id', label: 'option 1', name: 'option-1' },
            { id: 'option-2-id', label: 'option 2', name: 'option-2' },
        ]
    }
}
