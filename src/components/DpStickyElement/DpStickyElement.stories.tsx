import type { Meta, StoryObj } from '@storybook/vue'
import DpStickyElement from './DpStickyElement.vue'

const meta: Meta<typeof DpStickyElement> = {
    component: DpStickyElement,
    title: "Components/StickyElement",
    render: (args) => ({
        components: {
            DpStickyElement
        },
        setup() {
            return { args }
        },
        template: `<dp-sticky-element v-bind="args">
          <div>sticky content</div>
        </dp-sticky-element>`,
    })
}

type Story = StoryObj<typeof DpStickyElement>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {}
}
