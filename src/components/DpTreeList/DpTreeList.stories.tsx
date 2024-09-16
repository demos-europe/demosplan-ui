import type { Meta, StoryObj } from '@storybook/vue3'
import DpTreeList from './'

const isBranch = (node: any) => {
    return node.type === 'faqCategory'
}

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
        template: `<dp-tree-list
            :tree-data="args.treeData"
            :options="args.options"
            v-bind="args">
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
            <div class="layout__item u-5-of-12">
              {{ nodeElement.attributes.title }}
            </div>
            <div class="layout__item u-5-of-12">
              Enables
            </div>
          </template>
          <template v-slot:leaf="{ nodeElement }">
            <div class="layout__item u-5-of-12">
              {{ nodeElement.attributes.title }}
            </div>
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
    options: object
}

type Story = StoryObj<IDpTreeList>

export default meta

export const Default: Story = {
    args: {
        branchIdentifier: () => { return isBranch },
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
                        id: 'id-attributes-1',
                        type: 'faq'
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
            }
        ],
        options: {
            branchesSelectable: true,
            leavesSelectable: false,
            dragLeaves: true
        }
    },
    argTypes: {
        'tree:change': { action: 'tree:change' },
        'draggable:change': { action: 'draggable:change' },
        nodeSelectionChange: { action: 'nodeSelectionChange' },
    }
}
