<template>
  <th
      :class="`'c-data-table__resizable' ${isLast? 'u-pr-0' : ''}`"
      :data-col-idx="idx"
      v-tooltip="headerField.tooltip || headerField.label">
    <slot/>
    <dp-resize-handle
        v-if="!isLast"
        :display-icon="isResizableColumn"
        @mousedown="e => initResize(e, idx)" />
  </th>
</template>

<script>
import DpResizeHandle from '../DpResizeHandle'
import { hasOwnProp } from '../../../../utils'

export default {
  name: 'ResizableColumns',

  components: {
    DpResizeHandle
  },

  props: {
    idx: {
      required: true,
      type: Number
    },
    headerField: {
      type: Object,
      required: true
    },
    isLast: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      namedFunc: '',
      currentHandle: '',
      nextEl: '',
      cursorStart: 0,
      dragStart: false,
      resize: '',
      resizeWidth: '',
      nextWidth: ''
    }
  },

  computed: {
    isResizableColumn () {
      return hasOwnProp(this.headerField, 'resizeable')? this.headerField.resizeable : true
    }
  },

  methods: {
    initResize (e, idx) {
      this.resize = document.querySelector(`th[data-col-idx='${idx}']`)

      this.currentHandle = this.resize.getElementsByClassName('c-data-table__resize-handle')[0]
      this.currentHandle.classList.add('is-active')
      this.nextEl = document.querySelector(`th[data-col-idx='${idx + 1}']`)
      this.dragStart = true
      this.cursorStart = e.pageX
      const resizeBound = this.resize.getBoundingClientRect()
      this.resizeWidth = resizeBound.width
      const nextBound = this.nextEl.getBoundingClientRect()
      this.nextWidth = nextBound.width
      this.namedFunc = (e) => this.resizeEl(e, idx)
      const bodyEl = document.getElementsByTagName('body')[0]
      bodyEl.classList.add('resizing')
      bodyEl.addEventListener('mousemove', this.namedFunc)
      bodyEl.addEventListener('mouseup', this.stopResize)
    },

    resizeEl (e, idx) {
      if (this.dragStart) {
        const cursorPos = e.pageX
        const mouseMoved = cursorPos - this.cursorStart
        const newWidth = this.resizeWidth + mouseMoved
        const newNextWidth = this.nextWidth - mouseMoved
        if (newWidth > 25 && newNextWidth > 25) {
          this.resize.style.width = newWidth + 'px'
          this.nextEl.style.width = newNextWidth + 'px'
        }
      }
    },

    stopResize (e) {
      this.currentHandle.classList.remove('is-active')
      this.dragStart = false
      document.getElementsByTagName('body')[0].removeEventListener('mousemove', this.namedFunc)
      document.getElementsByTagName('body')[0].removeEventListener('mouseup', this.stopResize)
      document.getElementsByTagName('body')[0].classList.remove('resizing')
    },


  }
}
</script>
