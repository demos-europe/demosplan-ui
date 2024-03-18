import { node, nodeChildren, updatedNodes } from './DpTreeListTestData'
import { shallowMount } from '@vue/test-utils'
import DpTreeListNode from '~/components/DpTreeList/DpTreeListNode.vue'
import DpTreeListToggle from '~/components/DpTreeList/DpTreeListToggle.vue'

describe('DpTreeListNode', () => {
  let propsData
  let mocks
  let stubs

  const mockCheckBranch = jest.fn(({ node }) => {
    return node.type === 'elements'
  })

  beforeEach(() => {
    propsData = {
      children: nodeChildren,
      draggable: true,
      handleChange: jest.fn(),
      handleDrag: jest.fn(),
      checkBranch: mockCheckBranch,
      level: 0,
      node: node,
      nodeId: '1',
      onMove: jest.fn(),
      options: {},
      parentId: '',
      parentSelected: false
    }

    mocks = {
      Translator: {
        trans: jest.fn(key => key)
      }
    }

    stubs = {
      DpTreeListToggle
    }
  })

  it('renders component correctly', () => {
    const wrapper = shallowMount(DpTreeListNode, {
      propsData,
      mocks
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('change the value of "isExpanded" to its opposite when toggling and change the icon class', async () => {
    const wrapper = shallowMount(DpTreeListNode, {
      propsData,
      mocks,
      stubs
    })
    const button = wrapper.findComponent(DpTreeListToggle)

    expect(wrapper.vm.isExpanded).toBe(false)

    await button.trigger('click')
    expect(wrapper.vm.isExpanded).toBe(true)
    expect(wrapper.vm.iconClassFolder).toBe('fa fa-folder-open')

    await button.trigger('click')
    expect(wrapper.vm.isExpanded).toBe(false)
    expect(wrapper.vm.iconClassFolder).toBe('fa fa-folder')
  })

  it('add specific node properties (nodeId, nodeIsSelected, nodeType) to the node when invoking the setSelectionState method', () => {
    const wrapper = shallowMount(DpTreeListNode, {
      propsData,
      mocks
    })
    const setNodeAndChildrenSelection = jest.spyOn(wrapper.vm, 'setNodeAndChildrenSelection')

    wrapper.vm.setSelectionState(true)

    expect(setNodeAndChildrenSelection).toHaveBeenCalled()

    expect(wrapper.vm.node.nodeId).toBe(wrapper.vm.nodeId)
    expect(wrapper.vm.node.nodeIsSelected).toBe(true)
    expect(wrapper.vm.node.nodeType).toBe(wrapper.vm.isBranch ? 'branch' : 'leaf')
  })

  it('update the node properties and the properties of its children recursively when invoking the setNodeAndChildrenSelection method', () => {
    const wrapper = shallowMount(DpTreeListNode, {
      propsData,
      mocks
    })

    const expectedResult = updatedNodes
    wrapper.vm.setNodeAndChildrenSelection(true)

    expect(wrapper.vm.node).toEqual(expectedResult)
  })
})
