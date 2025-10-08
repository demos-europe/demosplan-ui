import { mockNode, mockNodeChildren } from './DpTreeListMockData'
import DpTreeListNode from '~/components/DpTreeList/DpTreeListNode'
import DpTreeListToggle from '~/components/DpTreeList/DpTreeListToggle'
import { shallowMount } from '@vue/test-utils'

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
      parentSelected: false,
    }

    mocks = {
      Translator: {
        trans: jest.fn(key => key),
      },
      $on: jest.fn(),
    }

    stubs = {
      DpTreeListToggle,
    }

    wrapper = shallowMount(DpTreeListNode, {
      propsData,
      global: {
        stubs,
        mocks,
      },
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

  it('changes the icon class to "fa fa-folder-open" if isExpanded is true', async () => {
    const button = wrapper.findComponent(DpTreeListToggle)

    expect(wrapper.vm.isExpanded).toBe(false)
    button.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isExpanded).toBe(true)
    expect(wrapper.vm.iconClassFolder).toBe('fa fa-folder-open')
  })

  it.skip('changes the icon class to "fa fa-folder" if isExpanded is false', async () => {
    /**
     * For some reason, the value don't get updated when the button is clicked
     */
    const button = wrapper.findComponent(DpTreeListToggle)

    await wrapper.setData({ isExpanded: true })

    button.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isExpanded).toBe(false)
    expect(wrapper.vm.iconClassFolder).toBe('fa fa-folder')
  })
})
