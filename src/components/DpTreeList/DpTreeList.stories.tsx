import type { Meta, StoryObj } from '@storybook/vue'
import DpTreeList from './'

const meta: Meta<typeof DpTreeList> = {
    component: DpTreeList,
    title: 'Components/TreeList',
    render: (args) => ({
        components: {
            DpTreeList
        },
        setup() {
            return { args }
        },
        template: `<dp-tree-list v-bind="args">
          <template v-slot:header>
            <div class="layout--flush">
              <div class="layout__item u-5-of-12">
                Heading
              </div>
              <div class="layout__item u-5-of-12">
                Status
              </div>
            </div>
          </template>
          <template v-slot:branch="{ nodeElement }">
            {{ nodeElement.attributes.title }}
          </template>
          <template v-slot:leaf="{ nodeElement }">
            {{ nodeElement.children.attributes.title }}
          </template>
          <template v-slot:footer>
            <button
                type="submit"
                class="btn btn--primary">
              <i
                  class="fa fa-download u-mr-0_25"
                  aria-hidden="true" />
              Button-Label
            </button>
          </template>
        </dp-tree-list>`,
    })
}

interface IDpTreeList {
    'tree:change': object
    'draggable:change': object
    nodeSelectionChange: object
    branchIdentifier: Function
    treeData: object[]
}

type Story = StoryObj<IDpTreeList>

export default meta

export const Default: Story = {
    args: {
        branchIdentifier: () => '',
        treeData: [
            {
                attributes: {
                    title: 'Category 1'
                },
                children: [
                    {
                        attributes: {
                            title: 'Sub-Category 1'
                        },
                        id: 'id-attributes-1'
                    }
                ],
                id: 'id-1',
                relationships: {
                    faq: {
                        data: [{
                            id: 'id-1',
                            type: 'faq'
                        }]
                    },
                    type: 'faqCategory'
                }
            },
            {
                attributes: {
                    title: 'Category 2'
                },
                children: [
                    {
                        attributes: {
                            title: 'Sub-Category 2'
                        },
                        id: 'id-attributes-2'
                    }
                ],
                id: 'id-2',
                relationships: {
                    faq: {
                        data: [{
                            id: 'id-2',
                            type: 'faq'
                        }]
                    },
                    type: 'faqCategory'
                }
            }
        ]
    },
    argTypes: {
        'tree:change': { action: 'tree:change' },
        'draggable:change': { action: 'draggable:change' },
        nodeSelectionChange: { action: 'nodeSelectionChange' },
    }
}
