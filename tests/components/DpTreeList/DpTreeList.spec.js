import { mockNode, mockSelectedNodes, mockUpdatedNodes } from './DpTreeListMockData'
import { shallowMount } from '@vue/test-utils'
import DpTreeList from '~/components/DpTreeList/DpTreeList.vue'

describe('DpTreeList', () => {
  let propsData
  let wrapper

  beforeEach(() => {
    propsData = {
      branchIdentifier: jest.fn(),
      draggable: true,
      onMove: jest.fn(),
      options: {},
      treeData: []
    }

    wrapper = shallowMount(DpTreeList, {
      propsData
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('returns an empty array if a nodes "nodeIsSelected" state is false', () => {
    wrapper = shallowMount(DpTreeList, {
      propsData: {
        branchIdentifier: jest.fn(),
        draggable: true,
        onMove: jest.fn(),
        options: {},
        treeData: [
          mockNode
        ]
      }
    })

    wrapper.vm.handleSelectEvent()

    expect(wrapper.vm.selectedNodesObjects).toEqual([])
  })

  it('returns an array with the selected nodes if the node has a positive "nodeIsSelected" state', () => {
    wrapper = shallowMount(DpTreeList, {
      propsData: {
        branchIdentifier: jest.fn(),
        draggable: true,
        onMove: jest.fn(),
        options: {},
        treeData: [
          mockUpdatedNodes
        ]
      }
    })

    wrapper.vm.handleSelectEvent()

    expect(wrapper.vm.selectedNodesObjects).toEqual(mockSelectedNodes)
  })
})
