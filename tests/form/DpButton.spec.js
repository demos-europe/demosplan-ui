import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import DpButton from '~/components/DpButton/DpButton.vue'
import DpIcon from '~/components/DpIcon/DpIcon.vue'

describe('DpButton', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return shallowMount(DpButton, {
      props: {
        text: 'Test Button',
        ...props
      },
      global: {
        directives: {
          tooltip: {}
        }
      }
    })
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Props and Rendering', () => {
    it('renders correctly with default props', () => {
      wrapper = createWrapper()

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.text()).toContain('Test Button')
      expect(wrapper.attributes('disabled')).toBeUndefined()
      expect(wrapper.attributes('type')).toBe('button')

      // Important base classes
      expect(wrapper.classes()).toContain('inline-flex')
      expect(wrapper.classes()).toContain('rounded-button')

      // Most important classes for default primary solid variant
      const classes = wrapper.classes().join(' ')
      expect(classes).toContain('bg-interactive')
      expect(classes).toContain('text-on-dark')
      expect(classes).toContain('border-interactive')
    })

    it('renders all color variants correctly', () => {
      const colors = ['primary', 'secondary', 'warning']

      colors.forEach(color => {
        wrapper = createWrapper({ color })
        expect(wrapper.classes().join(' ')).toMatch(new RegExp(`interactive-${color === 'primary' ? '' : color}`))
      })
    })

    it('renders all variants correctly', () => {
      const variants = ['solid', 'outline', 'subtle']

      variants.forEach(variant => {
        wrapper = createWrapper({ variant })
        const classes = wrapper.classes().join(' ')

        if (variant === 'solid') {
          expect(classes).toContain('bg-interactive')
          expect(classes).toContain('border-interactive')
        }

        if (variant === 'outline') {
          expect(classes).toContain('bg-surface')
          expect(classes).toContain('border-interactive')
        }

        if (variant === 'subtle') {
          expect(classes).toContain('bg-surface')
          expect(classes).toContain('border-on-dark')
        }
      })
    })

    it('renders as link when href is provided', () => {
      wrapper = createWrapper({ href: '/example' })

      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('/example')
    })

    it('renders as button when href is default (#)', () => {
      wrapper = createWrapper({ href: '#' })

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('href')).toBeUndefined()
    })

    it('displays text content correctly', () => {
      wrapper = createWrapper({ text: 'Custom Text' })

      expect(wrapper.find('span').text()).toBe('Custom Text')
    })

    it('renders icon when icon prop is provided', () => {
      wrapper = createWrapper({ icon: 'check' })

      const icon = wrapper.findComponent(DpIcon)
      expect(icon.exists()).toBe(true)
      expect(icon.props('icon')).toBe('check')
    })

    it('renders iconAfter when iconAfter prop is provided', () => {
      wrapper = createWrapper({ iconAfter: 'arrow-right' })

      const icons = wrapper.findAllComponents(DpIcon)
      expect(icons.length).toBe(1)
      expect(icons[0].props('icon')).toBe('arrow-right')
    })

    it('sets icon size correctly', () => {
      wrapper = createWrapper({ icon: 'check', iconSize: 'large' })

      const icon = wrapper.findComponent(DpIcon)
      expect(icon.props('size')).toBe('large')
    })

    it('hides text when hideText is true', () => {
      wrapper = createWrapper({ icon: 'check', hideText: true })

      expect(wrapper.find('span').exists()).toBe(false)
    })

    it('applies rounded class when rounded is true', () => {
      wrapper = createWrapper({ rounded: true })

      expect(wrapper.classes()).toContain('rounded-full')
    })

    it('applies default rounded-button class when rounded is false', () => {
      wrapper = createWrapper({ rounded: false })

      expect(wrapper.classes()).toContain('rounded-button')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-label when hideText is true', () => {
      wrapper = createWrapper({ icon: 'check', hideText: true, text: 'Save' })

      expect(wrapper.attributes('aria-label')).toBe('Save')
    })

    it('does not set aria-label when hideText is false', () => {
      wrapper = createWrapper({ icon: 'check', hideText: false, text: 'Save' })

      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('sets aria-hidden when busy is true', () => {
      wrapper = createWrapper({ busy: true })

      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('does not set aria-hidden when busy is false', () => {
      wrapper = createWrapper({ busy: false })

      expect(wrapper.attributes('aria-hidden')).toBe('false')
    })

    it('adds tooltip directive to icon-only buttons', () => {
      wrapper = createWrapper({ icon: 'check', hideText: true })

      // The tooltip directive should be applied with the text content
      expect(wrapper.vm.iconOnly).toBe(true)
    })

    it('sets icons as aria-hidden', () => {
      wrapper = createWrapper({ icon: 'check' })

      const icon = wrapper.findComponent(DpIcon)
      expect(icon.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Event Handling', () => {
    it('emits click event when clicked', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emits focus event when focused', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event when blurred', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits mousedown event on mousedown', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('mousedown')

      expect(wrapper.emitted('mousedown')).toBeTruthy()
    })

    it('passes event object to emitted events', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('click')

      const clickEvent = wrapper.emitted('click')[0][0]
      expect(clickEvent).toBeDefined()
      expect(clickEvent.type).toBe('click')
    })
  })

  describe('Computed Properties', () => {
    it('iconOnly returns true when icon and hideText are set', () => {
      wrapper = createWrapper({ icon: 'check', hideText: true })

      expect(wrapper.vm.iconOnly).toBe(true)
    })

    it('iconOnly returns true when iconAfter and hideText are set', () => {
      wrapper = createWrapper({ iconAfter: 'check', hideText: true })

      expect(wrapper.vm.iconOnly).toBe(true)
    })

    it('iconOnly returns false when hideText is false', () => {
      wrapper = createWrapper({ icon: 'check', hideText: false })

      expect(wrapper.vm.iconOnly).toBe(false)
    })

    it('element returns "button" when href is default', () => {
      wrapper = createWrapper({ href: '#' })

      expect(wrapper.vm.element).toBe('button')
    })

    it('element returns "a" when href is provided', () => {
      wrapper = createWrapper({ href: '/example' })

      expect(wrapper.vm.element).toBe('a')
    })

    it('isButtonElement returns true when href is default', () => {
      wrapper = createWrapper({ href: '#' })

      expect(wrapper.vm.isButtonElement).toBe(true)
    })

    it('isButtonElement returns false when href is provided', () => {
      wrapper = createWrapper({ href: '/example' })

      expect(wrapper.vm.isButtonElement).toBe(false)
    })

    it('sanitizedHref sanitizes malicious URLs', () => {
      wrapper = createWrapper({ href: 'javascript:alert("xss")' })

      expect(wrapper.vm.sanitizedHref).toBe('about:blank')
    })

    it('sanitizedHref preserves valid URLs', () => {
      wrapper = createWrapper({ href: '/example' })

      expect(wrapper.vm.sanitizedHref).toBe('/example')
    })
  })

  describe('Attributes', () => {
    it('sets type attribute only on button elements', () => {
      wrapper = createWrapper({ type: 'submit' })

      expect(wrapper.attributes('type')).toBe('submit')
    })

    it('does not set type attribute on anchor elements', () => {
      wrapper = createWrapper({ href: '/example', type: 'submit' })

      expect(wrapper.attributes('type')).toBeUndefined()
    })

    it('sets href attribute only on anchor elements', () => {
      wrapper = createWrapper({ href: '/example' })

      expect(wrapper.attributes('href')).toBe('/example')
    })

    it('does not set href attribute on button elements', () => {
      wrapper = createWrapper({ href: '#' })

      expect(wrapper.attributes('href')).toBeUndefined()
    })

    it('defaults type to "button"', () => {
      wrapper = createWrapper()

      expect(wrapper.attributes('type')).toBe('button')
    })

    it('sets disabled attribute when disabled is true', () => {
      wrapper = createWrapper({ disabled: true })

      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('does not set disabled attribute when disabled is false', () => {
      wrapper = createWrapper({ disabled: false })

      expect(wrapper.attributes('disabled')).toBeUndefined()
    })
  })

  // State Tests
  describe('State Handling', () => {
    it('adds busy classes when busy is true', () => {
      wrapper = createWrapper({ busy: true })

      expect(wrapper.classes()).toContain('bg-busy')
      expect(wrapper.classes()).toContain('animate-busy')
      expect(wrapper.classes()).toContain('pointer-events-none')
    })

    it('does not add busy classes when busy is false', () => {
      wrapper = createWrapper({ busy: false })

      expect(wrapper.classes()).not.toContain('bg-busy')
      expect(wrapper.classes()).not.toContain('animate-busy')
    })

    it('adds disabled classes when disabled is true', () => {
      wrapper = createWrapper({ disabled: true })

      expect(wrapper.classes()).toContain('opacity-40')
      expect(wrapper.classes()).toContain('pointer-events-none')
    })

    it('does not add disabled classes when disabled is false', () => {
      wrapper = createWrapper({ disabled: false })

      expect(wrapper.classes()).not.toContain('opacity-40')
    })

    it('handles busy and disabled states together', () => {
      wrapper = createWrapper({ busy: true, disabled: true })

      expect(wrapper.classes()).toContain('bg-busy')
      expect(wrapper.classes()).toContain('opacity-40')
      expect(wrapper.classes()).toContain('pointer-events-none')
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('logs console error when hideText is true but no icons provided', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      wrapper = createWrapper({ hideText: true, icon: '', iconAfter: '' })

      expect(consoleSpy).toHaveBeenCalledWith(
        'A DpButton instance is used without icon or visible text. Consider showing something to users.'
      )

      consoleSpy.mockRestore()
    })

    it('does not log error when hideText is true and icon is provided', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      wrapper = createWrapper({ hideText: true, icon: 'check' })

      expect(consoleSpy).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles null values for busy prop', () => {
      wrapper = createWrapper({ busy: null })

      expect(wrapper.classes()).not.toContain('bg-busy')
    })

    it('handles null values for disabled prop', () => {
      wrapper = createWrapper({ disabled: null })

      expect(wrapper.classes()).not.toContain('opacity-40')
    })

    it('validates color prop correctly', () => {
      const validator = DpButton.props.color.validator

      expect(validator('primary')).toBe(true)
      expect(validator('secondary')).toBe(true)
      expect(validator('warning')).toBe(true)
      expect(validator('invalid')).toBe(false)
    })

    it('validates variant prop correctly', () => {
      const validator = DpButton.props.variant.validator

      expect(validator('solid')).toBe(true)
      expect(validator('outline')).toBe(true)
      expect(validator('subtle')).toBe(true)
      expect(validator('invalid')).toBe(false)
    })

    it('validates type prop correctly', () => {
      const validator = DpButton.props.type.validator

      expect(validator('button')).toBe(true)
      expect(validator('submit')).toBe(true)
      expect(validator('reset')).toBe(true)
      expect(validator('invalid')).toBe(false)
    })

    it('validates iconSize prop correctly', () => {
      const validator = DpButton.props.iconSize.validator

      expect(validator('small')).toBe(true)
      expect(validator('medium')).toBe(true)
      expect(validator('large')).toBe(true)
      expect(validator('invalid')).toBe(false)
    })

    it('handles empty string for icon props', () => {
      wrapper = createWrapper({ icon: '', iconAfter: '' })

      expect(wrapper.findAllComponents(DpIcon)).toHaveLength(0)
    })

    it('adjusts padding for icon-only buttons based on icon size', () => {
      const sizes = [
        { size: 'small', expectedClass: 'p-0.5' },
        { size: 'medium', expectedClass: 'p-[5px]' },
        { size: 'large', expectedClass: 'p-1.5' }
      ]

      sizes.forEach(({ size, expectedClass }) => {
        wrapper = createWrapper({ icon: 'check', hideText: true, iconSize: size })
        expect(wrapper.classes()).toContain(expectedClass)
      })
    })
  })
})
