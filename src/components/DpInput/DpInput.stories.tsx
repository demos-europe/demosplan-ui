import type { Meta, StoryObj } from '@storybook/vue3'
import DpInput from './'
import DpIcon from '~/components/DpIcon'

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
    rounded: string
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
        id: 'DefaultInput'
    }
}

export const LabelOptions: Story = {
    args: {
        id: 'LabelOptions',
        label: {
            hint: 'This is a hint that explains what to enter in the input',
            text: 'Contact person',
            tooltip: 'This is a text adding some more information on the input field'
        },
        width: 'u-1-of-2'
    }
}

/**
 * Shows required and disabled inputs
 */
export const InputStates: Story = {
    render: () => ({
        components: { DpInput },
        template: `
            <div class="space-y-4">
                <DpInput
                    id="InputStatesRequired"
                    :label="{ text: 'Phone' }"
                    pattern="^(\\+?)(-| |[0-9]|\\(|\\))*$"
                    required
                    type="tel"
                    width="u-1-of-2"
                />

                <DpInput
                    disabled
                    id="InputStatesDisabled"
                    :label="{ text: 'Email address (disabled)' }"
                    type="email"
                    value="yourEmail@example.com"
                    width="u-1-of-2"
                />

                <DpInput
                    id="InputStatesReadonly"
                    :label="{ text: 'Username (readonly)' }"
                    readonly
                    value="username123"
                    width="u-1-of-2"
                />
            </div>
        `
    })
}

/**
 * Shows a placeholder when the input field is empty
 */
export const WithPlaceholder: Story = {
    args: {
        id: 'inputId-Placeholder',
        label: {
            text: 'Search'
        },
        placeholder: 'Type to search...',
        width: 'u-1-of-3'
    }
}

/**
 * Demonstrates input with length constraints and automatic hint
 */
export const WithLengthConstraints: Story = {
    args: {
        id: 'inputId-Length',
        label: {
            text: 'Username'
        },
        minlength: 3,
        maxlength: 20,
        value: 'user',
        width: 'u-1-of-3'
    }
}

/**
 * Input with icon space (hasIcon prop)
 */
export const WithIconSpace: Story = {
    args: {
        id: 'inputId-WithIcon',
        label: {
            text: 'Search with icon space'
        },
        placeholder: 'Search...',
        hasIcon: true,
        width: 'u-1-of-3'
    },
    render: (args) => ({
        components: { DpIcon, DpInput },
        setup() {
            return { args };
        },
        template: `
            <div class="relative">
                <DpInput v-bind="args" />
                <DpIcon icon="search" class="absolute right-2 bottom-1" />
            </div>
        `
    })
}
