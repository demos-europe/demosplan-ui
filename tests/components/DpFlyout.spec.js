import { afterEach, beforeEach, expect, it } from '@jest/globals'
import DpFlyout from '~/components/DpFlyout'
import shallowMountWithGlobalMocks from '../../jest/shallowMountWithGlobalMocks'

describe('DpFlyout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMountWithGlobalMocks(DpFlyout, {})
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders with expected css classes with default props', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('o-flyout')
    expect(wrapper.classes()).toContain('o-flyout--right')
    expect(wrapper.classes()).toContain('o-flyout--padded')
    expect(wrapper.classes()).toContain('o-flyout--menu')
  })

  it('toggles isExpanded when button is clicked', async () => {
    const button = wrapper.find('.o-flyout__trigger')
    await button.trigger('click')

    expect(wrapper.vm.isExpanded).toBe(true)

    await button.trigger('click')
    expect(wrapper.vm.isExpanded).toBe(false)
  })

  it('emits \'open\' event when flyout is expanded', async () => {
    const button = wrapper.find('.o-flyout__trigger')
    await button.trigger('click')

    expect(wrapper.emitted().open).toBeTruthy()
  })

  it('emits \'close\' event when flyout is collapsed', async () => {
    const button = wrapper.find('.o-flyout__trigger')
    await button.trigger('click') // open
    await button.trigger('click') // close

    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('closes when close method is triggered by clicking outside', async () => {
    wrapper.vm.isExpanded = true
    await wrapper.vm.close()

    expect(wrapper.vm.isExpanded).toBe(false)
  })

  it('displays content passed into the slot', () => {
    const slotContent = '<div class="slot-content">Slot Content</div>'
    const wrapper = shallowMountWithGlobalMocks(DpFlyout, {
      slots: {
        default: slotContent
      }
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Slot Content')
  })
})
