import DpLabel from '~/components/DpLabel/DpLabel.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpLabel', () => {
  const wrapper = shallowMount(DpLabel, {
    props: {
      for: 'test for',
      hint: '',
      text: 'test text',
    },
  })

  it('returns empty array when hint props is empty', () => {
    expect(wrapper.vm.hints).toEqual(expect.arrayContaining([]))
  })

  it('returns array of string when hint props contains string value', async () => {
    await wrapper.setProps({ hint: 'test hint' })

    expect(wrapper.vm.hints).toEqual(expect.arrayContaining(['test hint']))
  })

  it('returns same array of string as hint props', async () => {
    await wrapper.setProps({ hint: ['test hint'] })

    expect(wrapper.vm.hints).toEqual(expect.arrayContaining(['test hint']))
  })
})
