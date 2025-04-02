import type { Meta, StoryObj } from '@storybook/vue3'
import DpConfirmDialog from './'

const meta: Meta<typeof DpConfirmDialog> = {
  component: DpConfirmDialog,
  title: 'Components/ConfirmDialog',
  render: (args) => ({
    components: {
      DpConfirmDialog
    },
    setup() {
      return { args }
    },
    template: `<dp-confirm-dialog v-bind="args" />`
  })
}

interface IDpConfirmDialog {
  dataCy?: string
  message?: string
  'modal:toggled': object
}

export default meta;
type Story = StoryObj<IDpConfirmDialog>

export const Default: Story = {
  args: {
    dataCy: 'default',
    message: 'Are you sure you want to proceed?'
  },
  argTypes: {
    'modal:toggled': { action: 'modal:toggled' }
  }
}
