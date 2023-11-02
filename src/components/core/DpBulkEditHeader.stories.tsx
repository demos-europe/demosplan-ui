import type { Meta, StoryObj } from '@storybook/vue'
import DpBulkEditHeader from './DpBulkEditHeader.vue'
import DpButton from "~/components/DpButton/DpButton.vue";

const meta: Meta<typeof DpBulkEditHeader> = {
    component: DpBulkEditHeader,
    title: 'Components/BulkEditHeader',
    render: (args) => ({
        components: {
            DpButton,
            DpBulkEditHeader
        },
        computed: {
            selectedItemsCount () {
                return args.options.filter(checked => checked.checked == true)
            }
        },
        setup() {
            const selectAll = () => {
                for (let element of args.options) {
                    element.checked = true
                }
            }

            const resetSelection = () => {
                const selectAll = document.getElementById('selectAll')
                for (const element of args.options) {
                    element.checked = false
                }
                selectAll.checked = false
            }

            return { args, resetSelection, selectAll }
        },
        template: `
          <div>
              <dp-bulk-edit-header
                  v-if="selectedItemsCount.length > 0"
                  :selected-items-text="selectedItemsCount.length + ' ' + 'Elements selected'"
                  @reset-selection="resetSelection"
                  v-bind="args">
                <dp-button
                    text="Delete"
                    icon="fa-trash"
                    @click="resetSelection" />
              </dp-bulk-edit-header>
              <label for="selectAll">
                  <input
                      id="selectAll"
                      type="checkbox"
                      @click="selectAll">
                  Select all
              </label>
              <div
                  class="u-mt-0_5"
                  v-for="item in args.options"
                  :key="item.id">
                <label :for="item.id">
                  <input
                      :id="item.id"
                      v-model="item.checked"
                      :checked="!item.checked === false"
                      type="checkbox"/>
                  {{ item.label }}
                </label>
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
            { label: 'Item 1', id: '1', checked: false },
            { label: 'Item 2', id: '2', checked: false },
            { label: 'Item 3', id: '3', checked: false }
        ]
    },
    argTypes: {}
}
