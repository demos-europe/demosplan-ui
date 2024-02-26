import DpCheckbox from '~/components/DpCheckbox/DpCheckbox'
import { runBooleanAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import { shallowMount } from '@vue/test-utils'

describe('DpCheckbox', () => {
  const wrapper = shallowMount(DpCheckbox, {
    props: {
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
      props: {
        id: 'checkboxId',
        checked: true
      }
    })

    const checkboxEl = await componentWrapper.find('input[type="checkbox"]')
    await componentWrapper.setProps({ checked: true })
    await checkboxEl.trigger('change')
    await componentWrapper.setProps({ checked: false })
    await checkboxEl.trigger('change')

    expect(componentWrapper.emitted()).toHaveProperty('change')
    expect(componentWrapper.emitted()['change'][0][0]).toBe(true)
    // One Event adds two element to the events array, therefore we have to check the 3rd value.
    expect(componentWrapper.emitted()['change'][2][0]).toBe(false)
  })

  it('has the value of `valueToSend` as its value', async () => {
    const componentWrapper = shallowMount(DpCheckbox, {
      props: {
        id: 'checkboxId'
      }
    })

    await componentWrapper.setProps({ valueToSend: '1' })

    const checkboxEl = componentWrapper.find('input[type="checkbox"]')
    expect(checkboxEl.attributes('value')).toEqual('1')
  })
})
