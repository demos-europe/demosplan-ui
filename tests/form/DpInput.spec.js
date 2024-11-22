import { runBooleanAttrTests, runStringAttrTests } from './shared/Attributes'
import { runLabelTests } from './shared/Label'
import DpInput from '~/components/DpInput'
import { shallowMount } from '@vue/test-utils'

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
