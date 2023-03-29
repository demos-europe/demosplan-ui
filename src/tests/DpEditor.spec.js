/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

import DpEditor from '../components/core/DpEditor/DpEditor'
import { shallowMount } from '@vue/test-utils'

describe('Tiptap', () => {
  it('currentValue should reflect the input value', () => {
    const instance = shallowMount(DpEditor, {
      propsData: {
        value: 'test'
      }
    })

    const tiptap = instance.vm

    expect(tiptap.currentValue).toBe('test')
  })
})
