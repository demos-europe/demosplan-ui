const hasPermission = jest.fn(() => true)
const Translator = {
  trans: jest.fn(key => key)
}
const prefixClass = jest.fn(key => key)

global.prefixClass = prefixClass
global.Translator = Translator
global.hasPermission = hasPermission

jest.mock('@uppy/core', () => () => 'mock result')
jest.mock('@uppy/drag-drop', () => () => 'mock result')
jest.mock('@uppy/progress-bar', () => () => 'mock result')
jest.mock('@uppy/tus', () => () => 'mock result')
jest.mock('vue-omnibox', () => () => 'mock result')
jest.mock('a11y-datepicker', () => () => 'mock result')
jest.mock('~/lib/Stickier', () => () => 'mock result')
jest.mock('@phosphor-icons/vue', () => () => 'mock result')

