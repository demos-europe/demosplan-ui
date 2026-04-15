import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'

let activeTooltip = null

/**
 * Positions the tooltip arrow element based on the tooltip placement.
 * The arrow always points toward the reference element (the error text).
 */
function positionTooltipArrow(arrowEl, middlewareData, placement) {
  const arrowData = middlewareData?.arrow

  if (!arrowData) {
    return
  }

  const { x, y } = arrowData
  const side = placement.split('-')[0]

  // If tooltip is below → arrow on top, if tooltip is above → arrow on bottom, etc.
  const oppositeSideMap = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }

  const oppositeSide = oppositeSideMap[side]
  const staticOffset = oppositeSide === 'top' || oppositeSide === 'bottom' ? '0px' : '-6px'

  Object.assign(arrowEl.style, {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
    bottom: '',
    right: '',
    [oppositeSide]: staticOffset,
  })
}

/**
 * Creates and positions a tooltip for LanguageTool errors with interactive suggestions.
 *
 * @param {string} message - The error message to display
 * @param {string[]} suggestions - Array of suggested corrections
 * @param {HTMLElement} referenceEl - The DOM element to position the tooltip relative to
 * @param {Function} onSuggestionClick - Callback function when a suggestion is clicked
 */
export function createLanguageToolTooltip(message, suggestions, referenceEl, onSuggestionClick) {
  removeLanguageToolTooltip()

  if (!referenceEl) {
    return
  }

  const tooltipId = 'language-tool-tooltip'

  const tooltipHtml = `
    <div class="z-tooltip max-w-xs absolute" role="tooltip" id="${tooltipId}">
      <div class="absolute bg-surface-dark z-below-zero h-2 w-2 transform rotate-45 -my-1" data-tooltip-arrow></div>
      <div class="px-3 py-2 text-sm text-on-dark font-system-ui font-normal text-left relative whitespace-normal bg-surface-dark rounded-sm">
        <div class="font-medium mb-2">${message}</div>
        ${suggestions.length > 0 ? `
          <div class="mt-2">
            <div class="text-xs opacity-75 mb-1">Vorschläge:</div>
            <div class="flex flex-wrap gap-1">
              ${suggestions.map((suggestion, index) => `
                <button
                  class="lt-suggestion px-1 py-1 text-xs text-black bg-surface-medium rounded-full hover:bg-surface-light cursor-pointer transition-colors"
                  data-suggestion-index="${index}"
                >
                <span class="p-0">${suggestion}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : '<div class="text-xs opacity-75">Keine Vorschläge</div>'}
      </div>
    </div>`

  const range = document.createRange()
  const content = range.createContextualFragment(tooltipHtml)
  document.body.appendChild(content)

  const tooltipEl = document.getElementById(tooltipId)
  const arrowEl = tooltipEl.querySelector('[data-tooltip-arrow]')
  activeTooltip = tooltipEl

  //Computes the x and y coordinates that will place the floating element next to a given reference element
  computePosition(referenceEl, tooltipEl, {
    placement: 'bottom-start',
    middleware: [
      offset(12),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowEl }),
    ],
  }).then(({ x, y, middlewareData, placement }) => {
    Object.assign(tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
      zIndex: '9999',
    })
    positionTooltipArrow(arrowEl, middlewareData, placement)
  })

  // Add click handlers for suggestions
  tooltipEl.querySelectorAll('.lt-suggestion').forEach((button) => {
    button.addEventListener('click', function () {
      const index = parseInt(this.dataset.suggestionIndex, 10)
      onSuggestionClick(suggestions[index])
      removeLanguageToolTooltip()
    })
  })

  // Close tooltip when clicking outside
  const closeOnClickOutside = function (event) {
    if (tooltipEl && !tooltipEl.contains(event.target) && !referenceEl.contains(event.target)) {
      removeLanguageToolTooltip()
      document.removeEventListener('click', closeOnClickOutside)
    }
  }

  // Delay adding the listener to prevent immediate closing
  setTimeout(function () {
    document.addEventListener('click', closeOnClickOutside)
  }, 0)
}

/**
 * Removes the currently active LanguageTool tooltip from the DOM.
 */
export function removeLanguageToolTooltip() {
  if (activeTooltip) {
    activeTooltip.remove()
    activeTooltip = null
  }
}
