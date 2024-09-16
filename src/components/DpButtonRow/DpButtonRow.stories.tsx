import type { Meta, StoryObj } from '@storybook/vue3'
import DpButtonRow from './'

interface IDpButtonRow {
    align:string,
    busy: boolean,
    disabled: boolean,
    href: string,
    primary: boolean,
    primaryAction: object,
    primaryText: string,
    secondary: boolean,
    secondaryAction: object,
    secondaryText: string,
    variant: string
}

const meta: Meta<typeof DpButtonRow> = {
    component: DpButtonRow,
    title: "Components/ButtonRow",
    render: (args) => ({
        components: {
            DpButtonRow,
        },
        setup() {
            return { args }
        },
        template: `<dp-button-row v-bind="args" primary secondary ></dp-button-row>`,
    })
}

export default meta
type Story = StoryObj<IDpButtonRow>

export const Default: Story = {
    args: {},
    argTypes: {
        primaryAction: { action: 'primaryAction' },
        secondaryAction: { action: 'secondaryAction' }
    },
}
