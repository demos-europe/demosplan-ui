import DpCheckbox from '~/components/DpCheckbox/DpCheckbox'
import { runBooleanAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import { shallowMount } from '@vue/test-utils'

describe('DpCheckbox', () => {
  const wrapper = shallowMount(DpCheckbox, {
    propsData: {
      id: 'checkboxId'
    }
  })

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

    expect(componentWrapper.emitted().change[0][0]).toBeTruthy

    await checkboxEl.setChecked(false)
    expect(componentWrapper.emitted().change[1][0]).toEqual(false)
  })

  it('has the value of `valueToSend` as its value', async () => {
    const componentWrapper = shallowMount(DpCheckbox, {
      propsData: {
        id: 'checkboxId'
      }
    })

    await componentWrapper.setProps({ valueToSend: '1' })

    const checkboxEl = componentWrapper.find('input[type="checkbox"]')
    expect(checkboxEl.attributes('value')).toEqual('1')
  })
})
