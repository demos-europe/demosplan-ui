import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { v4 as uuid } from 'uuid'

// We need empty Variables for our show/hide methods, so we can destroy them later on.
let handleShowTooltip = null
let handleHideTooltip = null
let handleTimeoutForDestroy = null
let tooltips = {}

const deleteTooltip = (tooltipEl) => {
  if (tooltipEl) {
    tooltipEl.remove()
  }
}

const destroyTooltip = (wrapperEl) => {
  const tooltipEl = document.getElementById(wrapperEl.getAttribute('aria-describedby'))

  wrapperEl.removeEventListener('mouseenter', handleShowTooltip)
  wrapperEl.removeEventListener('focus', handleShowTooltip)
  wrapperEl.removeEventListener('mouseleave', handleHideTooltip)
  wrapperEl.removeEventListener('blur', handleHideTooltip)

  deleteTooltip(tooltipEl)
}

const getZIndex = (element) => {
  const z = window.getComputedStyle(element).getPropertyValue('z-index')
  if (isNaN(z)) {
    return (element.nodeName === 'HTML') ? 1 : getZIndex(element.parentNode)
  }
  return z
}

const hideTooltip = (tooltipEl) => {
  if (tooltipEl) {
    tooltipEl.classList.add('z-below-zero')
    tooltipEl.classList.add('opacity-0')
  }

  handleTimeoutForDestroy = setTimeout(() => deleteTooltip(tooltipEl), 300)
}

const createTooltip = (id, container, classes) => {
  const value = tooltips[id]
  // this has to be in sync with the Template in DpTooltip
  const tooltipHtml =
    `<div class="tooltip absolute ${classes} z-below-zero" role="tooltip" id="${id}">` +
    `<div class="tooltip__arrow" data-tooltip-arrow></div>` +
    `<div class="tooltip__inner">${value}</div>` +
    `</div>`

  const range = document.createRange()

  const content = range.createContextualFragment(tooltipHtml)

  document.querySelector(container).appendChild(content)
}

const initTooltip = (el, value, options) => {
  if (!value) return

  const id = `tooltip-${uuid()}`
  const zIndex = getZIndex(el)
  tooltips[id] = value

  el.setAttribute('aria-describedby', id)

  handleShowTooltip = () => showTooltip(
    id,
    el,
    options,
    zIndex
  )
  handleHideTooltip = () => hideTooltip(document.getElementById(el.getAttribute('aria-describedby')))

  el.addEventListener('mouseenter', handleShowTooltip)
  el.addEventListener('focus', handleShowTooltip)
  el.addEventListener('mouseleave', handleHideTooltip)
  el.addEventListener('blur', handleHideTooltip)
}

const showTooltip = async (id, wrapperEl, { place = 'top', container = 'body', classes = '' }, zIndex)  => {
  if (!document.getElementById(wrapperEl.getAttribute('aria-describedby'))) {
    createTooltip(id, container, classes)
  } else {
    clearTimeout(handleTimeoutForDestroy)
  }

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
        arrow({ element: arrowEl })
      ]
    }
  )

  Object.assign(tooltipEl.style, {
    left: `${x}px`,
    top: `${y}px`,
    zIndex: Number(zIndex) + 1
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
    left: 'right'
  }[placement.split('-')[0]]

  Object.assign(arrowEl.style, {
    left: arrowX ? `${arrowX}px` : '',
    top: arrowY ? `${arrowY}px` : '',
    bottom: '',
    right: '',
    [opposedSide]: (opposedSide === 'top' || opposedSide === 'bottom') ? '0px' : '-6px' // Always sets the arrow to the correct side.
  })

  tooltipEl.classList.remove('z-below-zero')
  tooltipEl.classList.remove('opacity-0')
}

const updateTooltip = (wrapper, value, options) => {
  if (!value) return

  const wrapperId = wrapper.getAttribute('aria-describedby')
  tooltips[wrapperId] = value

  const zIndex = getZIndex(wrapper)
  const tooltipEl = document.getElementById(wrapperId)

  if (tooltipEl) {
    deleteTooltip(tooltipEl)
    showTooltip(wrapperId, wrapper, options, zIndex)
  }
}

export { destroyTooltip, initTooltip, updateTooltip }
