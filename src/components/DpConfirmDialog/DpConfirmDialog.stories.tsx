import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpConfirmDialog from './'

interface IDpConfirmDialog {
  allowHtml?: boolean
  checkboxText?: string
  dataCy?: string
  message?: string
  'modal:toggled'?: (isOpen: boolean) => void
}

const meta: Meta<typeof DpConfirmDialog> = {
  component: DpConfirmDialog,
  title: 'Components/ConfirmDialog',
  argTypes: {
    allowHtml: {
      control: 'boolean',
      description: 'Renders the message as sanitized HTML'
    },
    checkboxText: {
      control: 'text',
      description: 'Text of a checkbox that has to be checked before confirming'
    },
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
      // Templates have no access to window globals like alert
      const showResult = (result: boolean) => window.alert('Dialog result: ' + result)

      return { args, showResult }
    },
    template: `
      <div>
        <p class="mb-4">A confirm dialog component. In actual usage, you would call the <code>open()</code> method to show the dialog.</p>
        <dp-confirm-dialog ref="dialog" v-bind="args" />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          @click="$refs.dialog.open().then(showResult)">
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
      // Templates have no access to window globals like alert
      const showResult = (result: boolean) => window.alert('Dialog result: ' + result)

      return { args, showResult }
    },
    template: `
      <div>
        <p class="mb-4">A confirm dialog with a custom message.</p>
        <dp-confirm-dialog ref="dialog" v-bind="args" />
        <button
          class="px-4 py-2 bg-red-500 text-white rounded"
          @click="$refs.dialog.open().then(showResult)">
          Delete Item
        </button>
      </div>
    `
  })
}

export const WithCheckbox: Story = {
  args: {
    checkboxText: 'I have read the notes and want to proceed anyway.',
    dataCy: 'checkbox',
    message: 'Changing this setting has severe consequences.'
  },
  render: (args) => ({
    components: {
      DpConfirmDialog
    },
    setup() {
      // Templates have no access to window globals like alert
      const showResult = (result: boolean) => window.alert('Dialog result: ' + result)

      return { args, showResult }
    },
    template: `
      <div>
        <p class="mb-4">The confirm button stays disabled until the checkbox is checked.</p>
        <dp-confirm-dialog ref="dialog" v-bind="args" />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          @click="$refs.dialog.open().then(showResult)">
          Open Dialog
        </button>
      </div>
    `
  })
}

export const WithHtml: Story = {
  args: {
    allowHtml: true,
    dataCy: 'html',
    message: '<strong>This is important.</strong><p>If you confirm, it will have severe consequences:</p><ul><li>Consequence A</li><li>Consequence B</li></ul>'
  },
  render: (args) => ({
    components: {
      DpConfirmDialog
    },
    setup() {
      // Templates have no access to window globals like alert
      const showResult = (result: boolean) => window.alert('Dialog result: ' + result)

      return { args, showResult }
    },
    template: `
      <div>
        <p class="mb-4">A confirm dialog with a message rendered as sanitized HTML.</p>
        <dp-confirm-dialog ref="dialog" v-bind="args" />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          @click="$refs.dialog.open().then(showResult)">
          Open Dialog
        </button>
      </div>
    `
  })
}
