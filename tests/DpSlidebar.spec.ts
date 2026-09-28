import {
  afterEach,
  describe,
  expect,
  it,
} from 'vitest'

import { mount, VueWrapper } from '@vue/test-utils'
import DpSlidebar from '~/components/DpSlidebar/DpSlidebar.vue'

describe('DpSlidebar', () => {
  let wrapper: VueWrapper

  /*
   * SideNav (src/lib/SideNav.js) looks up `[data-slidebar]` etc. via `document.querySelector`
   * and toggles `is-visible` on the mounted element itself, so the component must be attached
   * to the real document for open/close behaviour to work.
   */
  const createWrapper = (open = false) => mount(DpSlidebar, {
    attachTo: document.body,
    props: { open },
  })

  const isVisible = (w: VueWrapper) => w.classes().includes('is-visible')

  afterEach(() => {
    wrapper.unmount()
  })

  it('starts closed when the open prop is false', () => {
    wrapper = createWrapper(false)

    expect(isVisible(wrapper)).toBe(false)
  })

  it('starts open when the open prop is true', () => {
    wrapper = createWrapper(true)

    expect(isVisible(wrapper)).toBe(true)
  })

  it('opens when the open prop changes to true', async () => {
    wrapper = createWrapper(false)

    await wrapper.setProps({ open: true })

    expect(isVisible(wrapper)).toBe(true)
  })

  it('closes when the open prop changes to false, without emitting close or update:open', async () => {
    wrapper = createWrapper(true)

    await wrapper.setProps({ open: false })

    expect(isVisible(wrapper)).toBe(false)
    expect(wrapper.emitted('close')).toBeUndefined()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })

  it('emits update:open and close when the close button is clicked', async () => {
    wrapper = createWrapper(true)

    await wrapper.find('[data-slidebar-hide]').trigger('click')

    expect(isVisible(wrapper)).toBe(false)
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits update:open and close when Escape is pressed while open', async () => {
    wrapper = createWrapper(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(isVisible(wrapper)).toBe(false)
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('does not emit anything when Escape is pressed while already closed', async () => {
    wrapper = createWrapper(false)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:open')).toBeUndefined()
    expect(wrapper.emitted('close')).toBeUndefined()
  })
})
