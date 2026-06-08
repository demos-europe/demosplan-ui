import DpToggle from '~/components/DpToggle'
import { shallowMount } from '@vue/test-utils'

describe('DpToggle', () => {
  it('emits "input" with the inverted value on click', async () => {
    const wrapper = shallowMount(DpToggle, { props: { value: false } })

    await wrapper.find('.toggle-wrapper').trigger('click')

    expect(wrapper.emitted('input')[0]).toEqual([true])
  })

  it('emits "input" on space keydown', async () => {
    const wrapper = shallowMount(DpToggle, { props: { value: true } })

    await wrapper.find('.toggle-wrapper').trigger('keydown.space')

    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = shallowMount(DpToggle, { props: { value: false, disabled: true } })

    await wrapper.find('.toggle-wrapper').trigger('click')

    expect(wrapper.emitted('input')).toBeUndefined()
  })

  it('reflects the value in aria-checked', () => {
    const checkedWrapper = shallowMount(DpToggle, { props: { value: true } })
    expect(checkedWrapper.find('.toggle-wrapper').attributes('aria-checked')).toBe('true')

    const uncheckedWrapper = shallowMount(DpToggle, { props: { value: false } })
    expect(uncheckedWrapper.find('.toggle-wrapper').attributes('aria-checked')).toBe('false')
  })
})
