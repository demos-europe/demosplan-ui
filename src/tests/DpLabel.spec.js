/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

import { shallowMount } from '@vue/test-utils'
import { DpLabel } from '../components'

describe('DpLabel', () => {
  const wrapper = shallowMount(DpLabel, {
    propsData: {
      for: 'test for',
      hint: '',
      text: 'test text'
    }
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
