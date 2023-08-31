import type { Meta, StoryObj } from '@storybook/vue'
import DpStickyElement from './DpStickyElement.vue'

interface IDpStickyElement {
    applyZIndex: boolean,
    border: boolean,
    context: HTMLElement,
    direction: 'top' | 'bottom',
    observeContext: boolean,
    offset: number
}

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

type Story = StoryObj<IDpStickyElement>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        direction: {
            control: { type: 'inline-radio' },
            options: ['top', 'bottom'],
        },
        offset: {
            control: { type: 'range', min: 0, max: 500, step: 1 },
        }
    },
}
