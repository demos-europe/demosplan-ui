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
              :entries="args.entries"
              v-bind="args">
            <template v-slot:list="entry">
                <span>
                  {{ entry.mail }}
                  <input
                      class="hide-visually"
                      type="email"
                      :value="entry.mail">
                </span>
            </template>
            <template v-slot:form="entry">
              <input
                  id="emailAddress"
                  type="email"
                  v-model="args.entries.mail"/>
            </template>
          </dp-editable-list>
        `,
    })
}

interface IDpEditableList {
    entries: object[]
    reset: object
    saveEntry: object
}

type Story = StoryObj<IDpEditableList>

export default meta

export const Default: Story = {
    args: {
        entries: [
            {
                mail: "mail1@mail.com"
            },
            {
                mail: "mail2@mail.com"
            }
        ],
    },
    argTypes: {
        reset: { action: 'reset' },
        saveEntry: { action: 'saveEntry' }
    }
}
