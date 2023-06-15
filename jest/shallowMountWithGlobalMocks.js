/**
 * Used to run Jest-Tests
 */

// Use Local Vue for testing
import { createLocalVue, shallowMount } from '@vue/test-utils'

// Mocking global stuff
const localVue = createLocalVue()
const globalMocks = {
  hasPermission: jest.fn(() => true),
  Translator: {
    trans: jest.fn(key => key)
  }
}

/**
 * A shallowMount for the instance but with some additional Mocks
 * So we don't have to do that in every Test.
 *
 * @param component{Component}
 * @param options{mocks, propsData, computed, store, methods, stubs, slots}
 *
 * @returns {Wrapper<Vue>}
 */
const shallowMountWithGlobalMocks = (component, options) => {
  return shallowMount(
    component,
    {
      localVue,
      mocks: Object.assign(globalMocks, options.mocks),
      propsData: Object.assign({}, options.propsData),
      computed: Object.assign({}, options.computed),
      store: options.store,
      methods: Object.assign({}, options.methods),
      stubs: Object.assign({}, options.stubs),
      slots: Object.assign({}, options.slots)
    })
}

export default shallowMountWithGlobalMocks
