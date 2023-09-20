import type { Meta, StoryObj } from '@storybook/vue'
import DpModal from './'

const meta: Meta<typeof DpModal> = {
    component: DpModal,
    title: 'Components/Modal',
    render: (args) => ({
        components: {
            DpModal
        },
        setup() {
            return { args }
        },
        template: `
          <div>
            <a
                href="#openModal"
                id="openModal"
                @click.stop.prevent="$refs.openModal.toggle()"
                role="button">
              Open Modal
            </a>
            <dp-modal
                id="openModal"
                ref="openModal"
                v-bind="args">
              <template v-slot:header>
                Header Title
              </template>
              <template>
                <p>
                  Template Code & Text
                </p>
              </template>
            </dp-modal>
          </div>
        `,
    })
}

interface IDpModal {
    'modal:toggled': object
}

type Story = StoryObj<IDpModal>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        'modal:toggled': { action: 'modal:toggled' }
    }
}
