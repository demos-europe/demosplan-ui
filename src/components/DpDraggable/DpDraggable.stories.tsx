import type { Meta, StoryObj } from '@storybook/vue'
import DpDraggable from './DpDraggable.vue'

const meta: Meta<typeof DpDraggable> = {
    component: DpDraggable,
    title: "Components/Draggable",
    render: (args) => ({
        components: {
            DpDraggable,
        },
        setup() {
            return { args }
        },
        template: `<dp-draggable v-bind="args">
          <div class="o-sortablelist__item u-pv-0_5 u-pl-0_5 border--top">
            <p>Content 1</p>
          </div>
          <div class="o-sortablelist__item u-pv-0_5 u-pl-0_5 border--top">
            <p>Content 2</p>
          </div>
        </dp-draggable>`,
    })
}

interface IDpDraggable {
    contentData: string[]
    'data:change': object
}

type Story = StoryObj<IDpDraggable>

export default meta

export const Default: Story = {
    args: {
        contentData: ['Content 1', 'Content 2']
    },
    argTypes: {
        'data:change': { action: 'data:change' }
    }
}
