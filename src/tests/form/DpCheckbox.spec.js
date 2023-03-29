/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

import DpCheckbox from '../../components/DpCheckbox/DpCheckbox'
import { runBooleanAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import { shallowMount } from '@vue/test-utils'

describe('DpCheckbox', () => {
  const wrapper = shallowMount(DpCheckbox, {
    propsData: {
      id: 'checkboxId'
    }
  })
  runLabelTests(wrapper)

  const checkbox = wrapper.find('input[type="checkbox"]')
  runBooleanAttrTests(wrapper, checkbox, 'required')
  runBooleanAttrTests(wrapper, checkbox, 'disabled')
  runBooleanAttrTests(wrapper, checkbox, 'readonly')

  it('emits an event on change with the new `checked` state as argument', async () => {
    const componentWrapper = shallowMount(DpCheckbox, {
      propsData: {
        id: 'checkboxId'
      }
    })

    const checkboxEl = componentWrapper.find('input[type="checkbox"]')
    await checkboxEl.setChecked()

    expect(componentWrapper.emitted().change[0][0]).toEqual(true)

    await checkboxEl.setChecked(false)
    expect(componentWrapper.emitted().change[1][0]).toEqual(false)
  })

  it('has the value of `valueToSend` as its value', async () => {
    const componentWrapper = shallowMount(DpCheckbox, {
      propsData: {
        id: 'checkboxId'
      }
    })

    await componentWrapper.setProps({ valueToSend: 'on' })

    const checkboxEl = componentWrapper.find('input[type="checkbox"]')
    expect(checkboxEl.attributes('value')).toEqual('on')
  })
})
