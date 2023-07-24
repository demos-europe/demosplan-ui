import type { Meta, StoryObj } from '@storybook/vue'

import DpSlidebar from './DpSlidebar.vue'

const meta: Meta<typeof DpSlidebar> = {
    title: 'DpSlidebar',
    component: DpSlidebar,
    argTypes: {
        default: {
            control: 'text',
            description: 'Slot content',
            defaultValue: 'DpSlidebar'
        },
        'close': { action: 'close' }
    }
}

export default meta
type Story = StoryObj<typeof DpSlidebar>

export const Default: Story = {
    args: {
        noEvent: true
    },
    components: { DpSlidebar },
    template: '<dp-slidebar @close="close" v-bind="$props" ><p>Test</p></dp-slidebar>',
}
