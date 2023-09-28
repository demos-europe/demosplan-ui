import type { Meta, StoryObj } from '@storybook/vue'
import DpSlidebar from './'

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

interface IDpSlidebar {
    close: object
}

type Story = StoryObj<IDpSlidebar>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        close: { action: 'close' }
    }
}
