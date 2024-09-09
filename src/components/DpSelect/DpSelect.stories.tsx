import type { Meta, StoryObj } from '@storybook/vue3'
import DpSelect from './'

const meta: Meta<typeof DpSelect> = {
    component: DpSelect,
    title: "Components/Select"
}

interface IDpSelect {
    options: object[]
    select: object
}

type Story = StoryObj<IDpSelect>

export default meta

export const Default: Story = {
    args: {
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
        ]
    },
    argTypes: {
        select: { action: 'select' }
    }
}
