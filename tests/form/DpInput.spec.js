import { runBooleanAttrTests, runStringAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import DpInput from '~/components/DpInput'
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount(DpInput, {
  props: {
    id: 'inputId',
    label: {
      hint: 'test hint',
    },
  },
})

runLabelTests(wrapper)

const input = wrapper.find('input[type="text"]')
runBooleanAttrTests(wrapper, input, 'required')
runBooleanAttrTests(wrapper, input, 'disabled')
runBooleanAttrTests(wrapper, input, 'readonly')
runStringAttrTests(wrapper, input, 'placeholder', 'This is a placeholder.', 'placeholder')
runStringAttrTests(wrapper, input, 'dataDpValidateError', 'Bitte füllen Sie alle Pflichtfelder(*) korrekt aus.', 'data-dp-validate-error')
runStringAttrTests(wrapper, input, 'dataDpValidateIf', '#r_getEvaluation', 'data-dp-validate-if')
runStringAttrTests(wrapper, input, 'dataDpValidateShouldEqual', 'This is a placeholder.', 'data-dp-validate-should-equal')

describe('DpInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpInput, {
      props: {
        id: 'inputId',
        label: {
          hint: 'test hint',
        },
      },
    })
  })

  it('emits an event on input with the new value as argument', async () => {
    const newValue = 'some text'
    const input = wrapper.find('input')
    await input.setValue(newValue)

    expect(wrapper.emitted().input[0][0]).toEqual(newValue)
  })

  it('emits an event on keydown enter', async () => {
    const input = wrapper.find('input')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted().enter).toBeDefined()
  })

  it('passes through ARIA attributes to the input element', () => {
    const wrapperWithAria = shallowMount(DpInput, {
      props: {
        id: 'inputId',
      },
      attrs: {
        'aria-haspopup': 'listbox',
        'aria-controls': 'listbox-id',
        'aria-expanded': 'true',
        'aria-activedescendant': 'option-1',
      },
    })

    const input = wrapperWithAria.find('input')
    expect(input.attributes('aria-haspopup')).toBe('listbox')
    expect(input.attributes('aria-controls')).toBe('listbox-id')
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(input.attributes('aria-activedescendant')).toBe('option-1')
  })

  it('does not pass class attribute to input element', () => {
    const wrapperWithClass = shallowMount(DpInput, {
      props: {
        id: 'inputId',
      },
      attrs: {
        class: 'custom-class',
        'data-test': 'test-value',
      },
    })

    const input = wrapperWithClass.find('input')
    // Data-test should be passed through
    expect(input.attributes('data-test')).toBe('test-value')
    // Class should not be on the input (it stays on the wrapper)
    expect(input.attributes('class')).not.toContain('custom-class')
  })
})
