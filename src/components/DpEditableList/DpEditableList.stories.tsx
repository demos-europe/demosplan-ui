import type { Meta, StoryObj } from '@storybook/vue'
import DpEditableList from './'

const meta: Meta<typeof DpEditableList> = {
    component: DpEditableList,
    title: 'Components/EditableList',
    render: (args) => ({
        components: {
            DpEditableList
        },
        data () {
            return {
                formFields: {
                    item: ''
                },
                entries: args.entries,
                itemIndex: null
            }
        },
        setup() {
            return { args }
        },
        methods: {
            addItem () {
                this.entries.push({
                    item: this.formFields.item
                })
            },

            deleteItem (index) {
                this.entries.splice(index, 1)
                this.updateExtraItems(index)
            },

            handleSubmit (index) {
                if (index === 'new') {
                    this.addItem()
                    this.saveExtraItems(this.formFields.item)
                } else {
                    this.updateItems(index)
                    this.updateExtraItems(index, this.formFields.item[index])
                }

                this.resetForm()
                this.$refs.listComponent.toggleFormVisibility(false)
                this.$refs.listComponent.currentlyUpdating = ''
            },

            resetForm () {
                this.formFields.item = ''
                this.itemIndex = null
            },

            saveExtraItems (extraItems) {
                this.$emit('saved', extraItems)
            },

            updateExtraItems (index, extraItems) {
                this.$emit('updated', (index, extraItems))
            },

            updateItems (index) {
                this.entries[index].item = this.formFields.item
            },
        },
        mounted () {
            this.$on('delete', (index) => {
                this.deleteItem(index)
                this.resetForm()
            })

            this.$on('showUpdateForm', (index) => {
                this.formFields.item = this.entries[index].item
                this.itemIndex = index
            })
        },
        template: `
          <dp-editable-list
              :entries="entries"
              v-bind="args"
              @reset="resetForm"
              @saveEntry="handleSubmit(itemIndex !== null ? itemIndex : 'new')"
              ref="listComponent">
            <template v-slot:list="entry">
                <span>
                  {{ entry.item }}
                  <input
                      class="hide-visually"
                      type="email"
                      :value="entry.item">
                </span>
            </template>
            <template v-slot:form="entry">
              <input
                  id="emailAddress"
                  type="email"
                  placeholder="Email Address"
                  v-model="formFields.item"
                  @enter="handleSubmit(itemIndex !== null ? itemIndex : 'new')" />
            </template>
          </dp-editable-list>
        `,
    })
}

interface IDpEditableList {
    entries: object[]
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
            {
                item: "mail1@mail.com"
            },
            {
                item: "mail2@mail.com"
            }
        ],
    },
    argTypes: {
        delete: { action: 'delete' },
        reset: { action: 'reset' },
        saveEntry: { action: 'saveEntry' },
        showUpdateForm: { action: 'showUpdateForm' }
    }
}
