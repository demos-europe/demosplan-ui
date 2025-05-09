import type { Meta, StoryObj } from '@storybook/vue3'
import DpEditableList from './'

interface IDpEditableList {
    entries: object[]
    delete: object
    reset: object
    saveEntry: object
    showUpdateForm: object
}

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
                    mail: ''
                },
                entries: args['entries'],
                itemIndex: null
            }
        },
        setup() {
            return { args }
        },
        methods: {
            addItem () {
                this.entries.push({
                    mail: this.formFields.mail
                })
            },

            deleteItem (index: any) {
                this.entries.splice(index, 1)
            },

            handleSubmit (index) {
                if (index === 'new') {
                    this.addItem()
                    this.saveExtraItems(this.formFields.mail)
                } else {
                    this.updateItems(index)
                    this.updateExtraItems(index, this.formFields.mail[index])
                }

                this.resetForm()
                this.$refs.listComponent.toggleFormVisibility(false)
                this.$refs.listComponent.currentlyUpdating = ''
            },

            resetForm () {
                this.formFields.mail = ''
                this.itemIndex = null
            },

            saveExtraItems (extraItems) {
                this.$emit('saved', extraItems)
            },

            updateExtraItems (index, extraItems) {
                this.$emit('updated', [index, extraItems])
            },

            updateItems (index) {
                this.entries[index].mail = this.formFields.mail
            },
        },
        mounted () {
            this.$on('delete', (index) => {
                this.deleteItem(index)
                this.resetForm()
            })

            this.$on('showUpdateForm', (index) => {
                this.formFields.mail = this.entries[index].mail
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
                  {{ entry.mail }}
                  <input
                      class="sr-only"
                      type="email"
                      :value="entry.mail">
                </span>
            </template>
            <template v-slot:form="entry">
              <input
                  id="emailAddress"
                  type="email"
                  placeholder="Email Address"
                  v-model="formFields.mail"
                  @enter="handleSubmit(itemIndex !== null ? itemIndex : 'new')" />
            </template>
          </dp-editable-list>
        `,
    })
}

export default meta

type Story = StoryObj<IDpEditableList>

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
        delete: { action: 'delete' },
        reset: { action: 'reset' },
        saveEntry: { action: 'saveEntry' },
        showUpdateForm: { action: 'showUpdateForm' }
    }
}
