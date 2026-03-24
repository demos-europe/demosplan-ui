<template>
  <th
    ref="resizableColumn"
    v-tooltip="headerField.tooltip || headerField.label"
    class="c-data-table__resizable break-words !overflow-visible"
    :class="{ 'u-pr-0': isLast, 'is-resizing bg-interactive-subtle-hover !border-r-interactive border-r-2 ': isResizing }"
    :data-col-field="headerField.field"
    :data-col-idx="idx"
  >
    <slot />
    <dp-resize-handle
      v-if="!isLast"
      :display-icon="isResizableColumn"
      class="!-right-[21px] !top-0 z-above-zero"
      @mousedown="e => initResize(e, idx)"
    />
  </th>
</template>

<script>
import DpResizeHandle from './DpResizeHandle'
import { hasOwnProp } from '../../utils'
import { sessionStorageMixin } from '~/mixins'

export default {
  name: 'DpResizableColumn',

  components: {
    DpResizeHandle,
  },

  mixins: [sessionStorageMixin],

  props: {
    idx: {
      required: true,
      type: Number,
    },

    headerField: {
      type: Object,
      required: true,
    },

    isLast: {
      type: Boolean,
      required: false,
      default: false,
    },

    nextHeader: {
      type: Object,
      required: false,
      default: null,
    },
  },

  data () {
    return {
      currentHandle: '',
      cursorStart: 0,
      dragStart: false,
      isResizing: false,
      namedFunc: '',
      nextEl: '',
      nextWidth: '',
      resize: '',
      resizeWidth: '',
    }
  },

  computed: {
    isResizableColumn () {
      return hasOwnProp(this.headerField, 'resizeable') ? this.headerField.resizeable : true
    },
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
      this.namedFunc = (e) => this.resizeEl(e, idx)
      this.isResizing = true
      this.markResizingColumn(idx)
      const bodyEl = document.getElementsByTagName('body')[0]

      bodyEl.classList.add('resizing')
      bodyEl.addEventListener('mousemove', this.namedFunc)
      bodyEl.addEventListener('mouseup', this.stopResize)
    },

    markResizingColumn (idx) {
      document.querySelectorAll(`td[data-col-idx='${idx}']`)
        .forEach(td => td.classList.add('is-resizing', 'bg-interactive-subtle-hover',
          'border-r-2', 'border-r-interactive'))
    },

    resizeEl (e) {
      if (this.dragStart) {
        const cursorPos = e.pageX
        const mouseMoved = cursorPos - this.cursorStart
        const newWidth = this.resizeWidth + mouseMoved

        if (newWidth <= this.headerField.initialMinWidth) {
          return
        }

        this.resize.style.width = newWidth + 'px'
        this.updateSessionStorage(`dpDataTable:data-col-field=${this.headerField.field}`, this.resize.style.width)
      }
    },

    stopResize () {
      this.currentHandle.classList.remove('is-active')
      this.dragStart = false
      this.isResizing = false
      this.unmarkResizingColumn()
      document.querySelector('body').removeEventListener('mousemove', this.namedFunc)
      document.querySelector('body').removeEventListener('mouseup', this.stopResize)
      document.querySelector('body').classList.remove('resizing')
    },

    unmarkResizingColumn () {
      document.querySelectorAll('td.is-resizing')
        .forEach(td => td.classList.remove('is-resizing', 'bg-interactive-subtle-hover',
          'border-r-2', 'border-r-interactive'))
    },
  },
}
</script>
