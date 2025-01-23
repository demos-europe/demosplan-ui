import { runBooleanAttrTests, runStringAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import DpInput from '~/components/DpInput'
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount(DpInput, {
  props: {
    id: 'inputId',
    label: {
      hint: 'test hint'
    }
  }
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
          hint: 'test hint'
        }
      }
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
})
