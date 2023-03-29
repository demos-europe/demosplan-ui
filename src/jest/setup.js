jest.mock('@uppy/core', () => () => 'mock result')
jest.mock('@uppy/drag-drop', () => () => 'mock result')
jest.mock('@uppy/progress-bar', () => () => 'mock result')
jest.mock('@uppy/tus', () => () => 'mock result')
jest.mock('prefixClass', string => string)


const prefixClass = jest.fn(key => key)

global.prefixClass = prefixClass
