<script>
export default {
  name: 'DpTransitionExpand',

  functional: true,

  render (createElement, context) {
    const data = {
      props: {
        name: 'expand'
      },

      on: {
        afterEnter (element) {
          element.style.height = 'auto'
        },

        enter (element) {
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

        leave (element) {
          element.style.height = getComputedStyle(element).height

          getComputedStyle(element).height

          requestAnimationFrame(() => {
            element.style.height = 0
          })
        }
      }
    }

    return createElement('transition', data, context.children)
  }
}
</script>

