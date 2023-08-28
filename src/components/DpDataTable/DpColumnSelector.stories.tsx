import type { Meta, StoryObj } from '@storybook/vue'
import DpColumnSelector from './DpColumnSelector.vue'

const meta: Meta<typeof DpColumnSelector> = {
    component: DpColumnSelector,
    title: "Components/ColumnSelector",
    argTypes: {
        'selectionChanged': { action: 'selectionChanged' }
    }
}

export default meta
type Story = StoryObj<typeof DpColumnSelector>

export const Default: Story = {
    args: {}
}
