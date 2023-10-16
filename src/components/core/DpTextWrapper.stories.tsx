import type { Meta, StoryObj } from '@storybook/vue'
import DpTextWrapper from './DpTextWrapper.vue'

const meta: Meta<typeof DpTextWrapper> = {
    component: DpTextWrapper,
    title: 'Components/TextWrapper',
    render: (args) => ({
        components: {
            DpTextWrapper
        },
        setup() {
            return { args }
        },
        template: `
          <dp-text-wrapper v-bind="args" text="add Text hier"/>
        `,
    })
}

interface IDpSwitcher {}

type Story = StoryObj<IDpSwitcher>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {}
}
