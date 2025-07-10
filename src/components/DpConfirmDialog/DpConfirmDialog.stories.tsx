import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpConfirmDialog from './'

interface IDpConfirmDialog {
  dataCy?: string
  message?: string
  'modal:toggled'?: (isOpen: boolean) => void
}

const meta: Meta<typeof DpConfirmDialog> = {
  component: DpConfirmDialog,
  title: 'Components/ConfirmDialog',
  argTypes: {
    dataCy: {
      control: 'text',
      description: 'Data attribute for Cypress testing'
    },
    message: {
      control: 'text',
      description: 'Dialog message to display'
    },
    'modal:toggled': {
      action: 'modal:toggled',
      description: 'Event emitted when dialog is opened or closed'
    }
  }
}

export default meta
type Story = StoryObj<IDpConfirmDialog>

export const Default: Story = {
  args: {
    dataCy: 'default',
    message: 'Are you sure you want to proceed?'
  },
  render: (args) => ({
    components: {
      DpConfirmDialog
    },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="mb-4">A confirm dialog component. In actual usage, you would call the <code>open()</code> method to show the dialog.</p>
        <dp-confirm-dialog ref="dialog" v-bind="args" />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          @click="$refs.dialog.open().then(result => alert('Dialog result: ' + result))">
          Open Dialog
        </button>
      </div>
    `
  })
}

export const CustomMessage: Story = {
  args: {
    dataCy: 'custom',
    message: 'This action cannot be undone. Are you absolutely sure you want to delete this item?'
  },
  render: (args) => ({
    components: {
      DpConfirmDialog
    },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="mb-4">A confirm dialog with a custom message.</p>
        <dp-confirm-dialog ref="dialog" v-bind="args" />
        <button
          class="px-4 py-2 bg-red-500 text-white rounded"
          @click="$refs.dialog.open().then(result => alert('Dialog result: ' + result))">
          Delete Item
        </button>
      </div>
    `
  })
}
