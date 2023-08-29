import type { Meta, StoryObj } from '@storybook/vue'
import DpMultistepNav from './DpMultistepNav.vue'

const meta: Meta<typeof DpMultistepNav> = {
    component: DpMultistepNav,
    title: "Components/MultistepNav"
}

interface IDpMultistepNav {
    changeStep: object
    steps: object[]
}

type Story = StoryObj<IDpMultistepNav>

export default meta

export const Default: Story = {
    args: {
        steps: [
            {
                label: 'my text here',
                title: 'In this step you can do this'
            },
            {
                label: 'this is the second step',
                title: 'In this step you can do that'
            }
        ]
    },
    argTypes: {
        changeStep: { action: 'changeStep' }
    }
}
