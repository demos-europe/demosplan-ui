import type { Meta, StoryObj } from '@storybook/vue3'
import DpModal from './'

interface IDpModal {
    'modal:toggled': object
}

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
                Short, descriptive modal title
              </template>
              <template>
                <p>
                  Modal content
                </p>
              </template>
            </dp-modal>
          </div>
        `,
    })
}

export default meta

type Story = StoryObj<IDpModal>

export const Default: Story = {
    args: {},
    argTypes: {
        'modal:toggled': { action: 'modal:toggled' }
    }
}
