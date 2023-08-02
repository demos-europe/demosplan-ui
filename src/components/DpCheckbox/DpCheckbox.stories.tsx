import type { Meta, StoryObj } from '@storybook/vue'

import DpCheckbox from './DpCheckbox.vue'

const meta: Meta<typeof DpCheckbox> = {
    component: DpCheckbox,
    title: "Components/Checkbox",
    argTypes: {
        'change': { action: 'change' }
    }
}

export default meta

type Story = StoryObj<typeof DpCheckbox>

export const Default: Story = {
    args: {
        id: 'checkboxId',
        label: {
            text: 'Checkbox label'
        }
    }
}
