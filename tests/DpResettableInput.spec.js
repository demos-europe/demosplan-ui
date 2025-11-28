import DpResettableInput from '~/components/DpResettableInput'
import { shallowMount } from '@vue/test-utils'

describe('DpResettableInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpResettableInput, {
      props: {
        id: 'testInput',
      },
    })
  })

  const testForwardsEventWithValue = async (eventName, value) => {
    wrapper = shallowMount(DpResettableInput, {
      props: {
        id: 'testInput',
        value,
      },
    })
    const dpInput = wrapper.findComponent({ name: 'DpInput' })

    await dpInput.vm.$emit(eventName)

    expect(wrapper.emitted(eventName)).toBeTruthy()
    expect(wrapper.emitted(eventName)[0]).toEqual([value])
  }

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('Event handling', () => {
    it('emits blur event when input loses focus', async () => {
      await testForwardsEventWithValue('blur', 'test value')
    })

    it('emits input event when user types', async () => {
      const dpInput = wrapper.findComponent({ name: 'DpInput' })

      await dpInput.vm.$emit('update:model-value', 'new value')

      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')[0]).toEqual(['new value'])
    })

    it('emits enter event when user presses enter', async () => {
      await testForwardsEventWithValue('enter', 'enter value')
    })

    it('emits focus event when input is focused', async () => {
      const dpInput = wrapper.findComponent({ name: 'DpInput' })

      await dpInput.vm.$emit('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits reset event when reset button is clicked', async () => {
      wrapper = shallowMount(DpResettableInput, {
        props: {
          id: 'testInput',
          value: 'some value',
        },
      })
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      await resetButton.trigger('click')

      expect(wrapper.emitted('reset')).toBeTruthy()
    })
  })

  describe('Reset button', () => {
    it('renders reset button with accessible label', () => {
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.exists()).toBe(true)
      expect(resetButton.attributes('aria-label')).toBeDefined()
    })

    it('applies medium variant class by default', () => {
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.classes()).toContain('o-form__control-search-reset')
    })

    it('applies small variant class when buttonVariant is small', () => {
      wrapper = shallowMount(DpResettableInput, {
        props: {
          id: 'testInput',
          buttonVariant: 'small',
        },
      })
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.classes()).toContain('o-form__control-search-reset--small')
    })

    it('hides reset button when input is disabled', () => {
      wrapper = shallowMount(DpResettableInput, {
        props: {
          id: 'testInput',
          inputAttributes: { disabled: true },
        },
      })
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.exists()).toBe(false)
    })

    it('disables reset button when value equals defaultValue', () => {
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.attributes('disabled')).toBeDefined()
    })

    it('enables reset button when user types', async () => {
      let resetButton = wrapper.find('[data-cy="resetButton"]')
      expect(resetButton.attributes('disabled')).toBeDefined()

      const dpInput = wrapper.findComponent({ name: 'DpInput' })
      await dpInput.vm.$emit('update:model-value', 'some value')
      await wrapper.vm.$nextTick()

      resetButton = wrapper.find('[data-cy="resetButton"]')
      expect(resetButton.attributes('disabled')).toBeUndefined()
    })

    it('shows tooltip when reset button is enabled', () => {
      wrapper = shallowMount(DpResettableInput, {
        props: {
          id: 'testInput',
          value: 'some value',
        },
      })
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.attributes('title')).toBeDefined()
    })

    it('hides tooltip when reset button is disabled', () => {
      const resetButton = wrapper.find('[data-cy="resetButton"]')

      expect(resetButton.attributes('title')).toBeUndefined()
    })
  })

  describe('Slot rendering', () => {
    it('renders slot content correctly', () => {
      wrapper = shallowMount(DpResettableInput, {
        props: {
          id: 'testInput',
        },
        slots: {
          default: '<span class="test-slot">Slot content</span>',
        },
      })

      expect(wrapper.find('.test-slot').exists()).toBe(true)
      expect(wrapper.find('.test-slot').text()).toBe('Slot content')
    })
  })
})
