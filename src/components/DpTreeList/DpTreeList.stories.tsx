import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DpTreeList from './DpTreeList.vue'
import DpIcon from '../DpIcon/DpIcon.vue'

/**
 * Function to determine if a node is a branch
 */
const isBranch = ({ node }: { node: any }) => {
  return node.type === 'category' || node.type === 'elements'
}

const meta: Meta<typeof DpTreeList> = {
  title: 'Components/TreeList',
  component: DpTreeList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A hierarchical tree component for displaying nested data structures with support for selection, drag-and-drop, and custom rendering.',
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof DpTreeList>

/**
 * Sample tree data structure
 */
const sampleTreeData = [
  {
    id: 'category-1',
    type: 'category',
    attributes: {
      title: 'Category 1'
    },
    children: [
      {
        id: 'item-1-1',
        type: 'item',
        attributes: {
          title: 'Item 1.1',
          status: 'active'
        },
        children: []
      },
      {
        id: 'item-1-2',
        type: 'item',
        attributes: {
          title: 'Item 1.2',
          status: 'inactive'
        },
        children: []
      }
    ]
  },
  {
    id: 'category-2',
    type: 'category',
    attributes: {
      title: 'Category 2'
    },
    children: [
      {
        id: 'subcategory-2-1',
        type: 'category',
        attributes: {
          title: 'Subcategory 2.1'
        },
        children: [
          {
            id: 'item-2-1-1',
            type: 'item',
            attributes: {
              title: 'Item 2.1.1',
              status: 'active'
            },
            children: []
          }
        ]
      }
    ]
  }
]

/**
 * Default tree list example
 */
export const Default: Story = {
  render: (args) => ({
    components: { DpTreeList },
    setup() {
      return { args, isBranch }
    },
    template: `
      <div class="w-[600px]">
        <dp-tree-list
          :tree-data="args.treeData"
          :branch-identifier="isBranch"
          :options="args.options">
          <template #header>
            <div class="flex items-center space-x-4">
              <div class="flex-1">Name</div>
              <div class="w-[100px]">Status</div>
            </div>
          </template>
          <template #branch="{ nodeElement }">
            <div class="flex items-center space-x-4">
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px]">Folder</div>
            </div>
          </template>
          <template #leaf="{ nodeElement }">
            <div class="flex items-center space-x-4">
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px]">{{ nodeElement.attributes.status }}</div>
            </div>
          </template>
        </dp-tree-list>
      </div>
    `
  }),
  args: {
    treeData: sampleTreeData,
    options: {
      branchesSelectable: false,
      leavesSelectable: false,
      dragBranches: false,
      dragLeaves: false
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-tree-list
  :tree-data="treeData"
  :branch-identifier="isBranch"
  :options="{
    branchesSelectable: false,
    leavesSelectable: false,
    dragBranches: false,
    dragLeaves: false
  }">
  <template #header>
    <div class="flex items-center space-x-4">
      <div class="flex-1">Name</div>
      <div class="w-[100px]">Status</div>
    </div>
  </template>
  <template #branch="{ nodeElement }">
    <div class="flex items-center space-x-4">
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px]">Folder</div>
    </div>
  </template>
  <template #leaf="{ nodeElement }">
    <div class="flex items-center space-x-4">
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px]">{{ nodeElement.attributes.status }}</div>
    </div>
  </template>
</dp-tree-list>
`
      }
    }
  }
}

/**
 * Tree list with selectable nodes
 */
export const SelectableNodes: Story = {
  render: (args) => ({
    components: { DpTreeList },
    setup() {
      const selectedNodes = ref([])

      const handleNodeSelectionChange = (nodes: any[]) => {
        selectedNodes.value = nodes
        console.log('Selected nodes:', nodes)
      }

      return { args, isBranch, selectedNodes, handleNodeSelectionChange }
    },
    template: `
      <div class="w-[600px]">
        <dp-tree-list
          :tree-data="args.treeData"
          :branch-identifier="isBranch"
          :options="args.options"
          @node-selection-change="handleNodeSelectionChange">
          <template #header>
            <div class="flex items-center space-x-4">
              <div class="flex-1">Name</div>
              <div class="w-[100px]">Status</div>
            </div>
          </template>
          <template #branch="{ nodeElement }">
            <div class="flex items-center space-x-4">
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px]">Folder</div>
            </div>
          </template>
          <template #leaf="{ nodeElement }">
            <div class="flex items-center space-x-4">
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px]">{{ nodeElement.attributes.status }}</div>
            </div>
          </template>
        </dp-tree-list>

        <div class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-bold mb-2">Selected Nodes:</h3>
          <div v-if="selectedNodes.length === 0">No nodes selected</div>
          <ul v-else class="list-disc pl-4">
            <li v-for="(node, index) in selectedNodes" :key="index">
              {{ node.attributes?.title || 'Unnamed node' }} ({{ node.nodeType }})
            </li>
          </ul>
        </div>
      </div>
    `
  }),
  args: {
    treeData: sampleTreeData,
    options: {
      branchesSelectable: true,
      leavesSelectable: true,
      dragBranches: false,
      dragLeaves: false,
      selectOn: {
        childSelect: false,
        parentSelect: true
      },
      deselectOn: {
        childDeselect: true,
        parentDeselect: true
      }
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-tree-list
  :tree-data="treeData"
  :branch-identifier="isBranch"
  :options="{
    branchesSelectable: true,
    leavesSelectable: true,
    selectOn: {
      childSelect: false,
      parentSelect: true
    },
    deselectOn: {
      childDeselect: true,
      parentDeselect: true
    }
  }"
  @node-selection-change="handleNodeSelectionChange">
  <template #header>
    <div class="flex items-center space-x-4">
      <div class="flex-1">Name</div>
      <div class="w-[100px]">Status</div>
    </div>
  </template>
  <template #branch="{ nodeElement }">
    <div class="flex items-center space-x-4">
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px]">Folder</div>
    </div>
  </template>
  <template #leaf="{ nodeElement }">
    <div class="flex items-center space-x-4">
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px]">{{ nodeElement.attributes.status }}</div>
    </div>
  </template>
</dp-tree-list>
`
      }
    }
  }
}

