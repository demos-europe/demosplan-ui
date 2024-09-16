import type { Meta, StoryObj } from '@storybook/vue3'
import DpDraggable from './'

interface IDpDraggable {
    contentData: object[]
    'data:change': object
}

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
        template: `<dp-draggable v-bind="args" v-model="args.contentData" >
          <div
              class="o-sortablelist__item u-pv-0_5 u-pl-0_5 border--top"
              v-for="item in args.contentData"
              :key="item.id">
            {{ item.label }}
          </div>
        </dp-draggable>`,
    })
}

type Story = StoryObj<IDpDraggable>

export default meta

export const Default: Story = {
    args: {
        contentData: [
            { label: 'Content 1', id: '1' },
            { label: 'Content 2', id: '2' }
        ]
    },
    argTypes: {
        'data:change': { action: 'data:change' }
    }
}
