import type { Meta, StoryObj } from '@storybook/vue3'
import DpRadio from './'

const meta: Meta<typeof DpRadio> = {
    component: DpRadio,
    title: "Components/Radio"
}

interface IDpRadio {
    id: string
    change: object
}

type Story = StoryObj<IDpRadio>

export default meta

export const Default: Story = {
    args: {
        id: 'radioId'
    },
    argTypes: {
        change: { action: 'change' }
    }
}