/**
 * Tree list with draggable nodes
 */
export const DraggableNodes: Story = {
  render: (args) => ({
    components: { DpTreeList },
    setup() {
      const handleTreeChange = (newTree: any) => {
        console.log('Tree structure changed:', newTree)
      }

      const handleDraggableChange = (payload: any) => {
        console.log('Draggable change:', payload)
      }

      return { args, isBranch, handleTreeChange, handleDraggableChange }
    },
    template: `
      <div class="w-[600px]">
        <dp-tree-list
          :tree-data="args.treeData"
          :branch-identifier="isBranch"
          :options="args.options"
          @tree:change="handleTreeChange"
          @draggable:change="handleDraggableChange">
          <template #header>
            <div class="flex items-center space-x-4">
              <div class="flex-1">Name</div>
              <div class="w-[100px]">Status</div>
            </div>
          </template>
          <template #branch="{ nodeElement }">
            <div class="flex items-center space-x-4">
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px]">Folder</div>
            </div>
          </template>
          <template #leaf="{ nodeElement }">
            <div class="flex items-center space-x-4">
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px]">{{ nodeElement.attributes.status }}</div>
            </div>
          </template>
          <template #footer>
            <div class="text-sm italic text-gray-500">Drag items to reorder</div>
          </template>
        </dp-tree-list>
      </div>
    `
  }),
  args: {
    treeData: sampleTreeData,
    options: {
      dragBranches: true,
      dragLeaves: true,
      rootDraggable: true,
      dragAcrossBranches: true
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-tree-list
  :tree-data="treeData"
  :branch-identifier="isBranch"
  :options="{
    dragBranches: true,
    dragLeaves: true,
    rootDraggable: true,
    dragAcrossBranches: true
  }"
  @tree:change="handleTreeChange"
  @draggable:change="handleDraggableChange">
  <template #header>
    <div class="flex items-center space-x-4">
      <div class="flex-1">Name</div>
      <div class="w-[100px]">Status</div>
    </div>
  </template>
  <template #branch="{ nodeElement }">
    <div class="flex items-center space-x-4">
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px]">Folder</div>
    </div>
  </template>
  <template #leaf="{ nodeElement }">
    <div class="flex items-center space-x-4">
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px]">{{ nodeElement.attributes.status }}</div>
    </div>
  </template>
  <template #footer>
    <div class="text-sm italic text-gray-500">Drag items to reorder</div>
  </template>
