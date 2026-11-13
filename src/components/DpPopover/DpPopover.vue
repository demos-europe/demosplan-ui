<template>
  <button
    ref="trigger"
    v-bind="$attrs"
    :aria-controls="isOpen ? panelId : null"
    :aria-expanded="isOpen"
    :aria-label="ariaLabel"
    :class="variantClasses"
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
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { computed, nextTick, onBeforeUnmount, type PropType, ref, useId, watch } from 'vue'
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

  // Visual style of the trigger button. Layout classes can be passed with `class`.
  variant: {
    type: String as PropType<PopoverVariant>,
    required: false,
    default: 'outline',
    validator: (prop: PopoverVariant) => ['outline'].includes(prop),
  },
})

// In compat mode, an attribute set to `false` is removed, but `aria-expanded="false"` has to be rendered
defineOptions({
  compatConfig: { ATTR_FALSE_VALUE: false },
  // Attributes like `class` belong to the trigger button, not to the fragment root
  inheritAttrs: false,
})

type PopoverVariant = 'outline'

const VARIANT_CLASSES: Record<PopoverVariant, string> = {
  outline: 'inline-flex cursor-pointer items-center rounded-md border border-interactive px-1.5 py-0.5 text-xs text-interactive outline-4 outline-offset-0 outline-transparent hover:bg-interactive-subtle-hover focus-visible:outline-interactive-hover/50 aria-expanded:bg-interactive-subtle-active',
}

const variantClasses = computed<string>(() => VARIANT_CLASSES[props.variant])

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
  const edge = event.shiftKey ? focusable[0] : focusable[focusable.length - 1]
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

// Below the trigger, flipped above if there is no space. Fixed positioning avoids clipping by scroll containers.
const updatePosition = async (): Promise<void> => {
  const panelEl = panel.value

  if (!trigger.value || !panelEl) {
    return
  }

  const { x, y } = await computePosition(trigger.value, panelEl, {
    middleware: [offset(OFFSET), flip(), shift({ padding: VIEWPORT_PADDING })],
    placement: 'bottom-start',
    strategy: 'fixed',
  })

  // The panel may have been closed or replaced while the position was computed
  if (panel.value !== panelEl) {
    return
  }

  panelEl.style.left = `${x}px`
  panelEl.style.top = `${y}px`
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
