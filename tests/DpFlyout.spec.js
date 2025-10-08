import { shallowMount } from '@vue/test-utils'
import DpFlyout from '~/components/DpFlyout/DpFlyout.vue'

describe('DpFlyout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpFlyout, {
      props: {
        align: 'right',
        dataCy: 'flyoutTrigger',
        disabled: false,
        hasMenu: true,
        padded: true,
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders component correctly with default props', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-cy="flyoutTrigger"]').exists()).toBe(true)
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    expect(wrapper.find('.dp-flyout-content').classes()).toContain('right-1')
    expect(wrapper.find('.dp-flyout-content').classes()).toContain('px-2')
    expect(wrapper.find('.dp-flyout-content').classes()).toContain('py-1')
  })

  it('toggles isExpanded state when button is clicked', async () => {
    const button = wrapper.find('button')
    expect(wrapper.vm.isExpanded).toBe(false)

    // When emit (open).
    await button.trigger('click')
    expect(wrapper.vm.isExpanded).toBe(true)
    expect(wrapper.emitted().open).toBeTruthy()

    // When emit (close).
    await button.trigger('click')
    expect(wrapper.vm.isExpanded).toBe(false)
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('adds correct class when isExpanded is true', async () => {
    wrapper.setData({ isExpanded: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.dp-flyout').classes()).toContain('is-expanded')
  })

  it('disables the button when the disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true })
    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('applies the correct alignment class based on align prop', async () => {
    await wrapper.setProps({ align: 'left' })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.dp-flyout-content').classes()).toContain('left-1')
    expect(wrapper.find('.dp-flyout-content').classes()).not.toContain('right-1')
  })

  it('emits close event when close method is called', async () => {
    wrapper.setData({ isExpanded: true })
    await wrapper.vm.$nextTick()

    wrapper.vm.close()
    expect(wrapper.emitted().close).toBeTruthy()
    expect(wrapper.vm.isExpanded).toBe(false)
  })
})
