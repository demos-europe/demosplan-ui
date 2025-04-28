import { shallowMount } from '@vue/test-utils'
import DpBadge from '~/components/DpBadge/DpBadge.vue'

describe('DpBadge', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpBadge, {
      props: {
        color: 'default',
        size: 'medium',
        text: 'Test Badge'
      }
    })
  })

  it('renders the text passed in as prop', () => {
    expect(wrapper.text()).toBe('Test Badge')
  })

  it('applies the correct colors for color=default', () => {
    const defaultClasses = ['color-text-default', 'bg-color-light']
    defaultClasses.forEach(cssClass => {
      expect(wrapper.classes()).toContain(cssClass)
    })
  })

  it('applies the correct size class', () => {
    const defaultClasses = ['font-size-medium', 'u-pv-0_25', 'u-ph-0_5']
    defaultClasses.forEach(cssClass => {
      expect(wrapper.classes()).toContain(cssClass)
    })
  })
})
