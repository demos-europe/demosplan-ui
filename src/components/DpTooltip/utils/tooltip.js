import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { v4 as uuid } from 'uuid'

// Listeners per trigger element, so destroyTooltip() removes the ones that were actually attached
const listenersByElement = new WeakMap()
let tooltips = {}

/*
 * Floor for the inline z-index: matches the `tooltip` design token (tokens/src/zIndex.json).
 * The inline z-index lifts the tooltip above its trigger's stacking context; without a floor,
 * triggers in containers with no numeric z-index (e.g. native <dialog>) produce values that
 * lose to sibling elements with small explicit z-index utilities.
 */
const TOOLTIP_Z_INDEX_FLOOR = 2000

const deleteTooltip = (tooltipEl) => {
  if (tooltipEl) {
    tooltipEl.remove()
  }
}

const destroyTooltip = (wrapperEl) => {
  const id = wrapperEl.getAttribute('aria-describedby')
  const listeners = listenersByElement.get(wrapperEl)

  if (listeners) {
    wrapperEl.removeEventListener('mouseenter', listeners.create)
    wrapperEl.removeEventListener('focus', listeners.create)
    wrapperEl.removeEventListener('mouseleave', listeners.remove)
    wrapperEl.removeEventListener('blur', listeners.remove)
    wrapperEl.removeEventListener('mousedown', listeners.onMouseDown)
    listenersByElement.delete(wrapperEl)
  }

  delete tooltips[id]
  deleteTooltip(document.getElementById(id))
}

const getZIndex = (element) => {
  if (!element) {
    return 1
  }

  const z = globalThis.getComputedStyle(element).getPropertyValue('z-index')

  if (Number.isNaN(Number(z))) {
    return (element.nodeName === 'HTML') ? 1 : getZIndex(element.parentNode)
  }
  return z
}

const initTooltip = (el, value, options) => {
  if (!value) {
    return
  }

  const id = `tooltip-${uuid()}`
  const zIndex = getZIndex(el)
  tooltips[id] = value

  // Check if element is inside a dialog and use it as container
  const dialogParent = el.closest('dialog')

  if (dialogParent && !options.container) {
    options.container = dialogParent
  }

  el.setAttribute('aria-describedby', id)

  // Set during a mouse press so the focus it causes does not bring the tooltip straight back
  let pointerDown = false

  const create = () => {
    if (pointerDown) {
      return
    }

    // Positioning happens asynchronously inside; nothing here depends on it
    void createTooltip(id, el, options, zIndex)
  }
  const remove = () => deleteTooltip(document.getElementById(el.getAttribute('aria-describedby')))
  /*
   * A click hides the tooltip, like a native title. This also covers triggers hidden by their
   * own click (e.g. a dropdown option list toggled via v-show), where no mouseleave ever fires
   * and the tooltip would otherwise be orphaned. The flag is cleared on the next macrotask,
   * after the focus event that follows mousedown synchronously.
   */
  const onMouseDown = () => {
    pointerDown = true
    remove()
    setTimeout(() => {
      pointerDown = false
    }, 0)
  }

  listenersByElement.set(el, { create, remove, onMouseDown })

  el.addEventListener('mouseenter', create)
  el.addEventListener('focus', create)
  el.addEventListener('mouseleave', remove)
  el.addEventListener('blur', remove)
  el.addEventListener('mousedown', onMouseDown)
}

const createTooltip = async (id, wrapperEl, { place = 'top', container = 'body', classes = '' }, zIndex)  => {
  const existingTooltip = document.getElementById(wrapperEl.getAttribute('aria-describedby'))

  if (existingTooltip) {
    // Don't reposition it when it already exists
    return
  }

  const value = tooltips[id]
  // This has to be in sync with the Template in DpTooltip
  const tooltipHtml = `
    <div class="z-tooltip cursor-help max-w-13 absolute ${classes}" role="tooltip" id="${id}">
      <div class="absolute bg-surface-dark z-below-zero h-2 w-2 transform rotate-45 -my-1" data-tooltip-arrow></div>
      <div class="px-1.5 py-1 text-sm text-on-dark font-system-ui font-normal text-left relative whitespace-normal bg-surface-dark rounded-sm">${value}</div>
    </div>`
  const range = document.createRange()
  const content = range.createContextualFragment(tooltipHtml)

  // Handle both DOM element and selector string
  const containerEl = container instanceof Element ? container : document.querySelector(container)
  containerEl.appendChild(content)

  const tooltipEl = document.getElementById(id)
  const arrowEl = tooltipEl.querySelector('[data-tooltip-arrow]')

  const { x, y, middlewareData, placement } = await computePosition(wrapperEl, tooltipEl,
    {
      context: container,
      placement: place,
      middleware: [
        offset(12),
        flip(),
        shift({ padding: 8 }),
        arrow({ element: arrowEl }),
      ],
    },
  )

  Object.assign(tooltipEl.style, {
    left: `${x}px`,
    top: `${y}px`,
    zIndex: Math.max(Number(zIndex) + 1, TOOLTIP_Z_INDEX_FLOOR),
  })

  /*
   * Handles the position of the arrow -  e.g. if the Tooltip is on the top,
   * we want to place the arrow at the bottom, and so on. `placement` can be
   * 'bottom-start' etc as well, so we have to make sure to only take the first part.
   */
  const { x: arrowX, y: arrowY } = middlewareData.arrow
  const opposedSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]]

  Object.assign(arrowEl.style, {
    left: arrowX ? `${arrowX}px` : '',
    top: arrowY ? `${arrowY}px` : '',
    bottom: '',
    right: '',
    [opposedSide]: (opposedSide === 'top' || opposedSide === 'bottom') ? '0px' : '-6px', // Always sets the arrow to the correct side.
  })
}

const updateTooltip = (wrapper, value, options) => {
  if (!value) return

  const wrapperId = wrapper.getAttribute('aria-describedby')
  tooltips[wrapperId] = value

  // Check if element is inside a dialog and use it as container
  const dialogParent = wrapper.closest('dialog')
  if (dialogParent && !options.container) {
    options.container = dialogParent
  }

  const zIndex = getZIndex(wrapper)
  const tooltipEl = document.getElementById(wrapperId)

  if (tooltipEl) {
    deleteTooltip(tooltipEl)
    createTooltip(wrapperId, wrapper, options, zIndex)
  }
}

export { destroyTooltip, initTooltip, updateTooltip }
