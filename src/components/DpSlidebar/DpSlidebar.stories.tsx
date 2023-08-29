import type { Meta, StoryObj } from '@storybook/vue'
import DpSlidebar from './DpSlidebar.vue'

const meta: Meta<typeof DpSlidebar> = {
    title: 'Components/Slidebar',
    component: DpSlidebar,
    argTypes: {
        'close': { action: 'close' }
    },
    render: (args) => ({
        components: {
            DpSlidebar,
        },
        setup() {
            return { args }
        },
        template: `<dp-slidebar style="position: static !important; left: 0 !important;" v-bind="args">
        Test
        </dp-slidebar>`,
    })
}

export default meta
type Story = StoryObj<typeof DpSlidebar>

export const Default: Story = {
    args: {}
}
