<template>
  <th
    v-tooltip="headerField.tooltip || headerField.label"
    ref="resizableColumn"
    class="c-data-table__resizable"
    :class="{ 'u-pr-0' : isLast }"
    :data-col-field="headerField.field"
    :data-col-idx="idx">
    <slot/>
    <dp-resize-handle
      v-if="!isLast"
      :display-icon="isResizableColumn"
      @mousedown="e => initResize(e, idx)" />
  </th>
</template>

<script>
import { hasOwnProp } from '../../utils'
import { sessionStorageMixin } from '~/mixins'
import DpResizeHandle from './DpResizeHandle'

export default {
  name: 'DpResizableColumn',

  components: {
    DpResizeHandle
  },

  mixins: [sessionStorageMixin],

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
    },

    nextHeader: {
      type: Object,
      required: false,
      default: null
    },
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
      return hasOwnProp(this.headerField, 'resizeable') ? this.headerField.resizeable : true
    }
  },

  methods: {
    initResize (e, idx) {
      this.resize = this.$refs.resizableColumn
      this.currentHandle = this.resize.getElementsByClassName('c-data-table__resize-handle')[0]
      this.currentHandle.classList.add('is-active')
      this.nextEl = document.querySelector(`th[data-col-idx='${idx + 1}']`)
      this.dragStart = true
      this.cursorStart = e.pageX
      const resizeBound = this.resize.getBoundingClientRect()
      this.resizeWidth = resizeBound.width

      if (this.nextEl) {
        const nextBound = this.nextEl.getBoundingClientRect()
        this.nextWidth = nextBound.width
      }

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

        if (newWidth <= 25 || newNextWidth <= 25) {
          return
        }

        this.resize.style.width = newWidth + 'px'
        this.updateSessionStorage(`dpDataTable:data-col-field=${this.headerField.field}`, this.resize.style.width)

        if (this.nextEl) {
          this.nextEl.style.width = newNextWidth + 'px'
          this.updateSessionStorage(`dpDataTable:data-col-field=${this.nextHeader.field}`, this.nextEl.style.width)
        }
      }
    },

    stopResize (e) {
      this.currentHandle.classList.remove('is-active')
      this.dragStart = false
      document.querySelector('body').removeEventListener('mousemove', this.namedFunc)
      document.querySelector('body').removeEventListener('mouseup', this.stopResize)
      document.querySelector('body').classList.remove('resizing')
    }
  }
}
</script>
