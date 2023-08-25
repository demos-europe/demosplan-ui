import type { Meta, StoryObj } from '@storybook/vue'

import DpInput from './DpInput.vue'

const meta: Meta<typeof DpInput> = {
    component: DpInput,
    title: "Components/Input",
    argTypes: {
        'input': { action: 'input' },
        'blur': { action: 'blur' },
        'focus': { action: 'focus' },
        'enter': { action: 'enter' }
    }
}

export default meta
type Story = StoryObj<typeof DpInput>

export const Default: Story = {
    args: {
        id: 'inputId',
    }
}
