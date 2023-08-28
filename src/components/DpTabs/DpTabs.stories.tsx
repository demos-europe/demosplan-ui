import type { Meta, StoryObj } from '@storybook/vue'
import DpTabs from './DpTabs.vue'
import DpTab from './DpTab.vue'

const meta: Meta<typeof DpTabs> = {
    component: DpTabs,
    title: "Components/Tabs",
    argTypes: {
        'change': { action: 'change' }
    },
    render: (args) => ({
        components: {
            DpTabs,
            DpTab
        },
        setup() {
            return { args }
        },
        template: `<dp-tabs v-bind="args">
            <dp-tab
                id="idTab1"
                label="Tab Title 1">
                Tab content 1.
            </dp-tab>
            <dp-tab
                id="idTab2"
                label="Tab Title 2">
                Tab content 2.
            </dp-tab>
        </dp-tabs>`,
    })
}

export default meta
type Story = StoryObj<typeof DpTabs>

export const Default: Story = {
    args: {}
}
