<template>
  <node-view-wrapper
    ref="imagewrapper"
    as="span"
    class="resizable-image"
    tabindex="1">
    <img
      ref="image"
      :alt="node.attrs.alt"
      data-cy="editor:resizableImage"
      :src="node.attrs.src"
      :title="imageTitle"
      @click.ctrl="$root.$emit('open-image-alt-modal', { event: $event, imgId: id, editorId: editor.options.id })">
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { de } from '../shared/translations'
import { v4 as uuid } from 'uuid'

export default {
  name: 'DpResizableImage',

  components: {
    NodeViewWrapper
  },

  props: nodeViewProps,

  data () {
    return {
      id: uuid(),
      imageTitle: de.image.alt.editHint,
      observer: null,
      ratioFactor: 1
    }
  },

  methods: {
    updateImageDimensions () {
      // The max width should not be wider than the editor.
      const imgEl = this.$refs.imagewrapper.$el
      const innerEditorWidth = imgEl.parentElement.clientWidth - 40
      const imgWidth = imgEl.clientWidth
      const width = (imgWidth < innerEditorWidth) ? imgWidth : innerEditorWidth

      if (width > 0) {
        this.$nextTick(() => {
          this.node.attrs.width = width
          this.node.attrs.height = width / this.ratioFactor

          this.editor.options.onUpdate()
        })
      }
    },

    setRatio (updateSize = false) {
      const img = new Image()

      img.onload = () => {
        this.ratioFactor = img.width / img.height

        // If the width is not set yet, set it to the image original dimensions
        if (updateSize) {
          this.updateImageDimensions()
        }
      }

      img.src = this.node.attrs.src // This must be done AFTER setting onload
    },

    initResizeObserver () {
      if (this.$refs.imagewrapper.$el) {
        this.observer = new ResizeObserver(e => this.updateImageDimensions())
        this.observer.observe(this.$refs.imagewrapper.$el)
      } else {
        setTimeout(() => {
          this.initResizeObserver()
        }, 200)
      }
    }
  },

  mounted () {
    this.$root.$on('update-image:' + this.id, data => {
      Object.keys(data).forEach(key => {
        this.node.attrs[key] = data[key]
      })
    })

    this.initResizeObserver()

    this.$refs.imagewrapper.$el.style.width = this.node.attrs.width + 'px'

    const updateSize = this.node.attrs.height <= 0 || this.node.attrs.height === Infinity
    this.setRatio(updateSize)
  },

  beforeUnmount () {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
</script>
