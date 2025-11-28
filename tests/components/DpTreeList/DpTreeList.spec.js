import DpTreeList from '~/components/DpTreeList/DpTreeList.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpTreeList', () => {
  let wrapper
  const createTreeData = () => [
    {
      id: '1',
      type: 'Elements',
      attributes: {
        title: 'Branch 1',
      },
      children: [
        {
          id: '2',
          type: 'SingleDocument',
          attributes: {
            title: 'Leaf 1',
          },
          children: [],
        },
        {
          id: '3',
          type: 'SingleDocument',
          attributes: {
            title: 'Leaf 2',
          },
          children: [],
        },
      ],
    },
    {
      id: '4',
      type: 'Elements',
      attributes: {
        title: 'Branch 2',
      },
      children: [
        {
          id: '5',
          type: 'SingleDocument',
          attributes: {
            title: 'Leaf 3',
          },
          children: [],
        },
        {
          id: '6',
          type: 'SingleDocument',
          attributes: {
            title: 'Leaf 4',
          },
          children: [],
        },
        {
          id: '7',
          type: 'SingleDocument',
          attributes: {
            title: 'Leaf 5',
          },
          children: [],
        },
      ],
    },
  ]

  beforeEach(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    wrapper = shallowMount(DpTreeList, {
      props: {
        treeData: createTreeData(),
        branchIdentifier: jest.fn(({ node }) => node.type === 'Elements'),
        options: {
          branchesSelectable: true,
          leavesSelectable: true,
        },
      },
      attachTo: div,
      global: {
        config: {
          globalProperties: {
            $root: global.$rootMock,
          },
        },
        stubs: {
          DpTreeListCheckbox: true,
          DpTreeListToggle: true,
          DpDraggable: true,
          DpTreeListNode: {
            name: 'DpTreeListNode',
            template: '<div class="dp-tree-list-node-stub"></div>',
            props: [
              'checkBranch',
              'children',
              'draggable',
              'handleChange',
              'handleDrag',
              'level',
              'node',
              'nodeId',
              'onMove',
              'options',
              'selectionManager',
            ],
          },
        },
      },
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the checkAll checkbox if checkAll is true', () => {
    const checkboxComponents = wrapper.findAllComponents({ name: 'DpTreeListCheckbox' })
    const checkAllCheckboxComponent = checkboxComponents.find(checkboxComponent => checkboxComponent.props('checkAll'))

    expect(checkAllCheckboxComponent).toBeTruthy()
  })

  it('renders the toggleAll toggle if the tree list has items', () => {
    const toggleComponents = wrapper.findAllComponents({ name: 'DpTreeListToggle' })
    const toggleAllComponent = toggleComponents.find(toggle => toggle.props('toggleAll'))

    expect(toggleAllComponent).toBeTruthy()
  })

  it('renders a DpTreeListNode component for every top-level item in treeData', () => {
    const treeData = wrapper.props('treeData')
    const expectedNodeCount = treeData.length // Only top-level nodes with shallowMount
    const nodes = wrapper.findAllComponents({ name: 'DpTreeListNode' })

    expect(nodes.length).toBe(expectedNodeCount)
  })
})
