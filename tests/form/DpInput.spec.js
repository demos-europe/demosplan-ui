import { runBooleanAttrTests, runStringAttrTests } from './shared/Attributes'
import DpInput from '../../src/components/DpInput/DpInput.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpInput', () => {
  // const wrapper = shallowMount(DpInput, {
  //   propsData: {
  //     id: 'inputId'
  //   }
  // })
  // RunLabelTests(wrapper)

  // const input = wrapper.find('input[type="text"]')
  // runBooleanAttrTests(wrapper, input, 'required')
  // runBooleanAttrTests(wrapper, input, 'disabled')
  // runBooleanAttrTests(wrapper, input, 'readonly')
  // runStringAttrTests(wrapper, input, 'placeholder', 'This is a placeholder.', 'data-dp-validate-error')
  // runStringAttrTests(wrapper, input, 'dataDpValidateError', 'Bitte füllen Sie alle Pflichtfelder(*) korrekt aus.', 'data-dp-validate-error')
  // runStringAttrTests(wrapper, input, 'dataDpValidateIf', '#r_getEvaluation', 'data-dp-validate-if')
  // runStringAttrTests(wrapper, input, 'dataDpValidateShouldEqual', 'This is a placeholder.', 'data-dp-validate-should-equal')

  it('emits an event on input with the new value as argument', async () => {
    const newValue = 'some text'
    const componentWrapper = shallowMount(DpInput, {
      propsData: {
        id: 'inputId'
      }
    })

    const input = componentWrapper.find('input')
    input.setValue(newValue)
    expect(componentWrapper.emitted().input[0][0]).toEqual(newValue)
  })

  // it('emits an event on keydown enter', () => {
  //   const componentWrapper = shallowMount(DpInput, {
  //     propsData: {
  //       id: 'inputId'
  //     }
  //   })
  //
  //   const input = componentWrapper.find('input')
  //   input.trigger('keydown.enter')
  //   expect(componentWrapper.emitted().enter).toBeDefined()
  // })
})
