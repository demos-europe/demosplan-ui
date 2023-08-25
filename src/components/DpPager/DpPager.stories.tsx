import type { Meta, StoryObj } from '@storybook/vue'
import DpPager from './DpPager.vue'

const meta: Meta<typeof DpPager> = {
    component: DpPager,
    title: "Components/Pager",
    argTypes: {
        'pageChange': { action: 'pageChange' },
        'sizeChange': { action: 'sizeChange' }
    }
}

export default meta
type Story = StoryObj<typeof DpPager>

export const Default: Story = {
    args: {}
}
