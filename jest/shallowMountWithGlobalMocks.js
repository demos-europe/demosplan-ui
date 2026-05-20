import { vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

const globalMocks = {
  hasPermission: vi.fn(() => true),
  Translator: {
    trans: vi.fn(key => key)
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
