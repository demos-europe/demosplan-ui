import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import DpTableScrollbar from './'

interface IDpTableScrollbar {
  controls: string
  isFullscreen?: boolean
  scrollPercent: number
  thumbStyle: Record<string, string>
}

const meta: Meta<typeof DpTableScrollbar> = {
  component: DpTableScrollbar,
  title: 'Components/TableScrollbar',
  parameters: {
    docs: {
      description: {
        component: 'The TableScrollbar component displays a custom, always visible scrollbar below a horizontally scrollable table.'
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpTableScrollbar>

/**
 * The component is presentational only. This story plays the role of the parent:
 * it calculates `scrollPercent` and `thumbStyle` and scrolls the container on thumb drag.
 */
export const Default: Story = {
  args: {
    controls: 'scroll-container',
    isFullscreen: false
  },
  render: (args) => ({
    components: { DpTableScrollbar },
    setup() {
      const scrollContainer = ref<HTMLElement | null>(null)
      const scrollbar = ref<{ $el: HTMLElement } | null>(null)
      const scrollPercent = ref(0)
      const thumbStyle = ref<Record<string, string>>({ left: '0px', width: '0px' })
      let resizeObserver: ResizeObserver | null = null

      const updateThumb = () => {
        const container = scrollContainer.value
        const track = scrollbar.value?.$el

        if (!container || !track || container.scrollWidth <= container.clientWidth) {
          return
        }

        const { clientWidth, scrollLeft, scrollWidth } = container
        const trackWidth = track.clientWidth
        const thumbWidth = Math.max(30, (clientWidth / scrollWidth) * trackWidth)
        const maxScrollLeft = scrollWidth - clientWidth
        const maxThumbLeft = trackWidth - thumbWidth

        thumbStyle.value = {
          left: `${(scrollLeft / maxScrollLeft) * maxThumbLeft}px`,
          width: `${thumbWidth}px`
        }
        scrollPercent.value = Math.round((scrollLeft / maxScrollLeft) * 100)
      }

      const onThumbMousedown = (event: MouseEvent) => {
        const container = scrollContainer.value
        const track = scrollbar.value?.$el

        if (!container || !track) {
          return
        }

        const startX = event.clientX
        const startScrollLeft = container.scrollLeft
        const maxScrollLeft = container.scrollWidth - container.clientWidth
        const maxThumbLeft = track.clientWidth - Number.parseFloat(thumbStyle.value.width)

        const onMousemove = (moveEvent: MouseEvent) => {
          const scrollRatio = (moveEvent.clientX - startX) / maxThumbLeft

          container.scrollLeft = startScrollLeft + scrollRatio * maxScrollLeft
        }

        const onMouseup = () => {
          document.removeEventListener('mousemove', onMousemove)
          document.removeEventListener('mouseup', onMouseup)
          document.body.style.userSelect = ''
        }

        document.body.style.userSelect = 'none'
        document.addEventListener('mousemove', onMousemove)
        document.addEventListener('mouseup', onMouseup)
        event.preventDefault()
      }

      onMounted(() => {
        if (!scrollContainer.value) {
          return
        }

        resizeObserver = new ResizeObserver(updateThumb)
        resizeObserver.observe(scrollContainer.value)
        updateThumb()
      })

      onBeforeUnmount(() => resizeObserver?.disconnect())

      return {
        args,
        columns: Array.from({ length: 20 }, (_, index) => `Column ${index + 1}`),
        onThumbMousedown,
        scrollbar,
        scrollContainer,
        scrollPercent,
        thumbStyle,
        updateThumb
      }
    },
    template: `
      <div>
        <div
          :id="args.controls"
          ref="scrollContainer"
          class="overflow-x-auto"
          @scroll="updateThumb">
          <table class="w-full whitespace-nowrap">
            <thead>
              <tr>
                <th v-for="column in columns" :key="column" class="p-2 text-left">{{ column }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in 5" :key="row">
                <td v-for="column in columns" :key="column" class="p-2">Row {{ row }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <DpTableScrollbar
          ref="scrollbar"
          :controls="args.controls"
          :is-fullscreen="args.isFullscreen"
          :scroll-percent="scrollPercent"
          :thumb-style="thumbStyle"
          @thumb-mousedown="onThumbMousedown" />
      </div>
    `
  })
}
