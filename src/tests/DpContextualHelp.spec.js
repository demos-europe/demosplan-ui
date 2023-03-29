/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

import { createLocalVue, shallowMount } from '@vue/test-utils'
import DpContextualHelp from '../components/core/DpContextualHelp'

describe('DpContextualHelp', () => {
  it('should be an object', () => {
    expect(typeof DpContextualHelp).toBe('object')
  })

  it('should be named DpContextualHelp', () => {
    expect(DpContextualHelp.name).toBe('DpContextualHelp')
  })

  it('should render the correct html', async () => {
    const localVue = createLocalVue()

    console.log('localVue')
    console.log(localVue)
    const instance = shallowMount(DpContextualHelp, {
      propsData: {
        text: 'This is the tooltip content.'
      },
      localVue
    })

    expect(instance.html()).toMatchSnapshot()
  })
})
