import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ComputePositionReturn, MiddlewareData } from '@floating-ui/dom'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import DpPopover from '~/components/DpPopover/DpPopover.vue'
import { nextTick } from 'vue'

// The tests run in Node, but the Node types are not part of the tsconfig
declare const process: {
  off (event: 'unhandledRejection', listener: () => void): void
  on (event: 'unhandledRejection', listener: () => void): void
}

interface MockMiddleware {
  name: string
  options: unknown
}

const floating = vi.hoisted(() => ({ computePosition: vi.fn<() => Promise<ComputePositionReturn>>() }))

vi.mock('@floating-ui/dom', () => ({
  // Runs the update once, like the real one when it starts tracking
  autoUpdate: vi.fn((_trigger: HTMLElement, _panel: HTMLElement, update: () => void) => {
    update()

    return vi.fn()
  }),
  computePosition: floating.computePosition,
  // Middleware factories return their options, so the tests can check what was passed
  flip: vi.fn((options?: unknown): MockMiddleware => ({ name: 'flip', options })),
  hide: vi.fn((options?: unknown): MockMiddleware => ({ name: 'hide', options })),
  offset: vi.fn(),
  shift: vi.fn((options?: unknown): MockMiddleware => ({ name: 'shift', options })),
}))

describe('DpPopover', () => {
  let wrapper: VueWrapper | null

  const mountPopover = (props: Record<string, unknown> = {}, content = '<p>Content</p>'): VueWrapper => mount(DpPopover, {
    attachTo: document.body,
    props: { ariaLabel: 'Show more', panelLabel: 'Details', ...props },
    slots: { default: content, trigger: '+5' },
  })

  const triggerButton = () => wrapper!.find('button')

  const panel = (): HTMLElement | null => document.body.querySelector<HTMLElement>('[role="dialog"]')

  const open = async () => {
    await triggerButton().trigger('click')
    await nextTick()
  }

  const position = (x: number, y: number, middlewareData: MiddlewareData = {}): ComputePositionReturn => ({ x, y, middlewareData, placement: 'bottom-start', strategy: 'fixed' })

  const middleware = (): MockMiddleware[] => (floating.computePosition.mock.lastCall as unknown as [unknown, unknown, { middleware: (MockMiddleware | undefined)[] }])[2].middleware.filter((entry): entry is MockMiddleware => Boolean(entry))

  const stickyHeader = (bottom: number): HTMLElement => {
    const header = document.createElement('div')
    header.getBoundingClientRect = () => ({ bottom }) as DOMRect

    return header
  }

  beforeEach(() => {
    floating.computePosition.mockReset()
    floating.computePosition.mockResolvedValue(position(10, 20))
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('renders the subtle trigger without a visible border', () => {
    wrapper = mountPopover({ variant: 'subtle' })

    const classes = triggerButton().classes()

    expect(classes).toContain('border-transparent')
    expect(classes).not.toContain('border-interactive')
  })

  it('renders the outline trigger with a visible border', () => {
    wrapper = mountPopover()

    const classes = triggerButton().classes()

    expect(classes).toContain('border-interactive')
    expect(classes).not.toContain('border-transparent')
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
    expect(document.activeElement).toBe(triggerButton().element)
  })

  it('closes the panel and moves the focus to the trigger when Shift+Tab is pressed in the panel', async () => {
    wrapper = mountPopover()
    await open()

    const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Tab', shiftKey: true })
    panel()!.dispatchEvent(event)
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(triggerButton().element)
    // The trigger is the previous element, so the browser must not move the focus past it
    expect(event.defaultPrevented).toBe(true)
  })

  it('closes the panel and moves the focus to the trigger when Tab is pressed on the last element of the panel', async () => {
    wrapper = mountPopover({}, '<button type="button">Action</button>')
    await open()
    const action = panel()!.querySelector('button')!
    action.focus()

    const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Tab' })
    action.dispatchEvent(event)
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(triggerButton().element)
    // The browser moves the focus on from the trigger to the next element
    expect(event.defaultPrevented).toBe(false)
  })

  it('ignores hidden inputs and elements with tabindex -1 when determining the last element of the panel', async () => {
    wrapper = mountPopover({}, '<button type="button" id="last">Last</button><input type="hidden"><button type="button" tabindex="-1">Skipped</button>')
    await open()
    const last = panel()!.querySelector<HTMLElement>('#last')!
    last.focus()

    last.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(document.activeElement).toBe(triggerButton().element)
  })

  it('keeps the panel open when Tab moves between elements within the panel', async () => {
    wrapper = mountPopover({}, '<button type="button" id="first">First</button><button type="button">Second</button>')
    await open()
    const first = panel()!.querySelector<HTMLElement>('#first')!
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

    expect(panel()!.closest('dialog')).toBe(dialog)

    wrapper!.unmount()
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

    panel()!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
    await nextTick()

    expect(panel()).toBeNull()
    expect(dialogKeydown).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(triggerButton().element)

    wrapper!.unmount()
    wrapper = null
    dialog.remove()
  })

  it('puts the panel into the body without a dialog around the trigger', async () => {
    wrapper = mountPopover()
    await open()

    expect(panel()!.parentElement).toBe(document.body)
  })

  it('positions the panel', async () => {
    wrapper = mountPopover()
    await open()
    await flushPromises()

    expect(panel()!.style.left).toBe('10px')
    expect(panel()!.style.top).toBe('20px')
  })

  it('does not throw if the panel is closed while its position is computed', async () => {
    let resolvePosition: (value: ComputePositionReturn) => void = () => {}
    floating.computePosition.mockReturnValue(new Promise<ComputePositionReturn>(resolve => { resolvePosition = resolve }))
    const unhandled = vi.fn()
    process.on('unhandledRejection', unhandled)

    wrapper = mountPopover()
    await open()
    await triggerButton().trigger('click')
    await nextTick()
    expect(panel()).toBeNull()

    resolvePosition(position(10, 20))
    await flushPromises()

    expect(unhandled).not.toHaveBeenCalled()
    process.off('unhandledRejection', unhandled)
  })

  it('does not apply an old position to a panel that was opened again', async () => {
    let resolveFirst: (value: ComputePositionReturn) => void = () => {}
    floating.computePosition.mockReturnValueOnce(new Promise<ComputePositionReturn>(resolve => { resolveFirst = resolve }))
    floating.computePosition.mockResolvedValue(position(30, 40))

    wrapper = mountPopover()
    await open()
    await triggerButton().trigger('click')
    await open()
    await flushPromises()

    resolveFirst(position(10, 20))
    await flushPromises()

    expect(panel()!.style.left).toBe('30px')
    expect(panel()!.style.top).toBe('40px')
  })

  it('keeps the panel within the viewport without a top boundary', async () => {
    wrapper = mountPopover()
    await open()
    await flushPromises()

    expect(middleware()).toEqual([
      { name: 'flip', options: undefined },
      { name: 'shift', options: { padding: 8 } },
    ])
  })

  it('keeps the panel below the top boundary', async () => {
    wrapper = mountPopover({ topBoundary: stickyHeader(100) })
    await open()
    await flushPromises()

    const area = {
      boundary: { x: 0, y: 100, width: document.documentElement.clientWidth, height: window.innerHeight - 100 },
      padding: 8,
    }
    expect(middleware()).toEqual([
      { name: 'flip', options: area },
      { name: 'shift', options: area },
      { name: 'hide', options: area },
    ])
  })

  it('resolves a top boundary getter when the panel is positioned', async () => {
    const getBoundary = vi.fn(() => stickyHeader(50))
    wrapper = mountPopover({ topBoundary: getBoundary })
    expect(getBoundary).not.toHaveBeenCalled()

    await open()
    await flushPromises()

    expect(getBoundary).toHaveBeenCalled()
    expect(middleware()[0].options).toMatchObject({ boundary: { y: 50 } })
  })

  it('keeps the panel within the viewport if the top boundary getter finds no element', async () => {
    wrapper = mountPopover({ topBoundary: () => null })
    await open()
    await flushPromises()

    expect(middleware().map(({ name }) => name)).toEqual(['flip', 'shift'])
  })

  it('does not let the area start above the viewport if the top boundary was scrolled out of view', async () => {
    wrapper = mountPopover({ topBoundary: stickyHeader(-40) })
    await open()
    await flushPromises()

    expect(middleware()[0].options).toMatchObject({ boundary: { y: 0, height: window.innerHeight } })
  })

  it('hides the panel while the trigger is covered by the top boundary', async () => {
    floating.computePosition.mockResolvedValue(position(10, 20, { hide: { referenceHidden: true } }))
    wrapper = mountPopover({ topBoundary: stickyHeader(100) })
    await open()
    await flushPromises()

    expect(panel()!.style.visibility).toBe('hidden')
  })

  it('shows the panel while the trigger is not covered by the top boundary', async () => {
    floating.computePosition.mockResolvedValue(position(10, 20, { hide: { referenceHidden: false } }))
    wrapper = mountPopover({ topBoundary: stickyHeader(100) })
    await open()
    await flushPromises()

    expect(panel()!.style.visibility).toBe('')
  })
})
