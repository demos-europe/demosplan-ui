import DpTreeListCheckbox from '~/components/DpTreeList/DpTreeListCheckbox'
import { de } from '../src/components/shared/translations'

import { shallowMount } from '@vue/test-utils'

describe('should return result \'Auswahl aufheben\' when props are: checked = true, checkAll = true', () => {
  const wrapper = shallowMount(DpTreeListCheckbox, {
    props: {
      checked: true,
      checkAll: true,
      name: 'someName'
    }
  })

  it('returns operations.deselect.all', () => {
    expect(wrapper.vm.label).toEqual(de.operations.deselect.all)
  })
})

describe('should return result aria.select.all when props are: checked = false, checkAll = true', () => {
  const wrapper = shallowMount(DpTreeListCheckbox, {
    props: {
      checked: false,
      checkAll: true,
      name: 'someName'
    }
  })

  it('returns aria.select.all', () => {
    expect(wrapper.vm.label).toEqual(de.aria.select.all)
  })
})

describe('should return result \'Auswahl für Element aufheben\' when props are: checked = true, checkAll = false', () => {
  const wrapper = shallowMount(DpTreeListCheckbox, {
    props: {
      checked: true,
      checkAll: false,
      name: 'someName'
    }
  })

  it('returns \'Auswahl für Element aufheben\'', () => {
    expect(wrapper.vm.label).toEqual('Auswahl für Element aufheben')
  })
})

describe('should return result \'Element auswählen\' when props are: checked = false, checkAll = false', () => {
  const wrapper = shallowMount(DpTreeListCheckbox, {
    props: {
      checked: false,
      checkAll: false,
      name: 'someName'
    }
  })

  it('returns \'Element auswählen\'', () => {
    expect(wrapper.vm.label).toEqual('Element auswählen')
  })
})

describe('DpTreeListCheckbox', () => {
  it('should be an object', () => {
    expect(typeof DpTreeListCheckbox).toBe('object')
  })

  it('should be named DpTreeListCheckbox', () => {
    expect(DpTreeListCheckbox.name).toBe('DpTreeListCheckbox')
  })
})
