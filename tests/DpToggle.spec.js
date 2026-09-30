import DpToggle from '~/components/DpToggle'
import { shallowMount } from '@vue/test-utils'

describe('DpToggle', () => {
  it('emits "update:modelValue" with the inverted value on click', async () => {
    const wrapper = shallowMount(DpToggle, { props: { modelValue: false } })

    await wrapper.find('.toggle-wrapper').trigger('click')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('emits "update:modelValue" on space keydown', async () => {
    const wrapper = shallowMount(DpToggle, { props: { modelValue: true } })

    await wrapper.find('.toggle-wrapper').trigger('keydown.space')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = shallowMount(DpToggle, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    await wrapper.find('.toggle-wrapper').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('reflects the value in aria-checked', () => {
    const checkedWrapper = shallowMount(DpToggle, { props: { modelValue: true } })
    expect(checkedWrapper.find('.toggle-wrapper').attributes('aria-checked')).toBe('true')

    const uncheckedWrapper = shallowMount(DpToggle, { props: { modelValue: false } })
    expect(uncheckedWrapper.find('.toggle-wrapper').attributes('aria-checked')).toBe('false')
  })
})
