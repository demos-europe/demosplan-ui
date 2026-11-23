<template>
  <button
    ref="trigger"
    v-bind="$attrs"
    :aria-controls="isOpen ? panelId : null"
    :aria-expanded="isOpen"
    :aria-label="ariaLabel"
    :class="[BASE_CLASSES, VARIANT_CLASSES[variant]]"
    :data-cy="dataCy !== '' ? dataCy : null"
    aria-haspopup="dialog"
    type="button"
    @click="toggle"
  >
    <slot name="trigger" />
  </button>

  <Teleport :to="teleportTarget">
    <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -- Keyboard handling of the dialog (Escape, Tab) -->
    <div
      v-if="isOpen"
      :id="panelId"
      ref="panel"
      v-on-click-outside="[close, { ignore: [trigger] }]"
      :aria-label="panelLabel"
      :data-cy="dataCy !== '' ? `${dataCy}:panel` : null"
      class="fixed z-flyout bg-surface shadow-md text-left outline-4 outline-offset-0 outline-transparent focus-visible:outline-interactive-hover/50"
      role="dialog"
      tabindex="-1"
      @keydown.esc.stop.prevent="closeAndFocusTrigger"
      @keydown.tab="handleTab"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { autoUpdate, computePosition, flip, hide, type Middleware, offset, shift } from '@floating-ui/dom'
import { nextTick, onBeforeUnmount, type PropType, ref, useId, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  // Accessible name of the trigger button, which has to announce what the button does
  ariaLabel: {
    type: String,
    required: true,
  },

  dataCy: {
    type: String,
    required: false,
    default: '',
  },

  // Accessible name of the panel, which is a dialog
  panelLabel: {
    type: String,
    required: true,
  },

  /**
   * Element above which the panel must not be placed, e.g. a sticky header that would otherwise be covered.
   * A function is resolved on every position update, for elements that do not exist yet when the popover renders.
   * The panel then gets a maximum height, and it is hidden while its trigger is below the boundary.
   */
  topBoundary: {
    type: [Object, Function] as PropType<HTMLElement | (() => HTMLElement | null | undefined) | null>,
    required: false,
    default: null,
  },

  // Visual style of the trigger button. Layout classes can be passed with `class`.
  variant: {
    type: String as PropType<PopoverVariant>,
    required: false,
    default: 'outline',
    validator: (prop: PopoverVariant) => ['outline', 'subtle'].includes(prop),
  },
})

// In compat mode, an attribute set to `false` is removed, but `aria-expanded="false"` has to be rendered
defineOptions({
  compatConfig: { ATTR_FALSE_VALUE: false },
  // Attributes like `class` belong to the trigger button, not to the fragment root
  inheritAttrs: false,
})

type PopoverVariant = 'outline' | 'subtle'

// The subtle border is transparent, so both variants have the same size
const BASE_CLASSES = 'inline-flex cursor-pointer items-center rounded-md border px-1.5 py-0.5 text-xs text-interactive outline-4 outline-offset-0 outline-transparent hover:bg-interactive-subtle-hover focus-visible:outline-interactive-hover/50 aria-expanded:bg-interactive-subtle-active'

const VARIANT_CLASSES: Record<PopoverVariant, string> = {
  outline: 'border-interactive',
  subtle: 'border-transparent',
}

// Distance between trigger and panel, and minimal distance to the viewport edge (in px)
const OFFSET = 4
const VIEWPORT_PADDING = 8

const isOpen = ref<boolean>(false)
const panel = ref<HTMLElement | null>(null)
const panelId = `popover-${useId()}`
// Inside a modal dialog everything outside of the dialog is inert, so the panel has to stay within the dialog
const teleportTarget = ref<HTMLElement | string>('body')
const trigger = ref<HTMLElement | null>(null)

let stopAutoUpdate: (() => void) | null = null

const close = (): void => {
  isOpen.value = false
}

const toggle = (): void => {
  if (!isOpen.value) {
    teleportTarget.value = trigger.value?.closest('dialog') ?? 'body'
  }

  isOpen.value = !isOpen.value
}

