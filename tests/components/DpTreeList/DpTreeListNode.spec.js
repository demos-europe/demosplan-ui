import { mockNode, mockNodeChildren, mockUpdatedNodes } from './DpTreeListMockData'
import { shallowMount } from '@vue/test-utils'
import DpTreeListNode from '~/components/DpTreeList/DpTreeListNode.vue'
import DpTreeListToggle from '~/components/DpTreeList/DpTreeListToggle.vue'

describe('DpTreeListNode', () => {
  let mocks
  let propsData
  let stubs
  let wrapper

  const mockCheckBranch = jest.fn(({ node }) => {
    return node.type === 'elements'
  })

  beforeEach(() => {
    propsData = {
      children: mockNodeChildren,
      draggable: true,
      handleChange: jest.fn(),
      handleDrag: jest.fn(),
      checkBranch: mockCheckBranch,
      level: 0,
      node: mockNode,
      nodeId: '1',
      onMove: jest.fn(),
      options: {},
      parentId: '',
      parentSelected: false
    }

    mocks = {
      Translator: {
        trans: jest.fn(key => key)
      },
      $root: {
        $on: jest.fn()
      }
    }

    stubs = {
      DpTreeListToggle
    }

    wrapper = shallowMount(DpTreeListNode, {
      propsData,
      global: {
        stubs,
        mocks
      }
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('renders component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('change the icon class to "fa fa-folder-open" if the isExpanded is true', () => {
    const button = wrapper.findComponent(DpTreeListToggle)

    expect(wrapper.vm.isExpanded).toBe(false)
    button.trigger('click')

    expect(wrapper.vm.isExpanded).toBe(true)
    expect(wrapper.vm.iconClassFolder).toBe('fa fa-folder-open')
  })

  it('change the icon class to "fa fa-folder" if the isExpanded is false', async () => {
    const button = wrapper.findComponent(DpTreeListToggle)

    await wrapper.setData({ isExpanded: true })
    button.trigger('click')

    expect(wrapper.vm.isExpanded).toBe(false)
    expect(wrapper.vm.iconClassFolder).toBe('fa fa-folder')
  })

  it('update the properties of the parent node when invoking the setNodeAndChildrenSelection method', () => {
    wrapper.vm.setNodeAndChildrenSelection(true)

    expect(wrapper.vm.node.nodeId).toBe(wrapper.vm.nodeId)
    expect(wrapper.vm.node.nodeIsSelected).toBe(true)
    expect(wrapper.vm.node.nodeType).toBe(wrapper.vm.isBranch ? 'branch' : 'leaf')
  })

  it('call the function setSelectionRecursively and update the properties of the nodes children when the node has children', () => {
    const setSelectionRecursivelySpy = jest.spyOn(wrapper.vm, 'setSelectionRecursively')

    wrapper.vm.setNodeAndChildrenSelection(true)

    expect(setSelectionRecursivelySpy).toHaveBeenCalled()
    expect(wrapper.vm.node).toEqual(mockUpdatedNodes)
  })

  it('does not call the function setSelectionRecursively when the node has no children', () => {
    wrapper = shallowMount(DpTreeListNode, {
      props: {
        children: [],
        draggable: true,
        handleChange: jest.fn(),
        handleDrag: jest.fn(),
        checkBranch: mockCheckBranch,
        level: 0,
        node: {
          "id": "4",
          "type": "singleDocument",
          "attributes": {},
          "children": []
        },
        nodeId: '4',
        onMove: jest.fn(),
        options: {},
        parentId: '',
        parentSelected: false
      }
    })
    const setSelectionRecursivelySpy = jest.spyOn(wrapper.vm, 'setSelectionRecursively')
    wrapper.vm.setNodeAndChildrenSelection(true)

    expect(setSelectionRecursivelySpy).not.toHaveBeenCalled()
  })

  it('emit the "node-selected" event when the setSelectionState function is called', () => {
    wrapper.vm.setSelectionState(true)

    expect(wrapper.emitted('node-selected')).toBeTruthy()
  })
})
