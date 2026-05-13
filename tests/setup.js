import { vi } from 'vitest'

const hasPermission = vi.fn(() => true)
const Translator = {
  trans: vi.fn(key => key),
}
const prefixClass = vi.fn(key => key)

const $rootMock = {
  $on: vi.fn(),
  $off: vi.fn(),
  $once: vi.fn(),
  $emit: vi.fn(),
  $el: document.createElement('div'),
}

global.prefixClass = prefixClass
global.Translator = Translator
global.hasPermission = hasPermission
global.$rootMock = $rootMock

vi.mock('@vueuse/components', () => {
  return {
    vOnClickOutside: vi.fn(),
  }
})

vi.mock('@uppy/core', () => ({ default: () => 'mock result' }))
vi.mock('@uppy/drag-drop', () => ({ default: () => 'mock result' }))
vi.mock('@uppy/progress-bar', () => ({ default: () => 'mock result' }))
vi.mock('@uppy/tus', () => ({ default: () => 'mock result' }))
vi.mock('a11y-datepicker', () => ({ default: () => 'mock result' }))

vi.mock('~/lib/Stickier', () => ({
  default: vi.fn().mockImplementation(function() {
    return {
      update: vi.fn(),
      destroy: vi.fn(),
    }
  }),
}))
