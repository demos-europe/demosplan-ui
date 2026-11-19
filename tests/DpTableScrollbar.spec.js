import DpTableScrollbar from '~/components/DpTableScrollbar/DpTableScrollbar.vue'
import { mount } from '@vue/test-utils'

describe('DpTableScrollbar', () => {
  const mountScrollbar = (props = {}) => mount(DpTableScrollbar, {
    props: {
      controls: 'scroll-container',
      scrollPercent: 40,
      thumbStyle: { left: '10px', width: '100px' },
      ...props,
    },
  })

  it('exposes the scroll state to assistive technology', () => {
    const thumb = mountScrollbar().find('[role="scrollbar"]')

    expect(thumb.attributes('aria-controls')).toBe('scroll-container')
    expect(thumb.attributes('aria-valuenow')).toBe('40')
    expect(thumb.attributes('aria-valuemin')).toBe('0')
    expect(thumb.attributes('aria-valuemax')).toBe('100')
  })

  it('applies the thumb style', () => {
    const thumb = mountScrollbar().find('[role="scrollbar"]')

    expect(thumb.element.style.width).toBe('100px')
    expect(thumb.element.style.left).toBe('10px')
  })

  it('emits thumbMousedown when the thumb is pressed', async () => {
    const wrapper = mountScrollbar()

    await wrapper.find('[role="scrollbar"]').trigger('mousedown')

    expect(wrapper.emitted('thumbMousedown')).toHaveLength(1)
  })

  it('is fixed to the screen only in fullscreen mode', () => {
    expect(mountScrollbar().classes()).toContain('sticky')
    expect(mountScrollbar({ isFullscreen: true }).classes()).toContain('fixed')
  })
})
