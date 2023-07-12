export * from './shared'
export * from './directives'
export * from './utils'
export * from './components/'
export * from './mixins/'
export * from './lib/'
export * from './lib/validation/'

import * as shared from './shared'
import * as directives from './directives'
import * as utils from './utils'
import * as components from './components/'
import * as mixins from './mixins/'
import * as lib from './lib/'
import * as validation from './lib/validation/'

export default {
  ...shared,
  ...directives,
  ...utils,
  ...components,
  ...mixins,
  ...lib,
  ...validation
}
