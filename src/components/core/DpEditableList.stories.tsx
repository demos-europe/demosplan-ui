import type { Meta, StoryObj } from '@storybook/vue'
import DpEditableList from './DpEditableList.vue'

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
                emails: args.entries,
                itemIndex: null
            }
        },
        setup() {
            return { args }
        },
        methods: {
            addElement () {
                this.emails.push({
                    mail: this.formFields.mail
                })
            },

            deleteItem (index) {
                this.emails.splice(index, 1)
                this.updateExtraEmailAddress(index)
            },

            handleSubmit (index) {
                if (index === 'new') {
                    this.addElement()
                    this.saveExtraEmailAddress(this.formFields.mail)
                } else {
                    this.updateEmailAddress(index)
                    this.updateExtraEmailAddress(index, this.formFields.mail[index])
                }

                this.resetForm()
                this.$refs.listComponent.toggleFormVisibility(false)
                this.$refs.listComponent.currentlyUpdating = ''
            },

            resetForm () {
                this.formFields.mail = ''
                this.itemIndex = null
            },

            saveExtraEmailAddress (extraEmailAddress) {
                this.$emit('saved', extraEmailAddress)
            },

            updateExtraEmailAddress (index, extraEmailAddress) {
                this.$emit('updated', (index, extraEmailAddress))
            },

            updateEmailAddress (index) {
                this.emails[index].mail = this.formFields.mail
            },
        },
        mounted () {
            this.$on('delete', (index) => {
                this.deleteItem(index)
                this.resetForm()
            })
        },
        template: `
          <dp-editable-list
              :entries="emails"
              v-bind="args"
              @saveEntry="handleSubmit(itemIndex !== null ? itemIndex : 'new')"
              ref="listComponent">
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
                  placeholder="Email Address"
                  v-model="formFields.mail"
                  @enter="handleSubmit(itemIndex !== null ? itemIndex : 'new')" />
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
