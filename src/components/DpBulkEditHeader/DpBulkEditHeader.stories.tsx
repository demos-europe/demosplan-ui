import type { Meta, StoryObj } from '@storybook/vue'
import { DpBulkEditHeader, DpButton } from '~/components'

const meta: Meta<typeof DpBulkEditHeader> = {
    component: DpBulkEditHeader,
    title: 'Components/BulkEditHeader',
    render: (args) => ({
        components: {
            DpButton,
            DpBulkEditHeader
        },
        computed: {
            allSelected () {
                return this.selectedItemsCount === (args as any).options.length
            },
            selectedItemsCount () {
                return (args as any).options.filter(checked => checked.checked == true).length
            },
            selectedItemsText () {
                return this.selectedItemsCount + ' ' + (this.selectedItemsCount > 1 ? 'Elements' : 'Element') + ' selected'
            }
        },
        setup () {
            const toggleAll = (event) => {
                for (let element of (args as any).options) {
                    element.checked = event.target.checked
                }
            }

            const resetSelection = () => {
                const toggleAll = document.getElementById('toggleAll') as HTMLInputElement
                for (const element of (args as any).options) {
                    element.checked = false
                }
                toggleAll.checked = false
            }

            return { args, resetSelection, toggleAll }
        },
        template: `
          <div>
              <dp-bulk-edit-header
                  v-if="selectedItemsCount > 0"
                  :selected-items-text="selectedItemsText"
                  @reset-selection="resetSelection"
                  v-bind="args">
                <dp-button
                    text="Delete"
                    icon="delete"
                    @click="resetSelection" />
              </dp-bulk-edit-header>
              <label for="toggleAll">
                  <input
                      id="toggleAll"
                      type="checkbox"
                      :checked="allSelected"
                      @click="toggleAll">
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
