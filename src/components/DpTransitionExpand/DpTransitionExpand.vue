<script>
import { h, Transition } from 'vue'

export default {
  name: 'DpTransitionExpand',

  render () {
    const data = {
      name: 'expand',

      onAfterEnter (element) {
        element.style.height = 'auto'
      },

      onEnter (element) {
        element.style.width = getComputedStyle(element).width
        element.style.position = 'absolute'
        element.style.visibility = 'hidden'
        element.style.height = 'auto'

        const height = getComputedStyle(element).height

        element.style.width = null
        element.style.position = null
        element.style.visibility = null
        element.style.height = 0

        /*
         * Force repaint to make sure the
         * animation is triggered correctly.
         */
        /* eslint-disable no-unused-expressions */
        getComputedStyle(element).height

        /*
         * Trigger the animation.
         * We use `requestAnimationFrame` because we need
         * to make sure the browser has finished
         * painting after setting the `height`
         * to `0` in the line above.
         */
        requestAnimationFrame(() => {
          element.style.height = height
        })
      },

      onLeave (element) {
        element.style.height = getComputedStyle(element).height

        getComputedStyle(element).height

        requestAnimationFrame(() => {
          element.style.height = 0
        })
      }
    }

    return h(Transition, data, this.$slots.default)
  }
}
</script>

