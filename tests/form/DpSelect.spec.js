import DpSelect from '~/components/DpSelect'
import { de } from '~/components/shared/translations'
import { runBooleanAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import shallowMountWithGlobalMocks from '../../jest/shallowMountWithGlobalMocks'


window.Translator = {
  trans: jest.fn(key => key),
}

describe('DpSelect', () => {

  const options = [
    { label: 'option1', value: 'value1' },
    { label: 'option2', value: 'value2' },
    { label: 'option3', value: 'value3' },
  ]

  const wrapper = shallowMountWithGlobalMocks(DpSelect, {
    props: { options },
  })
  runLabelTests(wrapper)

  const select = wrapper.find('select')
  runBooleanAttrTests(wrapper, select, 'disabled')

  it('displays a placeholder if showPlaceholder is true', () => {
    const placeholder = de.operations.select.placeholder
    const componentWrapper = shallowMountWithGlobalMocks(DpSelect, {
      props: {
        options,
        placeholder,
        showPlaceholder: true,
      },
    })

    const placeholderOption = componentWrapper.find('option[data-id="placeholder"]')
    expect(placeholderOption.exists()).toBe(true)
    expect(placeholderOption.text()).toBe(placeholder)
  })

  it('does not display a placeholder if showPlaceholder is false', () => {
    const placeholder = de.operations.select.placeholder
    const componentWrapper = shallowMountWithGlobalMocks(DpSelect, {
      props: {
        options,
        placeholder,
        showPlaceholder: false,
      },
    })

    const placeholderOption = componentWrapper.find('option[data-id="placeholder"]')
    console.log(placeholderOption)
    expect(placeholderOption.exists()).toBe(false)
  })

  it('emits an event on select with the selected value as argument', async () => {
    const componentWrapper = shallowMountWithGlobalMocks(DpSelect, {
      props: {
        options,
      },
    })

    await componentWrapper
      .find('select')
      .setValue(options[1].value)

    expect(componentWrapper.find('option:checked').element.value).toBe(options[1].value)
    expect(componentWrapper.emitted().select).toEqual([[options[1].value]])
  })
})
