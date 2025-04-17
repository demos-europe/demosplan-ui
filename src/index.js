export * from './components'
export * from './composables'
export * from './directives'
export * from './lib'
export * from './mixins'
export * from './shared'
export * from './utils'
export * from './lib/validation'

import * as components from './components'
import * as composables from './composables'
import * as directives from './directives'
import * as lib from './lib'
import * as mixins from './mixins'
import * as shared from './shared'
import * as utils from './utils'
import * as validation from './lib/validation'

export default {
  ...components,
  ...composables,
  ...directives,
  ...lib,
  ...mixins,
  ...shared,
  ...utils,
  ...validation
}
