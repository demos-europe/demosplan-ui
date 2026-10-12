import DpBadge from '~/components/DpBadge/DpBadge.vue'
import DpIcon from '~/components/DpIcon/DpIcon.vue'
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

  it('renders no icon by default', () => {
    expect(wrapper.findComponent(DpIcon).exists()).toBe(false)
    expect(wrapper.classes()).not.toContain('inline-flex')
  })

  it('renders the icon before the text when icon is set', () => {
    wrapper = shallowMount(DpBadge, {
      props: {
        ...defaultProps,
        icon: 'archive',
      },
    })

    const icon = wrapper.findComponent(DpIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.props('icon')).toBe('archive')
    expect(icon.props('size')).toBe('small')
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.text()).toBe('Test Badge')
  })

  it('uses a medium icon for large badges', () => {
    wrapper = shallowMount(DpBadge, {
      props: {
        ...defaultProps,
        icon: 'archive',
        size: 'large',
      },
    })

    expect(wrapper.findComponent(DpIcon).props('size')).toBe('medium')
  })
})
