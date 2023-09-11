import type { Meta, StoryObj } from '@storybook/vue'
import DpSearchField from './'

const meta: Meta<typeof DpSearchField> = {
    component: DpSearchField,
    title: 'Components/SearchField'
}

interface IDpSearchField {
    reset: object
    search: object
}

type Story = StoryObj<IDpSearchField>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        'reset': { action: 'reset' },
        'search': { action: 'search' }
    }
}
