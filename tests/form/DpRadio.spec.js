import DpRadio from '~/components/DpRadio/DpRadio'
import { runBooleanAttrTests } from './shared/Attributes'
import { shallowMount } from '@vue/test-utils'

describe('DpRadio', () => {
  const wrapper = shallowMount(DpRadio, {
    props: {
      id: 'radioId'
    }
  })

  const radio = wrapper.get('input[type="radio"]')
  runBooleanAttrTests(wrapper, radio, 'required')
  runBooleanAttrTests(wrapper, radio, 'disabled')
  runBooleanAttrTests(wrapper, radio, 'readonly')

  it('emits an event on change with the new `checked` state as argument', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        checked: false
      }
    })

    const radioEl = await componentWrapper.get('input[type="radio"]')
    await componentWrapper.setProps({ checked: true })
    await radioEl.trigger('change')
    await componentWrapper.setProps({ checked: false })
    await radioEl.trigger('change')

    expect(componentWrapper.emitted()).toHaveProperty('change')
    expect(componentWrapper.emitted()['change'][0][0]).toBe(true)
    // One Event adds two element to the events array, so we have to check the 3rd value
    expect(componentWrapper.emitted()['change'][2][0]).toBe(false)
  })

  it('emits correct payload when user clicks the radio input', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        checked: false,
        value: 'testValue'
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')

    // Simulate user clicking the radio
    radioEl.element.checked = true
    await radioEl.trigger('change')

    // Verify the event was emitted with the correct payload
    expect(componentWrapper.emitted()).toHaveProperty('change')
    expect(componentWrapper.emitted().change[0][0]).toBe(true)
  })

  it('has the value of `value` prop as its value attribute', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId'
      }
    })

    await componentWrapper.setProps({ value: 'radioValue' })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.attributes('value')).toEqual('radioValue')
  })

  it('has default value of "1" when no value prop is provided', () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId'
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.attributes('value')).toEqual('1')
  })

  it('is checked when checked prop is true', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        checked: true
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.element.checked).toBe(true)
  })

  it('is not checked when checked prop is false', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        checked: false
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.element.checked).toBe(false)
  })

  it('has the name attribute when name prop is provided', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        name: 'radioGroup'
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.attributes('name')).toEqual('radioGroup')
  })

  it('does not have name attribute when name prop is empty', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        name: ''
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.attributes('name')).toBeUndefined()
  })

  it('has data-cy attribute when dataCy prop is provided', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        dataCy: 'radio-test'
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.attributes('data-cy')).toEqual('radio-test')
  })

  it('does not have data-cy attribute when dataCy prop is empty', async () => {
    const componentWrapper = shallowMount(DpRadio, {
      props: {
        id: 'radioId',
        dataCy: ''
      }
    })

    const radioEl = componentWrapper.get('input[type="radio"]')
    expect(radioEl.attributes('data-cy')).toBeUndefined()
  })
})
