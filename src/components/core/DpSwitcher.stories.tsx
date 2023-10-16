import type { Meta, StoryObj } from '@storybook/vue'
import DpSwitcher from './DpSwitcher.vue'

const meta: Meta<typeof DpSwitcher> = {
    component: DpSwitcher,
    title: 'Components/Switcher',
    render: (args) => ({
        components: {
            DpSwitcher
        },
        setup() {
            return { args }
        },
        template: `
          <dp-switcher
              input-id="switcher"
              @input="(tab) => $refs.switcher.toggle(tab)"
              ref="switcher">
            <template v-slot:option1>
              Option 1
            </template>
            <template v-slot:option2>
              Option 2
            </template>
          </dp-switcher>
        `,
    })
}

interface IDpSwitcher {
    input: object
    inputId: string
}

type Story = StoryObj<IDpSwitcher>

export default meta

export const Default: Story = {
    args: {
        inputId: 'switcherId',
    },
    argTypes: {
        input: { action: 'input' }
    }
}
