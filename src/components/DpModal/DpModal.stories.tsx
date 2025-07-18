import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpModal from './'
import DpButton from '~/components/DpButton'

interface IDpModal {
    ariaLabel: string
    contentBodyClasses: string
    contentClasses: string
    contentHeaderClasses: string
    modalId: string
    'modal:toggled': object
}

const meta: Meta<typeof DpModal> = {
    component: DpModal,
    title: 'Components/Modal',
    argTypes: {
        ariaLabel: {
            control: 'text',
            description: 'Accessibility label for screen readers'
        },
        contentBodyClasses: {
            control: 'text',
            description: 'Additional CSS classes for the modal body'
        },
        contentClasses: {
            control: 'text',
            description: 'Additional CSS classes for the modal content container'
        },
        contentHeaderClasses: {
            control: 'text',
            description: 'Additional CSS classes for the modal header'
        },
        modalId: {
            control: 'text',
            description: 'ID for the modal (required when toggling modal with toggleByEvent())'
        },
        'modal:toggled': {
            action: 'modal:toggled',
            description: 'Event emitted when the modal is opened or closed'
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'Modal components intentionally interrupt the user\'s page experience, disabling page content to focus attention on critical information or actions. They create a layer above the app\'s main interface that requires user interaction before returning to the main content.'
            }
        }
    },
    tags: ['autodocs', '!dev']
}

export default meta

type Story = StoryObj<IDpModal>

/**
 * Basic modal with a title and simple content
 */
export const Default: Story = {
    render: (args) => ({
        components: { DpModal, DpButton },
        setup() {
            return { args }
        },
        template: `
          <div>
            <dp-button @click.stop.prevent="$refs.openModal.toggle()" text="Open Modal" />
            <dp-modal
                id="basicModal"
                ref="openModal"
                v-bind="args">
              <template v-slot:header>
                Short, descriptive modal title
              </template>
              <template>
                <p>
                  Modal content goes here. This can include text, forms, images, or any other content.
                </p>
                <p class="mt-4">
                  The modal can be closed by clicking the X button in the top right, clicking the backdrop,
                  or pressing the Escape key.
                </p>
                <div class="mt-6 text-right">
                  <dp-button @click="$refs.openModal.toggle()">Close</dp-button>
                </div>
              </template>
            </dp-modal>
          </div>
        `
    }),
    args: {
        ariaLabel: 'Example Modal Dialog'
    },
    tags: ['!autodocs', 'dev']
}

/**
 * Modal with custom styling for the content container, header, and body
 */
export const CustomStyling: Story = {
    render: (args) => ({
        components: { DpModal, DpButton },
        setup() {
            return { args }
        },
        template: `
          <div>
            <dp-button @click.stop.prevent="$refs.styledModal.toggle()" text="Open Colorful Modal" />
            <dp-modal
                id="styledModal"
                ref="styledModal"
                v-bind="args">
              <template v-slot:header>
                Custom Styled Modal
              </template>
              <template>
                <p>This modal has custom styling applied to the content container, header, and body.</p>
                <p class="mt-4">
                  You can customize the appearance of the modal using the contentClasses, contentHeaderClasses,
                  and contentBodyClasses props.
                </p>
                <div class="mt-6 text-right">
                  <dp-button @click="$refs.styledModal.toggle()">Close</dp-button>
                </div>
              </template>
            </dp-modal>
          </div>
        `
    }),
    args: {
        ariaLabel: 'Custom Styled Modal Dialog',
        contentClasses: 'bg-message-warning rounded-md',
        contentHeaderClasses: 'text-highlight',
        contentBodyClasses: 'p-6'
    }
}
