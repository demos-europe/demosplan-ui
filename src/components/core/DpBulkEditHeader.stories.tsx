import type { Meta, StoryObj } from '@storybook/vue'
import DpBulkEditHeader from './DpBulkEditHeader.vue'

const meta: Meta<typeof DpBulkEditHeader> = {
    component: DpBulkEditHeader,
    title: 'Components/BulkEditHeader',
    render: (args) => ({
        components: {
            DpBulkEditHeader
        },
        setup() {
            const resetSelection = () => {
                for (const element of args.options) {
                    element.checked = false
                }
            }

            const deleteSelection = () => {
                for (let element of args.options) {
                    if(element.checked === true) {
                        args.options = args.options.filter(checked => checked.checked != true)
                    }
                }
            }

            return { args, resetSelection, deleteSelection }
        },
        template: `
          <div>
              <dp-bulk-edit-header
                  v-if="args.options.length > 0"
                  :selected-items-count="args.options.length"
                  selection-text="Elements"
                  @reset-selection="resetSelection"
                  v-bind="args">
                <button
                    class="btn-icns u-m-0"
                    type="button"
                    @click.prevent="deleteSelection">
                  <i class="fa fa-times u-mr-0_125" />
                  Delete
                </button>
              </dp-bulk-edit-header>
              <div
                  class="u-mt-0_5"
                  v-for="item in args.options"
                  :key="item.id">
                <input
                    :id="item.id"
                    v-model="item.checked"
                    :checked="!item.checked === false"
                    type="checkbox"/>
                {{ item.label }}
              </div>
          </div>
        `,
    })
}

interface IDpBulkEditHeader {
    options: object[]
}

type Story = StoryObj<IDpBulkEditHeader>

export default meta

export const Default: Story = {
    args: {
        options: [
            { label: 'Option 1', id: '1', checked: true },
            { label: 'Option 2', id: '2', checked: true },
            { label: 'Option 3', id: '3', checked: true }

        ]
    },
    argTypes: {}
}
