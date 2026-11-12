import { flushPromises, mount } from '@vue/test-utils'
import DpPopover from '~/components/DpPopover/DpPopover.vue'
import { nextTick } from 'vue'

const floating = vi.hoisted(() => ({ computePosition: vi.fn() }))

vi.mock('@floating-ui/dom', () => ({
  // Runs the update once, like the real one when it starts tracking
  autoUpdate: vi.fn((trigger, panel, update) => {
    update()

    return vi.fn()
  }),
  computePosition: floating.computePosition,
  flip: vi.fn(),
  offset: vi.fn(),
  shift: vi.fn(),
}))

describe('DpPopover', () => {
  let wrapper

  const mountPopover = (props = {}, content = '<p>Content</p>') => mount(DpPopover, {
    attachTo: document.body,
    props: { ariaLabel: 'Show more', panelLabel: 'Details', ...props },
    slots: { default: content, trigger: '+5' },
  })

  const panel = () => document.body.querySelector('[role="dialog"]')

  const open = async () => {
    await wrapper.find('button').trigger('click')
    await nextTick()
  }

  beforeEach(() => {
    floating.computePosition.mockResolvedValue({ x: 10, y: 20 })
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('moves the focus into the panel when it opens', async () => {
    wrapper = mountPopover()
    await open()

    expect(document.activeElement).toBe(panel())
  })

  it('moves the focus back to the trigger when the panel is closed with Escape', async () => {
    wrapper = mountPopover()
    await open()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(wrapper.find('button').element)
  })

  it('closes the panel and moves the focus to the trigger when Shift+Tab is pressed in the panel', async () => {
    wrapper = mountPopover()
    await open()

    panel().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab', shiftKey: true }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(wrapper.find('button').element)
  })

  it('closes the panel and moves the focus to the trigger when Tab is pressed on the last element of the panel', async () => {
    wrapper = mountPopover({}, '<button type="button">Action</button>')
    await open()
    const action = panel().querySelector('button')
    action.focus()

    action.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(wrapper.find('button').element)
  })

  it('ignores hidden inputs and elements with tabindex -1 when determining the last element of the panel', async () => {
    wrapper = mountPopover({}, '<button type="button" id="last">Last</button><input type="hidden"><button type="button" tabindex="-1">Skipped</button>')
    await open()
    const last = panel().querySelector('#last')
    last.focus()

    last.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(wrapper.find('button').element)
  })

  it('keeps the panel open when Tab moves between elements within the panel', async () => {
    wrapper = mountPopover({}, '<button type="button" id="first">First</button><button type="button">Second</button>')
    await open()
    const first = panel().querySelector('#first')
    first.focus()

    first.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }))
    await nextTick()

    expect(panel()).not.toBeNull()
  })

  it('keeps the panel within a dialog around the trigger, so it stays interactive in a modal', async () => {
    const dialog = document.createElement('dialog')
    document.body.appendChild(dialog)
    wrapper = mount(DpPopover, {
      attachTo: dialog,
      props: { ariaLabel: 'Show more', panelLabel: 'Details' },
      slots: { default: '<p>Content</p>', trigger: '+5' },
    })
    await open()

    expect(panel().closest('dialog')).toBe(dialog)

    wrapper.unmount()
    wrapper = null
    dialog.remove()
  })

  it('closes only the popover, not the dialog around it, when Escape is pressed in the panel', async () => {
    const dialog = document.createElement('dialog')
    const dialogKeydown = vi.fn()
    dialog.addEventListener('keydown', dialogKeydown)
    document.body.appendChild(dialog)
    wrapper = mount(DpPopover, {
      attachTo: dialog,
      props: { ariaLabel: 'Show more', panelLabel: 'Details' },
      slots: { default: '<p>Content</p>', trigger: '+5' },
    })
    await open()

    panel().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(dialogKeydown).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(wrapper.find('button').element)

    wrapper.unmount()
    wrapper = null
    dialog.remove()
  })

  it('puts the panel into the body without a dialog around the trigger', async () => {
    wrapper = mountPopover()
    await open()

    expect(panel().parentElement).toBe(document.body)
  })

  it('positions the panel', async () => {
    wrapper = mountPopover()
    await open()
    await flushPromises()

    expect(panel().style.left).toBe('10px')
    expect(panel().style.top).toBe('20px')
  })

  it('does not throw if the panel is closed while its position is computed', async () => {
    let resolvePosition
    floating.computePosition.mockReturnValue(new Promise(resolve => { resolvePosition = resolve }))
    const unhandled = vi.fn()
    process.on('unhandledRejection', unhandled)

    wrapper = mountPopover()
    await open()
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(panel()).toBeNull()

    resolvePosition({ x: 10, y: 20 })
    await flushPromises()

    expect(unhandled).not.toHaveBeenCalled()
    process.off('unhandledRejection', unhandled)
  })

  it('does not apply an old position to a panel that was opened again', async () => {
    let resolveFirst
    floating.computePosition.mockReturnValueOnce(new Promise(resolve => { resolveFirst = resolve }))
    floating.computePosition.mockResolvedValue({ x: 30, y: 40 })

    wrapper = mountPopover()
    await open()
    await wrapper.find('button').trigger('click')
    await open()
    await flushPromises()

    resolveFirst({ x: 10, y: 20 })
    await flushPromises()

    expect(panel().style.left).toBe('30px')
    expect(panel().style.top).toBe('40px')
  })
})
