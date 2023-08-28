import type { Meta, StoryObj } from '@storybook/vue'
import DpResettableInput from './DpResettableInput.vue'

const meta: Meta<typeof DpResettableInput> = {
    component: DpResettableInput,
    title: "Components/ResettableInput",
    argTypes: {
        'blur': { action: 'blur' },
        'input': { action: 'input' },
        'enter': { action: 'enter' },
        'focus': { action: 'focus' },
        'reset': { action: 'reset' },
    }
}

export default meta
type Story = StoryObj<typeof DpResettableInput>

export const Default: Story = {
    args: {
        id: 'ID',
    }
}
