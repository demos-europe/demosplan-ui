import type { Meta, StoryObj } from '@storybook/vue3'
import DpPager from './'

const meta: Meta<typeof DpPager> = {
    component: DpPager,
    title: "Components/Pager"
}

interface IDpPager {
    pageChange: object
    sizeChange: object
}

type Story = StoryObj<IDpPager>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        pageChange: { action: 'pageChange' },
        sizeChange: { action: 'sizeChange' }
    }
}
