import type { Meta, StoryObj } from '@storybook/vue'
import DpSearchField from './DpSearchField.vue'

const meta: Meta<typeof DpSearchField> = {
    component: DpSearchField,
    title: "Components/SearchField"
}

interface IDpAccordion {
    reset: object
    search: object
}

type Story = StoryObj<IDpAccordion>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        'reset': { action: 'reset' },
        'search': { action: 'search' }
    }
}
