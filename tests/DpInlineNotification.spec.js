import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import lscache from 'lscache'
import DpInlineNotification from '~/components/DpInlineNotification/DpInlineNotification'


describe('', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return shallowMount(DpInlineNotification, {
      props: {
        message: 'Test Notification',
        ...props
      },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders as error notification when only given a message', () => {
    wrapper = createWrapper()

    expect(wrapper.classes()).toContain('flash-error')
    expect(wrapper.find('[data-cy="inlineNotification:message"]').text()).toBe('Test Notification')
  })

  it('renders hide button when dismissible is true', () => {
    wrapper = createWrapper({ dismissible: true })

    expect(wrapper.find('[data-cy="inlineNotification:hideHint"]').exists()).toBe(true)
  })

  it('renders correct styling and icon for different types', () => {
    const types = [
      { type: 'confirm', class: 'flash-confirm', icon: 'check-circle' },
      { type: 'error', class: 'flash-error', icon: 'warning-circle' },
      { type: 'info', class: 'flash-info', icon: 'info' },
      { type: 'warning', class: 'flash-warning', icon: 'warning' }
    ]

    types.forEach(({ type, class: cssClass, icon }) => {
      wrapper = createWrapper({ type })

      expect(wrapper.classes()).toContain(cssClass)
      expect(wrapper.find('dp-icon-stub').attributes('icon')).toBe(icon)
    })
  })

  it('saves dismissibleKey to localStorage when dismissed', () => {
    const mockLscacheSet = vi.spyOn(lscache, 'set')
    wrapper = createWrapper({ dismissible: true, dismissibleKey: 'test-key' })

    wrapper.vm.dismiss()

    expect(mockLscacheSet).toHaveBeenCalledWith('test-key', expect.any(Number))

    mockLscacheSet.mockRestore()
  })

  it('renders in dismissed state when localStorage indicates dismissal', async () => {
    const mockLscacheGet = vi.spyOn(lscache, 'get').mockReturnValue(1234567890)
    wrapper = createWrapper({ dismissible: true, dismissibleKey: 'test-key' })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-cy="inlineNotification:message"]').exists()).toBe(false)
    expect(wrapper.find('[data-cy="inlineNotification:showHint"]').exists()).toBe(true)

    mockLscacheGet.mockRestore()
  })
})
