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

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders primary button when primary prop is true', () => {
      wrapper = createWrapper({ primary: true, secondary: false })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents.length).toBe(1)
      expect(buttonComponents[0].props().color).toBe('primary')
    })

    it('does not render primary button when primary prop is false', () => {
      wrapper = createWrapper({ primary: false, secondary: false })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents.length).toBe(0)
    })

    it('renders secondary button when secondary prop is true', () => {
      wrapper = createWrapper({ primary: false, secondary: true })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents.length).toBe(1)
      expect(buttonComponents[0].props().color).toBe('secondary')
    })

    it('does not render secondary button when secondary prop is false', () => {
      wrapper = createWrapper({ primary: false, secondary: false })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents.length).toBe(0)
    })

    it('renders both buttons when both props are true', () => {
      wrapper = createWrapper({ primary: true, secondary: true })
      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })

      expect(buttonComponents.length).toBe(2)
      expect(buttonComponents[0].props().color).toBe('primary')
      expect(buttonComponents[1].props().color).toBe('secondary')
    })
  })

  describe('Button text', () => {
    it('passes default primary text to primary button', () => {
      wrapper = createWrapper({ primary: true })

      const primaryButton = wrapper.findComponent({ name: 'DpButton' })
      expect(primaryButton.props('text')).toBe(de.operations.save)
    })

    it('passes custom primary text to primary button', () => {
      wrapper = createWrapper({ primary: true, primaryText: 'Save Changes' })

      const primaryButton = wrapper.findComponent({ name: 'DpButton' })
      expect(primaryButton.props('text')).toBe('Save Changes')
    })

    it('passes default secondary text to secondary button', () => {
      wrapper = createWrapper({ secondary: true })

      const secondaryButton = wrapper.findComponent({ name: 'DpButton' })
      expect(secondaryButton.props('text')).toBe(de.operations.abort)
    })

    it('passes custom secondary text to secondary button', () => {
      wrapper = createWrapper({ secondary: true, secondaryText: 'Cancel Operation' })

      const secondaryButton = wrapper.findComponent({ name: 'DpButton' })
      expect(secondaryButton.props('text')).toBe('Cancel Operation')
    })
  })

  describe('Disabled state', () => {
    it('disables both buttons when disabled is true', () => {
      wrapper = createWrapper({ primary: true, secondary: true, disabled: true })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents[0].props('disabled')).toBe(true)
      expect(buttonComponents[1].props('disabled')).toBe(true)
    })

    it('disables only primary button when disabled object has primary: true', () => {
      wrapper = createWrapper({
        primary: true,
        secondary: true,
        disabled: { primary: true }
      })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents[0].props('disabled')).toBe(true)
      expect(buttonComponents[1].props('disabled')).toBe(false)
    })

    it('disables only secondary button when disabled object has secondary: true', () => {
      wrapper = createWrapper({
        primary: true,
        secondary: true,
        disabled: { secondary: true }
      })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents[0].props('disabled')).toBe(false)
      expect(buttonComponents[1].props('disabled')).toBe(true)
    })

    it('does not disable buttons when disabled is false', () => {
      wrapper = createWrapper({ primary: true, secondary: true, disabled: false })

      const buttonComponents = wrapper.findAllComponents({ name: 'DpButton' })
      expect(buttonComponents[0].props('disabled')).toBe(false)
      expect(buttonComponents[1].props('disabled')).toBe(false)
    })
  })

  describe('Event emission', () => {
    it('emits primary-action when primary button is clicked', async () => {
      wrapper = createWrapper({ primary: true })

      const primaryButton = wrapper.findComponent({ name: 'DpButton' })
      const mockEvent = { preventDefault: () => {} }
      await primaryButton.vm.$emit('click', mockEvent)

      expect(wrapper.emitted('primary-action')).toBeTruthy()
      expect(wrapper.emitted('primary-action')).toHaveLength(1)
    })

    it('emits secondary-action when secondary button is clicked', async () => {
      wrapper = createWrapper({ secondary: true })

      const secondaryButton = wrapper.findComponent({ name: 'DpButton' })
      const mockEvent = { preventDefault: () => {} }
      await secondaryButton.vm.$emit('click', mockEvent)

      expect(wrapper.emitted('secondary-action')).toBeTruthy()
      expect(wrapper.emitted('secondary-action')).toHaveLength(1)
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
