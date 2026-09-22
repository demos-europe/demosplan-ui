import { describe, expect, it } from 'vitest'
import DpDatetimePicker from '~/components/DpDatetimePicker'
import { mount } from '@vue/test-utils'

const DpDatepickerStub = {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: '<button class="date-stub" @click="$emit(\'update:modelValue\', \'14.07.2023\')" />',
}

const DpTimePickerStub = {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: '<button class="time-stub" @click="$emit(\'update:modelValue\', \'09:30\')" />',
}

describe('DpDatetimePicker', () => {
  const mountComponent = () => mount(DpDatetimePicker, {
    props: {
      id: 'test',
      modelValue: '2023-07-13T07:20:00.000Z',
    },
    global: {
      stubs: {
        DpDatepicker: DpDatepickerStub,
        DpTimePicker: DpTimePickerStub,
      },
    },
  })

  it('emits update:modelValue with the combined datetime when the date sub-picker changes', async () => {
    const wrapper = mountComponent()

    await wrapper.find('.date-stub').trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1][0]).toContain('2023-07-14')
  })

  it('emits update:modelValue with the combined datetime when the time sub-picker changes', async () => {
    const wrapper = mountComponent()

    await wrapper.find('.time-stub').trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted[emitted.length - 1][0]).toContain('09:30')
  })
})
