import DpNotification from '~/components/DpNotification'
import { mount } from '@vue/test-utils'

describe('DpNotification', () => {
  it('is named DpNotification', () => {
    expect(DpNotification.hasOwnProperty('name')).toBe(true)
    expect(DpNotification.name).toBe('DpNotification')
  })

  it('chooses the message class based on it\'s type', () => {
    const validCombinations = [
      {
        type: 'confirm',
        clazz: 'c-notify__message--confirm'
      },
      {
        type: 'info',
        clazz: 'c-notify__message--info'
      },
      {
        type: 'warning',
        clazz: 'c-notify__message--warning'
      }
    ]

    for (const val of validCombinations) {
      const wrapper = mount(DpNotification, {
        propsData: {
          message: {
            type: val.type
          }
        }
      })

      expect(wrapper.vm.messageClass).toBe(val.clazz)
    }
  })

  it('always renders with closemark', () => {
    let wrapper = mount(DpNotification, {
      propsData: {
        message: {
          type: 'error'
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    let closer = wrapper.find('i.c-notify__closer')
    expect(closer.element.tagName).toStrictEqual('I')

    wrapper = mount(DpNotification, {
      propsData: {
        message: {
          type: 'confirm'
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    closer = wrapper.find('i.c-notify__closer')
    expect(closer.element.tagName).toStrictEqual('I')
  })

  it('renders the message text', () => {
    const wrapper = mount(DpNotification, {
      propsData: {
        message: {
          type: 'confirm',
          text: 'MessageText'
        }
      }
    })

    expect(wrapper.find('.flow-root > .u-ml').text()).toBe('MessageText')
  })

  it('renders a link if link attributes are given', () => {
    const wrapper = mount(DpNotification, {
      propsData: {
        message: {
          type: 'confirm',
          text: 'MessageText',
          linkUrl: 'about:blank',
          linkText: 'LinkText'
        }
      }
    })

    expect(wrapper.find('.flow-root > .u-ml').text()).toBe('MessageText\n      \n        LinkText')
  })

  it('emits dp-notify-remove with it\'s message as payload once clicked', (done) => {
    const message = {
      type: 'confirm',
      text: 'MessageText'
    }

    const wrapper = mount(DpNotification, {
      propsData: {
        message: message
      }
    })

    wrapper.vm.$on('dp-notify-remove', (payload) => {
      expect(payload).toBe(message)
      done()
    })

    wrapper.find('.c-notify__closer').trigger('click')
  })

  it('emits dp-notify-remove after hide timeout idle', (done) => {
    const message = {
      type: 'confirm',
      text: 'MessageText'
    }

    const wrapper = mount(DpNotification, {
      propsData: {
        message: message,
        hideTimer: 25 // Make this timeout reasonably short to keep the test time low
      }
    })

    wrapper.vm.$on('dp-notify-remove', (payload) => {
      expect(payload).toBe(message)
      done()
    })
  })
})
