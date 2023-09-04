import type { Meta, StoryObj } from '@storybook/vue'
import DpFormRow from './DpFormRow.vue'
import DpSelect from '../DpSelect/DpSelect.vue'

const meta: Meta<typeof DpFormRow> = {
    component: DpFormRow,
    title: "Components/FormRow",
    render: (args) => ({
        components: {
            DpFormRow,
            DpSelect
        },
        setup() {
            return { args }
        },
        template: `<dp-form-row v-bind="args">
          <dp-select
              id="select"
              name="select"
              :options="[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' }
              ]" />
        </dp-form-row>`,
    })
}

type Story = StoryObj<typeof DpFormRow>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {}
}
