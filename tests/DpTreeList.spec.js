import { mount } from '@vue/test-utils';
import DpTreeList from './DpTreeList.vue';
import DpTreeListNode from './DpTreeListNode.vue';

describe('DpTreeList', () => {
  it('renders correctly', () => {
    const wrapper = mount(DpTreeList, {
      propsData: {
        branchIdentifier: () => {},
        treeData: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('emits tree:change event when tree structure changes', () => {
    const treeData = [{ id: '1', children: [] }];
    const wrapper = mount(DpTreeList, {
      propsData: {
        branchIdentifier: () => {},
        treeData: treeData
      }
    });
    wrapper.vm.tree = treeData;
    expect(wrapper.emitted('tree:change')).toBeTruthy();
  });

});
