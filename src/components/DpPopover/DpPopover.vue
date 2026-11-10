<template>
  <button
    ref="trigger"
    :aria-controls="isOpen ? panelId : undefined"
    :aria-expanded="isOpen"
    :aria-label="ariaLabel !== '' ? ariaLabel : undefined"
    :class="buttonClass"
    :data-cy="dataCy !== '' ? dataCy : null"
    aria-haspopup="dialog"
    type="button"
    @click="toggle"
  >
    <slot name="trigger" />
  </button>

  <Teleport to="body">
    <div
      v-if="isOpen"
      :id="panelId"
      ref="panel"
      v-on-click-outside="[close, { ignore: [trigger] }]"
      :aria-label="panelLabel"
      :data-cy="dataCy !== '' ? `${dataCy}:panel` : null"
      class="fixed z-flyout bg-surface shadow-md text-left"
      role="dialog"
      tabindex="-1"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

defineProps({
  ariaLabel: {
    type: String,
    required: false,
    default: '',
  },

  buttonClass: {
    type: String,
    required: false,
    default: '',
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
})

// Distance between trigger and panel, and minimal distance to the viewport edge (in px)
const OFFSET = 4
const VIEWPORT_PADDING = 8

const isOpen = ref<boolean>(false)
const panel = ref<HTMLElement | null>(null)
const panelId = `popover-${useId()}`
const trigger = ref<HTMLElement | null>(null)

let stopAutoUpdate: (() => void) | null = null

const close = (): void => {
  isOpen.value = false
}

const toggle = (): void => {
  isOpen.value = !isOpen.value
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    close()
    trigger.value?.focus()
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
    // The panel is teleported to the end of the body, so keyboard and screen reader users have to be moved into it
    panel.value.focus()
  }
})

onBeforeUnmount(stopTracking)
</script>
