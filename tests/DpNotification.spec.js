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
        props: {
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
      props: {
        message: {
          type: 'error'
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    let closer = wrapper.find('i.c-notify__closer')
    expect(closer.element.tagName).toStrictEqual('I')

    wrapper = mount(DpNotification, {
      props: {
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
      props: {
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
      props: {
        message: {
          type: 'confirm',
          text: 'MessageText',
          linkUrl: 'about:blank',
          linkText: 'LinkText'
        }
      }
    })

    expect(wrapper.find('.flow-root > .u-ml').text()).toBe('MessageText LinkText')
  })

  /*
   * For some reason this Test takes over 6 seconds to pass
   */
  // it('emits dp-notify-remove with its message as payload once clicked', (done) => {
  //   const message = {
  //     type: 'confirm',
  //     text: 'MessageText'
  //   }
  //
  //   const wrapper = mount(DpNotification, {
  //     props: {
  //       message: message,
  //       hideTimer: 2
  //     }
  //   })
  //
  //   wrapper.find('.c-notify__closer').trigger('click')
  //
  //   expect(wrapper.emitted()).toHaveProperty('dp-notify-remove')
  //   expect(wrapper.emitted()['dp-notify-remove'][0]).toEqual([message])
  // })

  /*
   * For some reason this Test takes over 6 seconds to pass
   */
  // it('emits dp-notify-remove after hide timeout idle', (done) => {
  //   const message = { type: 'confirm', text: 'MessageText' }
  //
  //   const wrapper = mount(DpNotification, {
  //     props: {
  //       message: message,
  //       hideTimer: 25 // Make this timeout reasonably short to keep the test time low
  //     }
  //   })
  //
  //   console.log('test notification')
  //
  //   jest.setTimeout(() => {
  //     console.log('test notification timeout ', wrapper.emitted()['dp-notify-remove'][0])
  //     expect(wrapper.emitted()).toHaveProperty('dp-notify-remove')
  //     expect(wrapper.emitted()['dp-notify-remove'][0]).toEqual([message])
  //
  //   }, 27)
  // }, 30000)
})
