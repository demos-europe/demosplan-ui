import type { Meta, StoryObj } from '@storybook/vue'
import DpTabs from './'
import DpTab from './DpTab.vue'

const meta: Meta<typeof DpTabs> = {
    component: DpTabs,
    title: "Components/Tabs",
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

interface IDpTabs {
    change: object
}

type Story = StoryObj<IDpTabs>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        change: { action: 'change' }
    },
}
