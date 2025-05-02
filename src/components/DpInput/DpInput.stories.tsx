import type { Meta, StoryObj } from '@storybook/vue3'
import DpInput from './'

interface IDpInput {
    ariaLabelledby: string | boolean
    autocomplete: string
    dataCounter: string
    dataCy: string
    dataDpValidateError: string
    dataDpValidateErrorFieldname: string
    dataDpValidateIf: string
    dataDpValidateShouldEqual: string
    disabled: boolean
    hasIcon: boolean
    id: string
    label: object
    maxlength: number
    minlength: number,
    name: string
    pattern: string
    placeholder: string
    preventDefaultOnEnter: boolean
    readonly: boolean
    required: boolean
    size: number | null
    type: string
    value: string
    width: string
    input: object
    blur: object
    focus: object
    enter: object
}

const meta: Meta<typeof DpInput> = {
    component: DpInput,
    title: "Components/Input"
}

export default meta

type Story = StoryObj<IDpInput>

export const Default: Story = {
    args: {
        id: 'inputId',
    },
    argTypes: {
        input: { action: 'input' },
        blur: { action: 'blur' },
        focus: { action: 'focus' },
        enter: { action: 'enter' }
    }
}