const closeAndFocusTrigger = (): void => {
  close()
  trigger.value?.focus()
}

// Elements that can receive the focus with Tab. Elements with `tabindex="-1"` and hidden inputs cannot.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]',
]
  .map(selector => `${selector}:not([tabindex="-1"])`)
  .join(', ')

// `checkVisibility` is not available everywhere (e.g. jsdom), the element then counts as visible
const isVisible = (element: HTMLElement): boolean => element.checkVisibility?.({ visibilityProperty: true }) ?? true

/*
 * The panel is teleported away from the trigger. Leaving it closes it and continues from the trigger, which is where
 * the panel belongs in the reading order. With Tab, the browser then moves the focus on to the next element.
 * With Shift+Tab, the trigger itself is the previous element, so the browser must not move the focus any further.
 */
const handleTab = (event: KeyboardEvent): void => {
  const panelEl = panel.value

  if (!panelEl) {
    return
  }

  const focusable = Array.from(panelEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter(isVisible)
  const edge = event.shiftKey ? focusable[0] : focusable.at(-1)
  const isLeavingPanel = event.shiftKey
    ? event.target === panelEl || event.target === edge
    : focusable.length === 0 || event.target === edge

  if (!isLeavingPanel) {
    return
  }

  if (event.shiftKey) {
    event.preventDefault()
  }

  closeAndFocusTrigger()
}

// Fallback for Escape while the focus is outside of the panel. Within the panel, Escape is stopped by the panel itself.
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeAndFocusTrigger()
  }
}

const resolveTopBoundary = (): HTMLElement | null => {
  const boundary = typeof props.topBoundary === 'function' ? props.topBoundary() : props.topBoundary

  return boundary ?? null
}

// Only the area below the bottom edge of the boundary is available, as if the viewport started there
const getMiddleware = (): Middleware[] => {
  const boundary = resolveTopBoundary()

  if (!boundary) {
    return [flip(), shift({ padding: VIEWPORT_PADDING })]
  }

  // Padding is measured from the edges of the boundary, so the area has to be passed in viewport coordinates
  const top = Math.max(boundary.getBoundingClientRect().bottom, 0)
  const detectOverflowOptions = {
    boundary: {
      x: 0,
      y: top,
      width: document.documentElement.clientWidth,
      height: Math.max(window.innerHeight - top, 0),
    },
    padding: VIEWPORT_PADDING,
  }

  return [
    flip(detectOverflowOptions),
    shift(detectOverflowOptions),
    hide(detectOverflowOptions),
  ]
}

// Below the trigger, flipped above if there is no space. Fixed positioning avoids clipping by scroll containers.
const updatePosition = async (): Promise<void> => {
  const panelEl = panel.value

  if (!trigger.value || !panelEl) {
    return
  }

  const { x, y, middlewareData } = await computePosition(trigger.value, panelEl, {
    middleware: [offset(OFFSET), ...getMiddleware()],
    placement: 'bottom-start',
    strategy: 'fixed',
  })

  // The panel may have been closed or replaced while the position was computed
  if (panel.value !== panelEl) {
    return
  }

  panelEl.style.left = `${x}px`
  panelEl.style.top = `${y}px`
  // Hidden instead of closed, so the focus inside the panel is kept until the trigger is visible again
  panelEl.style.visibility = middlewareData.hide?.referenceHidden ? 'hidden' : ''
}

const stopTracking = (): void => {
  stopAutoUpdate?.()
  stopAutoUpdate = null
  document.removeEventListener('keydown', handleKeydown)
}

watch(isOpen, async (open) => {
  if (!open) {
    stopTracking()

    return
  }

  document.addEventListener('keydown', handleKeydown)
  await nextTick()

  if (trigger.value && panel.value) {
    stopAutoUpdate = autoUpdate(trigger.value, panel.value, updatePosition)
    // The panel is teleported away from the trigger, so keyboard and screen reader users have to be moved into it
    panel.value.focus()
  }
})

onBeforeUnmount(stopTracking)
</script>
