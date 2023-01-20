/**
 * This mixin can be to provide the prefixClass method and a prop to control when to prefix and when not.
 *
 * @deprecated USe prefixClassMixin from demosplan-utils instead
 */
import { prefixClass } from '../../lib'

export default {
  methods: {
    prefixClass (classList) {
      return prefixClass(classList)
    }
  }
}
