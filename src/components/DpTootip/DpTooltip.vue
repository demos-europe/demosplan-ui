<template>
  <component
    :is="nodeType"
    class="inline-block relative"
    ref="wrapper"
    @blur="hide"
    @focus="show"
    @mouseenter="show"
    @mouseleave="hide">
    <slot />
    <div
      ref="content"
      class="tooltip absolute"
      :class="!visible ? 'hidden z-below-zero' : ''">
      <div
        class="tooltip__inner"
        v-cleanhtml="text" />
      <div
        class="tooltip__arrow"
        ref="arrow" />
    </div>
  </component>
</template>

<script>
import {
  arrow,
  computePosition,
  flip,
  offset,
  shift
} from '@floating-ui/dom'
import { CleanHtml } from '../../directives'

export default {
  name: 'DpTooltip',

  directives: {
    cleanhtml: CleanHtml
  },

  props: {
    placement: {
      type: String,
      required: false,
      default: 'top'
    },

    nodeType: {
      type: String,
      required: false,
      default: 'div'
    },

    text: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    calculatePosition ({ x, y, middlewareData, placement }) {
      // set tooltip position

    },

    hide () {
      this.visible = false
    },

    show () {
      computePosition(this.$refs.wrapper, this.$refs.content,
        {
          placement: this.placement,
          middleware: [
            offset(12),
            flip(),
            shift({ padding: 8 }),
            arrow({ element: this.$refs.arrow })
          ]
        }
      )
        .then(({ x, y, middlewareData, placement }) => {
          Object.assign(this.$refs.content.style, {
            left: `${x}px`,
            top: `${y}px`
          })

          /*
           * to handle the position of the arrow.
           * e.g. if the tooltip is on the top, we want to place the arrow at the bottom....
           * `placement` can be 'bottom-start' etc s well, so we have to make sure to only take the first part
           */
          const { x: arrowX, y: arrowY } = middlewareData.arrow
          const opposedSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
          }[placement.split('-')[0]]

          console.log(placement, opposedSide)
          Object.assign(this.$refs.arrow.style, {
            left: arrowX ? `${arrowX}px` : '',
            top: arrowY ? `${arrowY}px` : '',
            bottom: '',
            right: '',
            [opposedSide]: (opposedSide === 'top' || opposedSide === 'bottom') ? '0px' : '-6px' // with this, we always will set the arrow to the side we want to attach it.
          })

          this.visible = true
        })
    }
  }

}
</script>
