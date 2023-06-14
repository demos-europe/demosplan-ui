
import { createLocalVue, shallowMount } from '@vue/test-utils'
import shallowMountWithGlobalMocks from '../jest/shallowMountWithGlobalMocks'
import DpObscure from '../src/components/core/DpObscure.vue'

/* Mock hasPermission for the sake of testing */
// TODO: hasPermission should probably live in the webpack world
window.Translator = {
  trans: jest.fn(key => key)
}

describe('Obscure', () => {
  it('should be an object', () => {
    expect(typeof DpObscure).toBe('object')
  })

  it('should be named DpObscure', () => {
    expect(DpObscure.name).toBe('DpObscure')
  })

  it('should add a class based on the', () => {
    window.hasPermission = () => true
    let slotInstance = shallowMountWithGlobalMocks(DpObscure, {
      slots: {
        default: '<div>Slot Content</div>'
      }
    })
    expect(slotInstance.html()).toBe('<span title="obscure.title" class="u-obscure"><div>Slot Content</div></span>')

    window.hasPermission = () => false
    slotInstance = shallowMountWithGlobalMocks(DpObscure, {
      slots: {
        default: '<div>Slot Content</div>'
      }
    })
    expect(slotInstance.html()).toBe('<span title="obscure.title" class="u-obscure"><div>Slot Content</div></span>')
  })
})
