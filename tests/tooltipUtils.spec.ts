import {
  afterEach,
  describe,
  expect,
  it,
} from 'vitest'

import { destroyTooltip, initTooltip } from '~/components/DpTooltip/utils/tooltip'

describe('tooltip utils', () => {
  const triggers: HTMLElement[] = []

  const createTrigger = (text: string) => {
    const el = document.createElement('span')

    document.body.appendChild(el)
    initTooltip(el, text, { place: 'top' })
    triggers.push(el)

    return el
  }

  const tooltipFor = (el: HTMLElement) => document.getElementById(el.getAttribute('aria-describedby') ?? '')

  const hover = (el: HTMLElement) => el.dispatchEvent(new Event('mouseenter'))

  afterEach(() => {
    triggers.splice(0).forEach(el => {
      destroyTooltip(el)
      el.remove()
    })
  })

  it('shows the tooltip on mouseenter and removes it on mouseleave', () => {
    const el = createTrigger('Hint')

    hover(el)
    expect(tooltipFor(el)?.textContent).toContain('Hint')

    el.dispatchEvent(new Event('mouseleave'))
    expect(tooltipFor(el)).toBeNull()
  })

  it('removes the tooltip on mousedown so a trigger hidden by the click leaves nothing behind', () => {
    const el = createTrigger('Hint')

    hover(el)
    expect(tooltipFor(el)).not.toBeNull()

    el.dispatchEvent(new Event('mousedown'))
    expect(tooltipFor(el)).toBeNull()
  })

  it('detaches only the destroyed trigger when several tooltips exist', () => {
    const first = createTrigger('First')
    const second = createTrigger('Second')

    destroyTooltip(first)

    hover(first)
    expect(tooltipFor(first)).toBeNull()

    hover(second)
    expect(tooltipFor(second)?.textContent).toContain('Second')
  })

  it('removes a visible tooltip when its trigger is destroyed', () => {
    const el = createTrigger('Hint')

    hover(el)
    destroyTooltip(el)

    expect(tooltipFor(el)).toBeNull()
  })
})
