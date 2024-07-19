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
  defaultClasses.forEach(class => {
    expect(wrapper.classes()).toContain(class)
  })
})

  it('applies the correct size class', () => {
    expect(wrapper.classes()).toContain('font-size-medium')
    expect(wrapper.classes()).toContain('u-pv-0_25')
    expect(wrapper.classes()).toContain('u-ph-0_5')
  })

  it('renders with different color', async () => {
    await wrapper.setProps({ color: 'error' })
    expect(wrapper.classes()).toContain('color-message-severe-text')
    expect(wrapper.classes()).toContain('bg-color-message-severe')
  })

  it('renders with different size', async () => {
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('font-size-large')
    expect(wrapper.classes()).toContain('u-pv-0_5')
    expect(wrapper.classes()).toContain('u-ph-0_75')
  })
})
