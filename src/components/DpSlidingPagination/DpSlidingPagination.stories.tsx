import type { Meta, StoryObj } from '@storybook/vue'
import DpSlidingPagination from './'

const meta: Meta<typeof DpSlidingPagination> = {
    component: DpSlidingPagination,
    title: 'Components/SlidingPagination'
}

interface IDpSelect {
    current: number
    total: number
    pageChange: object
}

type Story = StoryObj<IDpSelect>

export default meta

export const Default: Story = {
    args: {
        current: 2,
        total: 10,
    },
    argTypes: {
        pageChange: { action: 'pageChange' }
    }
}
