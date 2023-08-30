import type { Meta, StoryObj } from '@storybook/vue'

import DpCheckbox from './DpCheckbox.vue'

const meta: Meta<typeof DpCheckbox> = {
    component: DpCheckbox,
    title: "Components/Checkbox"
}

interface IDpCheckbox {
    change: object
    checked: boolean
    dataCy: string
    dataDpValidateErrorFieldname: string
    disabled: boolean
    id: string
    label: object
    name:  string
    readonly: boolean
    required: boolean
    valueToSend: string
}
export default meta

type Story = StoryObj<IDpCheckbox>

export const Default: Story = {
    args: {
        id: 'checkboxId',
        label: {
            text: 'Checkbox label'
        }
    },
    argTypes: {
        change: { action: 'change' }
    }
}
