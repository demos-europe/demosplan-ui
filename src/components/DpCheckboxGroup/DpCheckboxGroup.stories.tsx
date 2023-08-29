import type { Meta, StoryObj } from '@storybook/vue'
import DpCheckboxGroup from './DpCheckboxGroup.vue'

const meta: Meta<typeof DpCheckboxGroup> = {
    component: DpCheckboxGroup,
    title: "Components/CheckboxGroup",
}

interface IDpCheckboxGroup {
    options: { id: string, label: string, name: string }[]
    label: string
    inline: boolean
    selectedOptions: object
    update: object
}
type Story = StoryObj<IDpCheckboxGroup>

export default meta

export const Default: Story = {
    args: {
        options: [
            { id: 'option-1-id', label: 'option 1', name: 'option-1' },
            { id: 'option-2-id', label: 'option 2', name: 'option-2' },
        ]
    },
    argTypes: {
        update: { action: 'update' }
    }
}
