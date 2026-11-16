import {
  describe,
  expect,
  it,
} from 'vitest'

import DpTextArea from '~/components/DpTextArea/DpTextArea.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpTextArea', () => {
  it('renders the modelValue in the textarea', () => {
    const wrapper = shallowMount(DpTextArea, { props: { modelValue: 'initial text' } })

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('initial text')
  })

  it('emits update:modelValue when the user types', async () => {
    const wrapper = shallowMount(DpTextArea, { props: { modelValue: '' } })

    await wrapper.find('textarea').setValue('typed text')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['typed text'])
  })

  it('updates the textarea when modelValue changes', async () => {
    const wrapper = shallowMount(DpTextArea, { props: { modelValue: 'old' } })

    await wrapper.setProps({ modelValue: 'new' })

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('new')
  })
})
