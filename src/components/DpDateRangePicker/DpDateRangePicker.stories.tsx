import type { Meta, StoryObj } from '@storybook/vue3'
import DpDateRangePicker from './'

interface IDpDateRangePicker {
    startId: string
    endId: string
    startName?: string
    endName?: string
    startValue?: string
    endValue?: string
    minDate?: string
    maxDate?: string
    calendarsAfter?: number
    calendarsBefore?: number
    startDisabled?: boolean
    endDisabled?: boolean
    required?: boolean
    enforcePlausibleDates?: boolean
    placeholder?: string
    dataCy?: string
    dataDpValidateErrorFieldname?: string
    'input:end-date'?: (value: string) => void
    'input:start-date'?: (value: string) => void
}

const meta: Meta<typeof DpDateRangePicker> = {
    component: DpDateRangePicker,
    title: "Components/DateRangePicker",
    argTypes: {
        startId: {
            control: 'text',
            description: 'ID for the start date input'
        },
        endId: {
            control: 'text',
            description: 'ID for the end date input'
        },
        startValue: {
            control: 'text',
            description: 'Initial value for the start date (YYYY-MM-DD format)'
        },
        endValue: {
            control: 'text',
            description: 'Initial value for the end date (YYYY-MM-DD format)'
        },
        minDate: {
            control: 'text',
            description: 'Minimum selectable date for start date picker'
        },
        maxDate: {
            control: 'text',
            description: 'Maximum selectable date for end date picker'
        },
        enforcePlausibleDates: {
            control: 'boolean',
            description: 'Whether to enforce start date before end date',
            defaultValue: false
        },
        required: {
            control: 'boolean',
            description: 'Whether the date inputs are required',
            defaultValue: false
        },
        'input:end-date': {
            action: 'input:end-date',
            description: 'Event fired when end date changes'
        },
        'input:start-date': {
            action: 'input:start-date',
            description: 'Event fired when start date changes'
        }
    }
}

export default meta

type Story = StoryObj<IDpDateRangePicker>

export const Default: Story = {
    args: {
        startId: 'default-start-date',
        endId: 'default-end-date'
    }
}

export const WithInitialValues: Story = {
    args: {
        startId: 'initial-values-start-date',
        endId: 'initial-values-end-date',
        startValue: '2023-01-15',
        endValue: '2023-02-15'
    }
}

export const Required: Story = {
    args: {
        startId: 'required-start-date',
        endId: 'required-end-date',
        required: true
    }
}
