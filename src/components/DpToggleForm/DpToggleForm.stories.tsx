import type { Meta, StoryObj } from '@storybook/vue'
import DpToggleForm from './'

const meta: Meta<typeof DpToggleForm> = {
    component: DpToggleForm,
    title: "Components/ToggleForm",
    render: (args) => ({
        components: {
            DpToggleForm,
        },
        setup() {
            return { args }
        },
        template: `<dp-toggle-form v-bind="args" title="Form Title">
          <form
              action="#"
              method="post">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title"><br><br>
          </form>
        </dp-toggle-form>`,
    })
}

interface IDpToggleForm {
    formAbort: object
    formSave: object
}

type Story = StoryObj<IDpToggleForm>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        formAbort: { action: 'formAbort' },
        formSave: { action: 'formSave' }
    }
}
