import DpTab from '~/components/DpTabs/DpTab.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpTab', () => {
  it('shows the tab when isActive is true', () => {
    const wrapper = shallowMount(DpTab, {
      props: {
        id: 'tabx',
        isActive: true,
        label: 'Tab X',
        suffix: '',
      },
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('hides the tab when isActive is false', () => {
    const wrapper = shallowMount(DpTab, {
      props: {
        id: 'tabx',
        isActive: false,
        label: 'Tab X',
        suffix: '',
      },
    })
    expect(wrapper.isVisible()).toBe(false)
  })
})

