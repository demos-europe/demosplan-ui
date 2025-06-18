import type { Meta, StoryObj } from '@storybook/vue3'
import DpDatepicker from './'

interface IDpDatepicker {
    id: string
    value?: string
    name?: string
    minDate?: string
    maxDate?: string
    required?: boolean
    disabled?: boolean
    placeholder?: string
    dataCy?: string
    dataDpValidateErrorFieldname?: string
    calendarsAfter?: number
    calendarsBefore?: number
    input?: (value: string) => void
}

const meta: Meta<typeof DpDatepicker> = {
    component: DpDatepicker,
    title: "Components/Datepicker",
    argTypes: {
        id: {
            control: 'text',
            description: 'ID for the datepicker component'
        },
        value: {
            control: 'text',
            description: 'Initial date value in ISO format (YYYY-MM-DD)'
        },
        name: {
            control: 'text',
            description: 'Name attribute for the input'
        },
        minDate: {
            control: 'text',
            description: 'Minimum selectable date'
        },
        maxDate: {
            control: 'text',
            description: 'Maximum selectable date'
        },
        required: {
            control: 'boolean',
            description: 'Whether the field is required'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the field is disabled'
        },
        input: {
            action: 'input',
            description: 'Event fired when date value changes'
        }
    }
}

export default meta

type Story = StoryObj<IDpDatepicker>

export const Default: Story = {
    args: {
        id: 'default-datepicker'
    }
}

export const WithValue: Story = {
    args: {
        id: 'with-value-datepicker',
        value: '2023-05-15'
    }
}

export const WithRange: Story = {
    args: {
        id: 'with-range-datepicker',
        minDate: '2023-01-01',
        maxDate: '2023-12-31'
    }
}

export const Required: Story = {
    args: {
        id: 'required-datepicker',
        required: true,
        name: 'requiredDate'
    },
    render: (args) => ({
        components: { DpDatepicker },
        setup() {
            return { args }
        },
        template: `
            <div>
                <label for="${args.id}" class="block mb-1">Date (required)</label>
                <dp-datepicker
                    v-bind="args"
                    @input="args.input"
                />
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        id: 'disabled-datepicker',
        disabled: true,
        value: '2023-05-15'
    }
}
