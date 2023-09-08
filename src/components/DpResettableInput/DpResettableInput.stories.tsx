import type { Meta, StoryObj } from '@storybook/vue'
import DpResettableInput from './'

const meta: Meta<typeof DpResettableInput> = {
    component: DpResettableInput,
    title: "Components/ResettableInput"
}

interface IDpResettableInput {
    blur: object
    id: string
    input: object
    enter: object
    focus: object
    reset: object
}

type Story = StoryObj<IDpResettableInput>

export default meta

export const Default: Story = {
    args: {
        id: 'ID',
    },
    argTypes: {
        blur: { action: 'blur' },
        input: { action: 'input' },
        enter: { action: 'enter' },
        focus: { action: 'focus' },
        reset: { action: 'reset' },
    }
}
