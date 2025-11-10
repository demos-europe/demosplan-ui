import { shallowMount } from '@vue/test-utils'
import DpButtonRow from  '~/components/DpButtonRow/DpButtonRow'
import { de } from '~/components/shared/translations'

describe('DpButtonRow', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return shallowMount(DpButtonRow, {
      props: {
        ...props
      }
    })
  }

  const createMockEvent = () => {
    return { preventDefault: () => {} }
  }

  const getButtons = () => {
    return wrapper.findAllComponents({ name: 'DpButton' })
  }

  const expectButtonColor = (button, color) => {
    expect(button.props().color).toBe(color)
  }

  const expectButtonIsDisabled = (button, isDisabled) => {
    expect(button.props().disabled).toBe(isDisabled)
  }

  const expectButtonLength = (buttons, length) => {
    expect(buttons.length).toBe(length)
  }

  const expectButtonText = (button, text) => {
    expect(button.props().text).toBe(text)
  }

  const expectEventEmission = async (eventName) => {
    const buttons = getButtons()
    await buttons[0].vm.$emit('click', createMockEvent())

    expect(wrapper.emitted(eventName)).toBeTruthy()
    expect(wrapper.emitted(eventName)).toHaveLength(1)
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders primary button when primary prop is true', () => {
      wrapper = createWrapper({ primary: true, secondary: false })
      const buttons = getButtons()

      expectButtonLength(buttons, 1)
      expectButtonColor(buttons[0], 'primary')
    })

    it('does not render primary button when primary prop is false', () => {
      wrapper = createWrapper({ primary: false, secondary: false })
      const buttons = getButtons()

      expectButtonLength(buttons, 0)
    })

    it('renders secondary button when secondary prop is true', () => {
      wrapper = createWrapper({ primary: false, secondary: true })
      const buttons = getButtons()

      expectButtonLength(buttons, 1)
      expectButtonColor(buttons[0], 'secondary')
    })

    it('does not render secondary button when secondary prop is false', () => {
      wrapper = createWrapper({ primary: false, secondary: false })
      const buttons = getButtons()

      expectButtonLength(buttons, 0)
    })

    it('renders both buttons when both props are true', () => {
      wrapper = createWrapper({ primary: true, secondary: true })
      const buttons = getButtons()

      expectButtonLength(buttons, 2)
      expectButtonColor(buttons[0], 'primary')
      expectButtonColor(buttons[1], 'secondary')
    })
  })

  describe('Button text', () => {
    it('passes default primary text to primary button', () => {
      wrapper = createWrapper({ primary: true })
      const buttons = getButtons()

      expect(buttons[0].props('text')).toBe(de.operations.save)
    })

    it('passes custom primary text to primary button', () => {
      const buttonText = 'Save'
      wrapper = createWrapper({ primary: true, primaryText: buttonText })
      const buttons = getButtons()

      expectButtonText(buttons[0], buttonText)
    })

    it('passes default secondary text to secondary button', () => {
      wrapper = createWrapper({ secondary: true })
      const buttons = getButtons()

      expectButtonText(buttons[0], de.operations.abort)
    })

    it('passes custom secondary text to secondary button', () => {
      const buttonText = 'Cancel'
      wrapper = createWrapper({ secondary: true, secondaryText: buttonText })
      const buttons = getButtons()

      expectButtonText(buttons[0], buttonText)
    })
  })

  describe('Disabled state', () => {
    it('disables both buttons when disabled is true', () => {
      wrapper = createWrapper({ primary: true, secondary: true, disabled: true })
      const buttons = getButtons()

      expectButtonIsDisabled(buttons[0], true)
      expectButtonIsDisabled(buttons[1], true)
    })

    it('disables only primary button when disabled object has primary: true', () => {
      wrapper = createWrapper({
        primary: true,
        secondary: true,
        disabled: { primary: true }
      })
      const buttons = getButtons()

      expectButtonIsDisabled(buttons[0], true)
      expectButtonIsDisabled(buttons[1], false)
    })

    it('disables only secondary button when disabled object has secondary: true', () => {
      wrapper = createWrapper({
        primary: true,
        secondary: true,
        disabled: { secondary: true }
      })
      const buttons = getButtons()

      expectButtonIsDisabled(buttons[0], false)
      expectButtonIsDisabled(buttons[1], true)
    })

    it('does not disable buttons when disabled is false', () => {
      wrapper = createWrapper({ primary: true, secondary: true, disabled: false })
      const buttons = getButtons()

      expectButtonIsDisabled(buttons[0], false)
      expectButtonIsDisabled(buttons[1], false)
    })
  })

  describe('Event emission', () => {
    it('emits primary-action when primary button is clicked', async () => {
      wrapper = createWrapper({ primary: true })

      await expectEventEmission('primary-action')
    })

    it('emits secondary-action when secondary button is clicked', async () => {
      wrapper = createWrapper({ secondary: true })

      await expectEventEmission('secondary-action')
    })
  })

  describe('Alignment', () => {
    it('applies text-right class by default', () => {
      wrapper = createWrapper()

      expect(wrapper.classes()).toContain('text-right')
    })

    it('applies text-right class when alignment is right', () => {
      wrapper = createWrapper({ alignment: 'right' })

      expect(wrapper.classes()).toContain('text-right')
    })

    it('applies text-left class when alignment is left', () => {
      wrapper = createWrapper({ alignment: 'left' })

      expect(wrapper.classes()).toContain('text-left')
    })
  })

  describe('Slot rendering', () => {
    it('renders slot content correctly', () => {
      wrapper = shallowMount(DpButtonRow, {
        slots: {
          default: '<button class="test-slot">Extra Button</button>'
        }
      })

      expect(wrapper.find('.test-slot').exists()).toBe(true)
      expect(wrapper.find('.test-slot').text()).toBe('Extra Button')
    })
  })
})
