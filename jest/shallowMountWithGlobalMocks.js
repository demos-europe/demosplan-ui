/**
 * Used to run Jest-Tests
 */

// Use Local Vue for testing
import { shallowMount } from '@vue/test-utils'

// then you can use `app.component` here
// Mocking global stuff
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
 * @param options{mocks, props, computed, store, methods, stubs, slots}
 *
 * @returns {Vue}
 */
const shallowMountWithGlobalMocks = (component, options) => {
  return shallowMount(component, {
      ...options,
      global: {
        mocks: globalMocks,
      }
    }
  )
}

export default shallowMountWithGlobalMocks
