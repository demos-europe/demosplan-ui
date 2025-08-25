import { shallowMount } from '@vue/test-utils'
import DpCheckboxGroup from '~/components/DpCheckboxGroup/DpCheckboxGroup.vue'

describe('DpCheckboxGroup', () => {
  let wrapper

  const defaultOptions = [
    { id: 'option1', label: 'Option 1', name: 'test-option-1' },
    { id: 'option2', label: 'Option 2', name: 'test-option-2' },
    { id: 'option3', label: 'Option 3' }
  ]

  beforeEach(() => {
    wrapper = shallowMount(DpCheckboxGroup, {
      props: {
        options: defaultOptions,
        label: 'Test Legend',
        inline: false,
        dataCy: 'test-group'
      }
    })
  })

  it('initializes selected state with all options set to false', () => {
    expect(wrapper.vm.selected).toEqual({
      option1: false,
      option2: false,
      option3: false
    })
  })

  it('updates selected state when selectedOptions prop changes', async () => {
    await wrapper.setProps({
      selectedOptions: { option1: true, option2: false, option3: true }
    })
    expect(wrapper.vm.selected).toEqual({
      option1: true,
      option2: false,
      option3: true
    })
  })

  it('emits update event when checkbox changes', async () => {
    const firstCheckbox = wrapper.findAllComponents({ name: 'DpCheckbox' })[0]

    await firstCheckbox.vm.$emit('change', true)

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')[0]).toEqual([{
      option1: true,
      option2: false,
      option3: false
    }])
  })

  it('emits update event with correct merged state', async () => {
    wrapper.vm.selected = { option1: true, option2: false, option3: false }

    const secondCheckbox = wrapper.findAllComponents({ name: 'DpCheckbox' })[1]
    await secondCheckbox.vm.$emit('change', true)

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')[0]).toEqual([{
      option1: true,
      option2: true,
      option3: false
    }])
  })

  it('preserves initial selectedOptions on mount', () => {
    const initialSelectedOptions = { option1: true, option2: false, option3: true }
    const wrapperWithInitialSelection = shallowMount(DpCheckboxGroup, {
      props: {
        options: defaultOptions,
        selectedOptions: initialSelectedOptions
      }
    })

    expect(wrapperWithInitialSelection.vm.selected).toEqual({
      option1: true,
      option2: false,
      option3: true
    })
  })

  it('updates selected state when options prop changes', async () => {
    const newOptions = [
      { id: 'newOption1', label: 'New Option 1' },
      { id: 'newOption2', label: 'New Option 2' }
    ]

    await wrapper.setProps({
      options: newOptions,
      selectedOptions: { newOption1: true, newOption2: false }
    })

    expect(wrapper.vm.selected).toEqual({
      newOption1: true,
      newOption2: false
    })
  })

  it('handles partial selectedOptions coverage', () => {
    const partialSelectedOptions = { option1: true }
    const wrapperWithPartial = shallowMount(DpCheckboxGroup, {
      props: {
        options: defaultOptions,
        selectedOptions: partialSelectedOptions
      }
    })

    expect(wrapperWithPartial.vm.selected).toEqual({
      option1: true,
      option2: false,
      option3: false
    })
  })
})
