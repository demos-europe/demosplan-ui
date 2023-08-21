<template>
  <span
    class="resizable-image"
    ref="imagewrapper"
    tabindex="1"
    @mouseup="() => updateImageDimensions(node.attrs.width)"
    :style="`height: ${node.attrs.height}px; width: ${node.attrs.width}px`">
    <img
      @click.ctrl="$root.$emit('open-image-alt-modal', $event, id)"
      :alt="node.attrs.alt"
      ref="image"
      :src="node.attrs.src"
      :title="imageTitle"
      :width="node.attrs.width">
  </span>
</template>

<script>
import { de } from '../../shared/translations'
import { v4 as uuid } from 'uuid'

export default {
  name: 'DpResizableImage',

  props: {
    getPos: {
      type: Function,
      required: false,
      default: () => ({})
    },

    node: {
      type: Object,
      required: false,
      default: () => ({})
    },

    options: {
      type: Object,
      required: false,
      default: () => ({})
    },

    selected: {
      type: Boolean,
      required: false,
      default: false
    },

    updateAttrs: {
      type: Function,
      required: false,
      default: () => ({})
    },

    view: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  data () {
    return {
      id: uuid(),
      imageTitle: de.image.alt.editHint,
      observer: null,
      ratioFactor: 1
    }
  },

  methods: {
    updateImageDimensions (width) {
      if (width > 0) {
        this.$nextTick(() => {
          this.updateAttrs({
            height: width / this.ratioFactor,
            width: width
          })
        })
      }
    },

    setRatio (updateSize = false) {
      const img = new Image()
      img.onload = () => {
        this.ratioFactor = img.width / img.height

        // If the width is not set jet, set it to the image original dimensions
        if (updateSize) {
          // The max width should not be wider than the editor.
          const innerEditorWidth = this.$parent.$el.clientWidth - 40
          const width = (img.width < innerEditorWidth) ? img.width : innerEditorWidth
          this.updateImageDimensions(width)
        }
      }
      img.src = this.node.attrs.src // This must be done AFTER setting onload
    }
  },

  mounted () {
    /*
     * Observe changes to image wrapper to update image size
     * We have to wait for the nextTick to ensure, that the ref is set
     */
    this.observer = new ResizeObserver(e => this.updateImageDimensions(e[0].target.offsetWidth))
    this.observer.observe(this.$refs.imagewrapper)

    this.$root.$on('update-image:' + this.id, data => {
      this.updateAttrs(data)
    })

    const updateSize = (this.node.attrs.height > 0) === false || this.node.attrs.height === Infinity
    this.setRatio(updateSize)
  }
}
</script>
