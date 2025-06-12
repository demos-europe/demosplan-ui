const hasPermission = jest.fn(() => true)
const Translator = {
  trans: jest.fn(key => key)
}
const prefixClass = jest.fn(key => key)

// Create a mock $root for Vue components
const $rootMock = {
  $on: jest.fn(),
  $off: jest.fn(),
  $once: jest.fn(),
  $emit: jest.fn(),
  $el: document.createElement('div')
}

global.prefixClass = prefixClass
global.Translator = Translator
global.hasPermission = hasPermission
global.$rootMock = $rootMock

jest.mock('@vueuse/components', () => {
  return {
    vOnClickOutside: jest.fn()
  }
})

jest.mock('@uppy/core', () => () => 'mock result')
jest.mock('@uppy/drag-drop', () => () => 'mock result')
jest.mock('@uppy/progress-bar', () => () => 'mock result')
jest.mock('@uppy/tus', () => () => 'mock result')
jest.mock('a11y-datepicker', () => () => 'mock result')

jest.mock('~/lib/Stickier', () => jest.fn().mockImplementation(function() {
  return {
    update: jest.fn(),
    destroy: jest.fn()
  }
}))