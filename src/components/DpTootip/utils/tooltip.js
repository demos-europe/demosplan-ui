import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { v4 as uuid } from 'uuid'

// We need empty Variables for our show/hide methods, so we can destroy them later on.
let handleShowTooltip = null
let handleHideTooltip = null

const destroyTooltip = (el) => {
  el.removeEventListener('mouseenter', handleShowTooltip)
  el.removeEventListener('focus', handleShowTooltip)
  el.removeEventListener('mouseleave',handleHideTooltip)
  el.removeEventListener('blur', handleHideTooltip)

  document.getElementById(el.getAttribute('aria-describedby'))?.remove()
}

const hideTooltip = tooltipEl => {
  tooltipEl.classList.add('z-below-zero')
  tooltipEl.classList.add('opacity-0')
}

const initTooltip = (el, value, options) => {
  const id = `tooltip-${uuid()}`
  // this has to be in sync with the Template in DpTooltip
  const tooltipHtml = `` +
    `<div class="tooltip absolute z-below-zero " role="tooltip" id="${id}">` +
      `<div class="tooltip__arrow" data-tooltip-arrow></div>` +
      `<div class="tooltip__inner">${value}</div>` +
    `</div>`

  const range = document.createRange()
  el.setAttribute('aria-describedby', id)

  const content = range.createContextualFragment(tooltipHtml)

  document.body.appendChild(content)

  handleShowTooltip = () => showTooltip(
    el,
    tooltipEl,
    tooltipEl.querySelector('[data-tooltip-arrow]'),
    {
      place: options.placement
    }
  )

  handleHideTooltip = () => hideTooltip(tooltipEl)

  const tooltipEl = document.getElementById(id)
  el.addEventListener('mouseenter', handleShowTooltip)
  el.addEventListener('focus', handleShowTooltip)
  el.addEventListener('mouseleave', handleHideTooltip)
  el.addEventListener('blur', handleHideTooltip)
}

const showTooltip = async (wrapperEl, tooltipEl, arrowEl, { place = 'top' })  => {
  const { x, y, middlewareData, placement } = await computePosition(wrapperEl, tooltipEl,
    {
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
    top: `${y}px`
  })

  /*
   * to handle the position of the arrow.
   * e.g. if the tooltip is on the top, we want to place the arrow at the bottom....
   * `placement` can be 'bottom-start' etc s well, so we have to make sure to only take the first part
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


export { destroyTooltip, initTooltip }
