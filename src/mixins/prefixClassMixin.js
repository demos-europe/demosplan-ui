/**
 * This mixin can be used to provide the prefixClass method and a prop to control when to prefix and when not.
 */
import { prefixClass } from '@/utils'

export default {
  methods: {
    prefixClass (classList) {
      return prefixClass(classList)
    }
  }
}
