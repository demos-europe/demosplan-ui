import DpBadge from '~/components/DpBadge/DpBadge.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpBadge', () => {
  const defaultProps = {
    color: 'default',
    size: 'medium',
    text: 'Test Badge',
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpBadge, {
      props: {
        ...defaultProps,
      },
    })
  })

  it('renders the text passed in as prop', () => {
    expect(wrapper.text()).toBe('Test Badge')
  })

  it('applies the correct colors for color=default', () => {
    const defaultClasses = ['text-default', 'bg-surface-medium']
    defaultClasses.forEach(cssClass => {
      expect(wrapper.classes()).toContain(cssClass)
    })
  })

  it('applies the correct size class', () => {
    const defaultClasses = ['text-sm', 'py-1.5', 'px-2']
    defaultClasses.forEach(cssClass => {
      expect(wrapper.classes()).toContain(cssClass)
    })
  })

  it('renders as a span', () => {
    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
