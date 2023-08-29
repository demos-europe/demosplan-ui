import type { Meta, StoryObj } from '@storybook/vue'
import DpSlidebar from './DpSlidebar.vue'

interface IDpSlidebar {
    close: object
}

const meta: Meta<typeof DpSlidebar> = {
    title: 'Components/Slidebar',
    component: DpSlidebar,
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
type Story = StoryObj<IDpSlidebar>

export const Default: Story = {
    args: {},
    argTypes: {
        'close': { action: 'close' }
    }
}
