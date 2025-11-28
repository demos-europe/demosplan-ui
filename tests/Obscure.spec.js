import DpObscure from '~/components/DpObscure'
import shallowMountWithGlobalMocks from '../jest/shallowMountWithGlobalMocks'

window.Translator = {
  trans: jest.fn(key => key),
}

describe('Obscure', () => {
  it('should be an object', () => {
    expect(typeof DpObscure).toBe('object')
  })

  it('should be named DpObscure', () => {
    expect(DpObscure.name).toBe('DpObscure')
  })

  it('should add a \'u-obscure\' class to the slot content', () => {
    window.hasPermission = () => true
    let slotInstance = shallowMountWithGlobalMocks(DpObscure, {
      slots: {
        default: '<div>Slot Content</div>',
      },
    })
    const expectedSlotContent = '<span class="u-obscure" title="Dieser Text wurde als geschwärzt markiert, um Datenschutzrichtlinien zu entsprechen."><div>Slot Content</div></span>'

    expect(slotInstance.html()).toBe(expectedSlotContent)
  })
})
