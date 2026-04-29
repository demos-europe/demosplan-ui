import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { de } from '~/components/shared/translations'

/**
 * Positions the tooltip arrow element based on the tooltip placement.
 * The arrow always points toward the reference element (the error text).
 */
const positionTooltipArrow = (arrowEl, middlewareData, placement) => {
  const arrowData = middlewareData?.arrow

  if (!arrowData) {
    return
  }

  const { x, y } = arrowData
  const side = placement.split('-')[0]

  // If tooltip is below - arrow on top, if tooltip is above - arrow on bottom, etc.
  const oppositeSideMap = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }

  const oppositeSide = oppositeSideMap[side]
  const staticOffset = oppositeSide === 'top' || oppositeSide === 'bottom' ? '0px' : '-6px'

  Object.assign(arrowEl.style, {
    left: x == null ? '' : `${x}px`,
    top: y == null ? '' : `${y}px`,
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

let activeTooltip = null
let activeTooltipCleanup = null

export const createLanguageToolTooltip = (message, suggestions, referenceEl, onSuggestionClick) => {
  removeLanguageToolTooltip()

  if (!referenceEl) {
    return
  }

  const controller = new AbortController()
  const { signal } = controller

  const { tooltipEl, arrowEl } = buildLanguageToolTooltip(message, suggestions)
  document.body.appendChild(tooltipEl)

  registerActiveTooltipCleanup(tooltipEl, controller)
  positionTooltip(referenceEl, tooltipEl, arrowEl)
  registerTooltipClickHandler(tooltipEl, suggestions, onSuggestionClick, signal)
  registerOutsideClickListenerOnNextFrame(signal, tooltipEl, referenceEl)
}

const buildLanguageToolTooltip = (message, suggestions) => {
  const tooltipEl = document.createElement('div')
  tooltipEl.className = 'z-tooltip max-w-xs absolute'
  tooltipEl.setAttribute('role', 'tooltip')

  const arrowEl = document.createElement('div')
  arrowEl.className = 'absolute bg-surface-dark z-below-zero h-2 w-2 transform rotate-45 -my-1'
  arrowEl.dataset.tooltipArrow = ''

  const contentEl = document.createElement('div')
  contentEl.className = 'px-3 py-2 text-sm text-on-dark font-system-ui font-normal text-left relative whitespace-normal bg-surface-dark rounded-sm max-w-14'

  const messageEl = document.createElement('span')
  messageEl.className = 'block mb-2'
  messageEl.textContent = message

  contentEl.appendChild(messageEl)

  if (suggestions.length > 0) {
    contentEl.appendChild(buildSuggestionsSection(suggestions))
  } else {
    const emptyEl = document.createElement('span')
    emptyEl.className = 'block text-xs opacity-75 mt-1'
    emptyEl.textContent = de.editor.languageTool.noSuggestions
    contentEl.appendChild(emptyEl)
  }

  tooltipEl.appendChild(arrowEl)
  tooltipEl.appendChild(contentEl)

  return { tooltipEl, arrowEl }
}

const buildSuggestionsSection = (suggestions) => {
  const suggestionsWrapper = document.createElement('div')
  suggestionsWrapper.className = 'mt-2'

  const labelEl = document.createElement('span')
  labelEl.className = 'block text-xs opacity-75 mb-1'
  labelEl.textContent = `${de.editor.languageTool.suggestions}:`

  const listEl = document.createElement('div')
  listEl.className = 'flex flex-wrap gap-1'

  suggestions.forEach((suggestion, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'lt-suggestion px-1 py-0.5 text-xs text-black bg-surface-medium rounded-full hover:bg-surface-light cursor-pointer transition-colors'
    button.dataset.suggestionIndex = String(index)
    button.textContent = suggestion
    listEl.appendChild(button)
  })

  suggestionsWrapper.appendChild(labelEl)
  suggestionsWrapper.appendChild(listEl)

  return suggestionsWrapper
}

const positionTooltip = (referenceEl, tooltipEl, arrowEl) => {
  computePosition(referenceEl, tooltipEl, {
    placement: 'bottom-start',
    middleware: [
      offset(12),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowEl }),
    ],
  }).then(({ x, y, middlewareData, placement }) => {
    if (!tooltipEl.isConnected) {
      return
    }

    Object.assign(tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
      zIndex: '9999',
    })

    positionTooltipArrow(arrowEl, middlewareData, placement)
  })
}

const registerActiveTooltipCleanup = (tooltipEl, controller) => {
  activeTooltip = tooltipEl

  activeTooltipCleanup = () => {
    controller.abort()

    if (tooltipEl.isConnected) {
      tooltipEl.remove()
    }

    if (activeTooltip === tooltipEl) {
      activeTooltip = null
      activeTooltipCleanup = null
    }
  }
}

const registerOutsideClickListenerOnNextFrame = (signal, tooltipEl, referenceEl) => {
  // Delays execution until the next browser repaint
  requestAnimationFrame(() => {
    document.addEventListener('pointerdown', (event) => {
      const target = event.target

      if (!tooltipEl.contains(target) && !referenceEl.contains(target)) {
        removeLanguageToolTooltip()
      }
    }, {
      capture: true,
      signal,
    })
  })
}

const registerTooltipClickHandler = (tooltipEl, suggestions, onSuggestionClick, signal) => {
  tooltipEl.addEventListener('click', (event) => {
      const button = event.target.closest('.lt-suggestion')

      if (!button) {
        return
      }

      const index = Number(button.dataset.suggestionIndex)
      const suggestion = suggestions[index]

      if (suggestion != null) {
        onSuggestionClick(suggestion)
      }

      removeLanguageToolTooltip()
    },
    { signal }
  )
}

const removeLanguageToolTooltip = () => {
  if (activeTooltipCleanup) {
    activeTooltipCleanup()
  }
}
