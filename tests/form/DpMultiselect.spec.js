import { config, mount, shallowMount } from '@vue/test-utils'
import { h } from 'vue'
import { de } from '~/components/shared/translations'
import DpMultiselect from '~/components/DpMultiselect/DpMultiselect'

const VueMultiselectStub = {
  name: 'VueMultiselect',
  props: [
    'allowEmpty',
    'clearOnSelect',
    'closeOnSelect',
    'customLabel',
    'deselectGroupLabel',
    'deselectLabel',
    'disabled',
    'groupLabel',
    'groupSelect',
    'groupValues',
    'id',
    'internalSearch',
    'label',
    'loading',
    'maxHeight',
    'modelValue',
    'multiple',
    'name',
    'openDirection',
    'options',
    'placeholder',
    'searchable',
    'selectGroupLabel',
    'selectLabel',
    'selectedLabel',
    'tagPlaceholder',
    'trackBy'
  ],
  emits: [
    'close',
    'update:model-value',
    'open',
    'remove',
    'search-change',
    'select',
    'tag'
  ],
  render () {
    return h('div', { class: 'vue-multiselect-mock' }, [
      this.$slots.noOptions?.(),
      this.$slots.noResult?.(),
      this.$slots.beforeList?.(),
    ])
  },
}

describe('DpMultiselect', () => {
  const stringOptions = ['Option 1', 'Option 2', 'Option 3']
  const objectOptions = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ]

  beforeEach(() => {
    config.global.stubs = { VueMultiselect: VueMultiselectStub }
  })

  afterEach(() => {
    config.global.stubs = {}
  })

  describe('Component Basics', () => {
    it('renders without crashing with minimum required props', () => {
      const wrapper = shallowMount(DpMultiselect, {
        props: { options: stringOptions },
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'VueMultiselect' }).exists()).toBe(true)
    })
  })

  describe('Validation', () => {
    it('applies is-required class when multiselect is required', () => {
      const wrapper = shallowMount(DpMultiselect, {
        props: {
          options: stringOptions,
          required: true,
        },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })

      expect(multiselect.classes()).toContain('is-required')
    })

    it('does not apply is-required class when multiselect is not required', () => {
      const wrapper = shallowMount(DpMultiselect, {
        props: {
          options: stringOptions,
          required: false,
        },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })

      expect(multiselect.classes()).not.toContain('is-required')
    })
  })

  describe('Selection Controls', () => {
    it('does not render selection controls by default', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
        },
      })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="multiselect-deselect-all"]').exists()).toBe(false)
    })

    it('renders selection controls when enabled', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
          selectionControls: true,
        },
      })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="multiselect-deselect-all"]').exists()).toBe(true)
    })

    it('disables \'select all\' button when all options are selected', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: stringOptions,
          multiple: true,
          selectionControls: true,
        },
      })

      const selectAllButton = wrapper.find('[data-testid="multiselect-select-all"]')

      expect(selectAllButton.attributes('disabled')).toBeDefined()
    })

    it('enables \'select all\' button when not all options are selected', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: ['Option 1'],
          multiple: true,
          selectionControls: true,
        },
      })

      const selectAllButton = wrapper.find('[data-testid="multiselect-select-all"]')

      expect(selectAllButton.attributes('disabled')).toBeUndefined()
    })

    it('disables \'deselect-all\' button when no options are selected', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
          selectionControls: true,
        },
      })

      const deselectAllButton = wrapper.find('[data-testid="multiselect-deselect-all"]')

      expect(deselectAllButton.attributes('disabled')).toBeDefined()
    })

    it('enables \'deselect-all\' button when options are selected', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: ['Option 1'],
          multiple: true,
          selectionControls: true,
        },
      })

      const deselectAllButton = wrapper.find('[data-testid="multiselect-deselect-all"]')

      expect(deselectAllButton.attributes('disabled')).toBeUndefined()
    })

    it('emits selectAll event with all options when \'select all\' button is clicked', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
          selectionControls: true,
        },
      })

      const selectAllButton = wrapper.find('[data-testid="multiselect-select-all"]')
      await selectAllButton.trigger('click')

      expect(wrapper.emitted('selectAll')).toBeTruthy()
      expect(wrapper.emitted('selectAll')).toHaveLength(1)
      expect(wrapper.emitted('selectAll')[0][0]).toEqual(stringOptions)
    })

    it('emits deselectAll event when \'deselect-all\' button is clicked', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: ['Option 1'],
          multiple: true,
          selectionControls: true,
        },
      })

      const deselectAllButton = wrapper.find('[data-testid="multiselect-deselect-all"]')
      await deselectAllButton.trigger('click')

      expect(wrapper.emitted('deselectAll')).toBeTruthy()
      expect(wrapper.emitted('deselectAll')).toHaveLength(1)
    })

    it('emits selectAll with full objects when options are objects', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: objectOptions,
          value: [],
          trackBy: 'id',
          label: 'name',
          multiple: true,
          selectionControls: true,
        },
      })

      const selectAllButton = wrapper.find('[data-testid="multiselect-select-all"]')
      await selectAllButton.trigger('click')

      expect(wrapper.emitted('selectAll')[0][0]).toEqual(objectOptions)
    })

    it('enables deselect button after value changes from empty to partial', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: ['A', 'B', 'C'],
          value: [],
          multiple: true,
          selectionControls: true,
        },
      })

      expect(wrapper.find('[data-testid="multiselect-deselect-all"]').attributes('disabled')).toBeDefined()

      await wrapper.setProps({ value: ['A'] })

      expect(wrapper.find('[data-testid="multiselect-deselect-all"]').attributes('disabled')).toBeUndefined()
    })

    it('disables select-all button after value changes to all selected', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: ['A', 'B', 'C'],
          value: ['A'],
          multiple: true,
          selectionControls: true,
        },
      })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').attributes('disabled')).toBeUndefined()

      await wrapper.setProps({ value: ['A', 'B', 'C'] })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').attributes('disabled')).toBeDefined()
    })

    it('enables select-all button after value changes from all to partial', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: ['A', 'B', 'C'],
          value: ['A', 'B', 'C'],
          multiple: true,
          selectionControls: true,
        },
      })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').attributes('disabled')).toBeDefined()

      await wrapper.setProps({ value: ['A'] })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').attributes('disabled')).toBeUndefined()
    })

    it('uses custom dataCy value for selection control test ids', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
          selectionControls: true,
          dataCy: 'my-select',
        },
      })

      expect(wrapper.find('[data-testid="my-select-select-all"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="my-select-deselect-all"]').exists()).toBe(true)
    })
})

  describe('Translation display', () => {
    it('provides German translation defaults to vue-multiselect', () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: stringOptions },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })
      expect(multiselect.props('placeholder')).toBe(de.choose)
      expect(multiselect.props('tagPlaceholder')).toBe(de.tag.create)
    })

    it('allows translation defaults to be overridden', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          placeholder: 'Custom placeholder',
        },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })
      expect(multiselect.props('placeholder')).toBe('Custom placeholder')
    })

    it('renders German translations in slots', () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: [] },
      })

      expect(wrapper.text()).toContain(de.noEntriesAvailable)
      expect(wrapper.text()).toContain(de.autocompleteNoResults)
    })
  })

  describe('Slot Overrides', () => {
    it('allows custom noOptions slot content', () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: [] },
        slots: {
          noOptions: '<div class="custom-no-options">No items available</div>',
        },
      })

      expect(wrapper.find('.custom-no-options').exists()).toBe(true)
      expect(wrapper.text()).toContain('No items available')
    })

    it('allows custom noResult slot content', () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: stringOptions },
        slots: {
          noResult: '<div class="custom-no-result">Nothing found</div>',
        },
      })

      expect(wrapper.find('.custom-no-result').exists()).toBe(true)
      expect(wrapper.text()).toContain('Nothing found')
    })

    it('allows custom beforeList slot to replace selection controls', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
          selectionControls: true,
        },
        slots: {
          beforeList: '<div class="custom-controls">Custom controls</div>',
        },
      })

      expect(wrapper.find('.custom-controls').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom controls')
      // Default buttons should not be present
      expect(wrapper.find('[data-testid="multiselect-select-all"]').exists()).toBe(false)
    })
  })

  describe('Event Forwarding', () => {
    it('emits input when vue-multiselect emits update:model-value', async () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: stringOptions },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })
      await multiselect.vm.$emit('update:model-value', 'Option 2')

      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')[0][0]).toBe('Option 2')
    })

    it.each([
      ['close'],
      ['open'],
      ['remove'],
      ['search-change'],
      ['select'],
      ['tag'],
    ])('forwards %s event from vue-multiselect', async (eventName) => {
      const wrapper = mount(DpMultiselect, {
        props: { options: stringOptions },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })
      await multiselect.vm.$emit(eventName, 'payload')

      expect(wrapper.emitted(eventName)).toHaveLength(1)
      expect(wrapper.emitted(eventName)[0][0]).toBe('payload')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-required when required is true', () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: stringOptions, required: true },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })
      expect(multiselect.attributes('aria-required')).toBe('true')
    })

    it('does not set aria-required when required is false', () => {
      const wrapper = mount(DpMultiselect, {
        props: { options: stringOptions, required: false },
      })

      const multiselect = wrapper.findComponent({ name: 'VueMultiselect' })
      expect(multiselect.attributes('aria-required')).toBe('false')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty options array without errors', () => {
      const wrapper = shallowMount(DpMultiselect, {
        props: { options: [] },
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('prevents selection control interaction when disabled', async () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          value: [],
          multiple: true,
          selectionControls: true,
          disabled: true,
        },
      })

      const selectAllButton = wrapper.find('[data-testid="multiselect-select-all"]')
      await selectAllButton.trigger('click')

      expect(wrapper.emitted('selectAll')).toBeUndefined()
    })

    it('handles undefined value with selection controls gracefully', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          // value intentionally omitted
          multiple: true,
          selectionControls: true,
        },
      })

      // Component shouldn't crash
      expect(wrapper.find('[data-testid="multiselect-select-all"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="multiselect-deselect-all"]').exists()).toBe(true)
    })

    it('handles object options with missing trackBy', () => {
      const wrapper = shallowMount(DpMultiselect, {
        props: {
          options: objectOptions,
          // trackBy intentionally omitted - will use object reference equality
          value: objectOptions[0],
        },
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('hides selection controls when multiple is false', () => {
      const wrapper = mount(DpMultiselect, {
        props: {
          options: stringOptions,
          selectionControls: true,
          multiple: false,
          value: '',
        },
      })

      expect(wrapper.find('[data-testid="multiselect-select-all"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="multiselect-deselect-all"]').exists()).toBe(false)
    })

})
})
