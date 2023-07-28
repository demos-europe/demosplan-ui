import type { Meta, StoryObj } from '@storybook/vue'

import DpButton from './DpButton.vue'

const meta: Meta<typeof DpButton> = {
    component: DpButton,
    title: "Components/Button"
}

export default meta
type Story = StoryObj<typeof DpButton>

export const Default: Story = {
    args: {
        busy: false,
        color: 'primary',
        hideText: false,
        icon: '',
        iconSize: 'small',
        rounded: false,
        text: 'save',
        type: 'button',
        variant: 'solid'
    }
}
