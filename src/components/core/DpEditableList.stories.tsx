import type { Meta, StoryObj } from '@storybook/vue'
import DpEditableList from './DpEditableList.vue'

const meta: Meta<typeof DpEditableList> = {
    component: DpEditableList,
    title: 'Components/EditableList',
    render: (args) => ({
        components: {
            DpEditableList
        },
        setup() {
            return { args }
        },
        template: `
            <dp-editable-list
              v-bind="args"
              :entries="args.entries">
                <template v-slot:list="{ entry }">
                  <span>{{ entry.mail }}
                      <input
                        type="email"
                        :value="entry.mail"
                        name="formFieldName">
                  </span>
                </template>
            </dp-editable-list>
        `
    })
}

interface IDpEditableList {
    entries: object[] | object
    index: number[],
    delete: object
    reset: object
    saveEntry: object
    showUpdateForm: object
}

type Story = StoryObj<IDpEditableList>

export default meta

export const Default: Story = {
    args: {
        entries: [
            { mail: 'mail1@mail.com' },
            { mail: 'mail2@mail.com' }
        ],
        index: [0, 1]
    },
    argTypes: {
        delete: { action: 'delete' },
        reset: { action: 'reset' },
        saveEntry: { action: 'saveEntry' },
        showUpdateForm: { action: 'showUpdateForm' }
    }
}
