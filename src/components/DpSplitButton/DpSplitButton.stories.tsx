import type { Meta, StoryObj } from '@storybook/vue'
import DpSplitButton from './DpSplitButton.vue'

const meta: Meta<typeof DpSplitButton> = {
    component: DpSplitButton,
    title: "Components/SplitButton",
    argTypes: {},
    render: (args) => ({
        components: {
            DpSplitButton,
        },
        setup() {
            return { args }
        },
        template: `<dp-split-button v-bind="args">
          <a
              href="#">
              Save
          </a>
          <template v-slot:dropdown>
            <a href="#">
                Save and return
            </a>
          </template>
        </dp-split-button>`,
    })
}

export default meta
type Story = StoryObj<typeof DpSplitButton>

export const Default: Story = {
    args: {}
}
