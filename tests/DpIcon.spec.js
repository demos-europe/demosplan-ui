import { shallowMount } from '@vue/test-utils'
import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { iconComponents, proportions, SIZES } from '~/components/DpIcon/util/iconConfig'
import { IconName,  IconSize,  IconWeight } from '../types'

describe('DpIcon', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpIcon, {
      props: {
        icon: 'check',
        size: 'medium',
        weight: 'regular'
      },
      components: {
        iconComponents
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly with given props', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().icon).toBe('check')
    expect(wrapper.props().size).toBe('medium')
    expect(wrapper.props().weight).toBe('regular')
  })

  it('renders the correct icon component', async () => {
    await wrapper.setProps({ icon: 'check' })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(iconComponents['check']).exists()).toBe(true)
  })

  // it('applies the correct proportion class', () => {
  //   const proportionClass = proportions['check'] || 'square'
  //   expect(wrapper.classes()).toContain(proportionClass)
  // })
  //
  // it('provides the correct size prop globally', () => {
  //   expect(wrapper.vm.$options.provide().size).toBe(SIZES['medium'])
  // })
  //
  // it('provides the correct weight prop globally', () => {
  //   expect(wrapper.vm.$options.provide().weight).toBe('regular')
  // })
  //
  // it('updates the icon component when the icon prop changes', async () => {
  //   await wrapper.setProps({ icon: 'plus' })
  //   const iconComponent = iconComponents['plus']
  //   expect(wrapper.findComponent(iconComponent).exists()).toBe(true)
  // })
  //
  // it('applies the correct class when icon proportion is not found', async () => {
  //   await wrapper.setProps({ icon: 'nonexistent-icon' })
  //   expect(wrapper.classes()).toContain('square')
  // })
  //
  // it('uses the default size and weight when not provided', () => {
  //   const wrapperWithDefaults = shallowMount(DpIcon, {
  //     props: {
  //       icon: 'check'
  //     }
  //   })
  //   expect(wrapperWithDefaults.vm.$options.provide().size).toBe(SIZES['medium'])
  //   expect(wrapperWithDefaults.vm.$options.provide().weight).toBe('regular')
  //   wrapperWithDefaults.unmount()
  // })
})
