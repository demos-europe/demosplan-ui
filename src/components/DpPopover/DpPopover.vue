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
      :aria-label="panelLabel !== '' ? panelLabel : undefined"
      :data-cy="dataCy !== '' ? `${dataCy}:panel` : null"
      class="fixed z-flyout bg-surface shadow-md text-left"
      role="dialog"
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

  panelLabel: {
    type: String,
    required: false,
    default: '',
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
  if (!trigger.value || !panel.value) {
    return
  }

  const { x, y } = await computePosition(trigger.value, panel.value, {
    middleware: [offset(OFFSET), flip(), shift({ padding: VIEWPORT_PADDING })],
    placement: 'bottom-start',
    strategy: 'fixed',
  })

  panel.value.style.left = `${x}px`
  panel.value.style.top = `${y}px`
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
  }
})

onBeforeUnmount(stopTracking)
</script>
