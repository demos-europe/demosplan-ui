import DpBadge from '~/components/DpBadge/DpBadge.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpBadge', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpBadge, {
      props: {
        color: 'default',
        size: 'medium',
        text: 'Test Badge',
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

  it('renders as a span by default', () => {
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('renders as a button when isButton is true', () => {
    const buttonWrapper = shallowMount(DpBadge, {
      props: {
        color: 'default',
        size: 'medium',
        text: 'Test Badge',
        isButton: true,
      },
    })
    expect(buttonWrapper.element.tagName).toBe('BUTTON')
    expect(buttonWrapper.attributes('type')).toBe('button')
  })

  it('emits a click event when isButton is true and the badge is clicked', async () => {
    const buttonWrapper = shallowMount(DpBadge, {
      props: {
        color: 'default',
        size: 'medium',
        text: 'Test Badge',
        isButton: true,
      },
    })
    await buttonWrapper.find('button').trigger('click')
    expect(buttonWrapper.emitted('click')).toBeTruthy()
    expect(buttonWrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit a click event when isButton is false', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
