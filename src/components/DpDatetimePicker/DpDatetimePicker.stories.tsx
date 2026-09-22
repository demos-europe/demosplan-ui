import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpDatetimePicker from './'

interface IDpDatetimePicker {
    id: string
    modelValue: string
    label?: string
    hint?: string
    dataCy?: string
    disabled?: boolean
    hiddenInput?: boolean
    name?: string
    required?: boolean
    minDate?: string
    maxDate?: string
    'onUpdate:modelValue'?: (value: string) => void
}

const meta: Meta<typeof DpDatetimePicker> = {
    component: DpDatetimePicker,
    title: "Components/DatetimePicker",
    argTypes: {
        id: {
            control: 'text',
            description: 'ID for the datetime picker component'
        },
        modelValue: {
            control: 'text',
            description: 'ISO datetime value (e.g., 2023-07-13T07:20:00.000Z)'
        },
        label: {
            control: 'text',
            description: 'Label displayed above the datetime picker'
        },
        hint: {
            control: 'text',
            description: 'Hint text displayed below the label'
        },
        minDate: {
            control: 'text',
            description: 'Minimum selectable date in format DD.MM.YYYY'
        },
        maxDate: {
            control: 'text',
            description: 'Maximum selectable date in format DD.MM.YYYY'
        },
        required: {
            control: 'boolean',
            description: 'Whether the field is required'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the field is disabled'
        },
        hiddenInput: {
            control: 'boolean',
            description: 'Add a hidden input field for form submissions'
        },
        name: {
            control: 'text',
            description: 'Name attribute for the hidden input field'
        },
        'onUpdate:modelValue': {
            action: 'update:modelValue',
            description: 'Event fired when datetime value changes'
        }
    }
}

export default meta

type Story = StoryObj<IDpDatetimePicker>

export const Default: Story = {
    args: {
        id: 'default-datetimepicker',
        modelValue: '2023-07-13T07:20:00.000Z'
    }
}

export const WithValue: Story = {
    args: {
        id: 'with-value-datetimepicker',
        modelValue: new Date().toISOString()
    }
}

export const WithRange: Story = {
    args: {
        id: 'with-range-datetimepicker',
        modelValue: '2023-07-13T07:20:00.000Z',
        minDate: '01.01.2023',
        maxDate: '31.12.2023'
    }
}

export const WithLabel: Story = {
    args: {
        id: 'with-label-datetimepicker',
        modelValue: '2023-07-13T07:20:00.000Z',
        label: 'Event date and time',
        hint: 'Please select when the event will start'
    }
}

export const Required: Story = {
    args: {
        id: 'required-datetimepicker',
        modelValue: '2023-07-13T07:20:00.000Z',
        label: 'Event date and time',
        required: true
    }
}

export const Disabled: Story = {
    args: {
        id: 'disabled-datetimepicker',
        modelValue: '2023-07-13T07:20:00.000Z',
        label: 'Event date and time',
        disabled: true
    }
}
