import type { Meta, StoryObj } from '@storybook/vue'
import DpTreeList from './'

const meta: Meta<typeof DpTreeList> = {
    component: DpTreeList,
    title: 'Components/TreeList',
}

interface IDpTreeList {
    'tree:change': object
    'draggable:change': object
    nodeSelectionChange: object
    branchIdentifier: Function
    treeData: string[]
}

type Story = StoryObj<IDpTreeList>

export default meta

export const Default: Story = {
    args: {
        branchIdentifier: () => '',
        treeData: ['option 1', 'option 2']
    },
    argTypes: {
        'tree:change': { action: 'tree:change' },
        'draggable:change': { action: 'draggable:change' },
        nodeSelectionChange: { action: 'nodeSelectionChange' },
    }
}