</dp-tree-list>
`
      }
    }
  }
}

/**
 * Tree list with custom rendering
 */
export const CustomRendering: Story = {
  render: (args) => ({
    components: { DpTreeList, DpIcon },
    setup() {
      return { args, isBranch }
    },
    template: `
      <div class="w-[600px]">
        <dp-tree-list
          :tree-data="args.treeData"
          :branch-identifier="isBranch"
          :options="args.options">
          <template #header>
            <div class="flex items-center p-2 bg-gray-100 font-bold">
              <div class="flex-1">File Explorer</div>
              <div class="w-[100px] text-right">Type</div>
            </div>
          </template>
          <template #branch="{ nodeElement }">
            <div class="flex items-center p-2 hover:bg-gray-50">
              <dp-icon icon="folder" class="mr-2 text-yellow-500" />
              <div class="flex-1 font-medium">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px] text-right text-gray-500">Directory</div>
            </div>
          </template>
          <template #leaf="{ nodeElement }">
            <div class="flex items-center p-2 hover:bg-gray-50">
              <dp-icon icon="file-text" class="mr-2 text-blue-500" />
              <div class="flex-1">{{ nodeElement.attributes.title }}</div>
              <div class="w-[100px] text-right text-gray-500">
                {{ nodeElement.attributes.status === 'active' ? 'Document' : 'Draft' }}
              </div>
            </div>
          </template>
          <template #footer>
            <div class="p-2 bg-gray-100 flex justify-between items-center">
              <span class="text-sm text-gray-500">5 items</span>
              <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm">Add Item</button>
            </div>
          </template>
        </dp-tree-list>
      </div>
    `
  }),
  args: {
    treeData: sampleTreeData,
    options: {
      branchesSelectable: false,
      leavesSelectable: true,
      dragBranches: false,
      dragLeaves: false
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-tree-list
  :tree-data="treeData"
  :branch-identifier="isBranch"
  :options="{
    branchesSelectable: false,
    leavesSelectable: true
  }">
  <template #header>
    <div class="flex items-center p-2 bg-gray-100 font-bold">
      <div class="flex-1">File Explorer</div>
      <div class="w-[100px] text-right">Type</div>
    </div>
  </template>
  <template #branch="{ nodeElement }">
    <div class="flex items-center p-2 hover:bg-gray-50">
      <dp-icon icon="folder" class="mr-2 text-yellow-500" />
      <div class="flex-1 font-medium">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px] text-right text-gray-500">Directory</div>
    </div>
  </template>
  <template #leaf="{ nodeElement }">
    <div class="flex items-center p-2 hover:bg-gray-50">
      <dp-icon icon="file-text" class="mr-2 text-blue-500" />
      <div class="flex-1">{{ nodeElement.attributes.title }}</div>
      <div class="w-[100px] text-right text-gray-500">
        {{ nodeElement.attributes.status === 'active' ? 'Document' : 'Draft' }}
      </div>
    </div>
  </template>
  <template #footer>
    <div class="p-2 bg-gray-100 flex justify-between items-center">
      <span class="text-sm text-gray-500">5 items</span>
      <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm">Add Item</button>
    </div>
  </template>
</dp-tree-list>
`
      }
    }
  }
}
