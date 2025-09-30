import { afterEach, describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
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

  afterEach(() => {
    wrapper.destroy()
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
      { type: 'confirm', class: 'flash-confirm', icon: 'fa-check' },
      { type: 'error', class: 'flash-error', icon: 'fa-exclamation-circle' },
      { type: 'info', class: 'flash-info', icon: 'fa-info-circle' },
      { type: 'warning', class: 'flash-warning', icon: 'fa-exclamation-triangle' }
    ]

    types.forEach(({ type, class: cssClass, icon }) => {
      wrapper = createWrapper({ type })

      expect(wrapper.classes()).toContain(cssClass)
      expect(wrapper.find('i.fa').classes()).toContain(icon)
    })
  })

  it('saves dismissibleKey to localStorage when dismissed', () => {
    const mockLscacheSet = jest.spyOn(require('lscache'), 'set')
    wrapper = createWrapper({ dismissible: true, dismissibleKey: 'test-key' })

    wrapper.vm.dismiss()

    expect(mockLscacheSet).toHaveBeenCalledWith('test-key', expect.any(Number))

    mockLscacheSet.mockRestore()
  })

  it('renders in dismissed state when localStorage indicates dismissal', () => {
    const mockLscacheGet = jest.spyOn(require('lscache'), 'get').mockReturnValue(1234567890)
    wrapper = createWrapper({ dismissible: true, dismissibleKey: 'test-key' })

    expect(wrapper.find('[data-cy="inlineNotification:message"]').exists()).toBe(false)
    expect(wrapper.find('[data-cy="inlineNotification:showHint"]').exists()).toBe(true)

    mockLscacheGet.mockRestore()
  })
})
