<template>
  <div class="relative">
    <!-- Search container -->
    <div
      aria-haspopup="listbox"
      aria-controls="options-list"
      :aria-expanded="isOptionsListVisible"
      :class="[
        isInputFocused ? 'border-interactive' : 'border-gray-300',
        { 'focus-within:ring-1 focus-within:ring-interactive': isInputFocused }
      ]"
      class="border rounded-md flex items-center overflow-hidden relative transition-colors duration-200 ease-in-out px-1 py-[2px]"
      role="combobox"
      :style="boxHeightStyle"
      tabindex="0"
      @mousedown.stop.prevent="focusInput">
      <label
        id="autocomplete-label"
        for="input-box"
        :class="{
          'h-full w-full px-1 py-[2px] text-gray-400 flex items-center m-0': true,
          'absolute pointer-events-none': !isPlaceholderVisible,
          'sr-only': !isPlaceholderVisible
        }">
        {{ placeholder }}
      </label>
      <div
        id="input-box"
        ref="input"
        role="textbox"
        :class="{
          'sr-only': isPlaceholderVisible,
          'w-auto min-w-[10px]': isInputFocused,
          'w-full': !isInputFocused
        }"
        class="py-[2px] px-1 outline-none whitespace-pre overflow-hidden"
        contenteditable="true"
        tabindex="0"
        aria-labelledby="autocomplete-label"
        :style="boxHeightStyle"
        @mousedown.stop.prevent="focusInput"
        @keydown.stop="runSpecialKeys"
        @focusout="isInputFocused = false" />
      <div
        v-show="isInputFocused"
        :style="boxHeightStyle"
        class="w-auto max-w-full py-[2px] text-gray-300 overflow-hidden whitespace-pre flex items-center"
        aria-hidden="true">
        {{ completion }}
      </div>
    </div>

    <!-- Options list -->
    <div class="relative z-flyout">
      <ol
        v-if="isOptionsListVisible"
        id="options-list"
        role="listbox"
        class="absolute w-full border-x border-b border-gray-300 p-2 bg-surface z-10 shadow-md mt-[1px]">
        <li
          v-for="(option, idx) in props.options"
          :key="option[label] + idx"
          :class="{ 'bg-gray-200': idx === listPosition }"
          class="font-medium cursor-pointer px-2 py-1 hover:bg-interactive-subtle-hover hover:text-interactive-hover"
          role="option"
          :aria-selected="idx === listPosition"
          tabindex="0"
          @mousedown.stop.prevent="selectCurrentOption(option as Record<string, unknown>)">
          <slot
            name="option"
            :option="option">
            {{ option[label] }}
          </slot>
        </li>
        <li
          v-if="props.options.length === 0"
          class="text-gray-500 px-2 py-1">
          {{ noResultsText }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { de } from '~/components/shared/translations'
import { dpApi } from '~/lib/DpApi'

/**
 * This component provides an autocomplete input field with dropdown suggestions.
 * It fetches suggestions based on user input via an API call.
 */

// Props
const props = defineProps({
  /**
   * Height of the autocomplete box
   */
  height: {
    type: String,
    required: false,
    default: '28px'
  },

  /**
   * The property name from the options objects to display
   */
  label: {
    type: String,
    required: false,
    default: 'label'
  },

  /**
   * Array of options to display in the dropdown
   */
  options: {
    type: Array,
    required: false,
    default: () => ([])
  },

  /**
   * Placeholder text to display when the input is empty
   */
  placeholder: {
    type: String,
    required: false,
    default: de.placeholderAutoSuggest
  },

  /**
   * Function that generates the API route for fetching suggestions
   */
  routeGenerator: {
    type: Function,
    required: true
  },

  /**
   * Current value of the input (v-model)
   */
  modelValue: {
    type: String,
    required: false,
    default: ''
  },

  /**
   * Text to display when no results are found
   */
  noResultsText: {
    type: String,
    required: false,
    default: de.autocompleteNoResults
  },

  /**
   * Minimum characters required before showing suggestions
   */
  minChars: {
    type: Number,
    required: false,
    default: 3
  }
})

const emit = defineEmits([
  'update:modelValue',
  'search-changed',
  'selected',
  'searched'
])

const input = ref<HTMLElement | null>(null)
const currentQuery = ref(props.modelValue)
const listPosition = ref(-1)
const isOpenList = ref(true)
const isInputFocused = ref(false)
const isLoading = ref(false)


const boxHeightNumber = computed(() => {
  return parseInt(props.height.replace('px', ''))
})

const boxHeightStyle = computed(() => {
  return `height: ${props.height}; line-height: ${boxHeightNumber.value - 8}px;`
})

const completion = computed(() => {
  if (!currentQuery.value || currentQuery.value.length === 0) {
    return ''
  }

  const reg = new RegExp(`^(${currentQuery.value})(.+)`, 'i')

  return props.options.reduce((acc: string, val: Record<string, unknown>) => {
    const isMatching = (val[props.label] as string)?.match?.(reg)

    if (!isMatching) {
      return acc
    }

    if (acc === '') {
      return isMatching[2]
    }

    if (isMatching && (val[props.label] as string).length < acc.length) {
      return isMatching[2]
    }

    return acc
  }, '')
})

const isOptionsListVisible = computed(() => {
  return currentQuery.value.length >= props.minChars &&
    isOpenList.value &&
    isInputFocused.value
})

const isPlaceholderVisible = computed(() => {
  return (!isInputFocused.value && (!currentQuery.value || currentQuery.value.length === 0))
})

watch(() => props.modelValue, (newVal) => {
  if (currentQuery.value !== newVal) {
    currentQuery.value = newVal
    setTextContent(newVal)
  }
})

watch(() => props.options, () => {
  // Reset list position when options change
  listPosition.value = -1
})

// Methods
function focusInput() {
  isInputFocused.value = true
  const el = input.value

  if (!el) {
    return
  }

  nextTick(() => {
    if (currentQuery.value) {
      if (document.createRange && window.getSelection) {
        const range = document.createRange()
        const sel = window.getSelection()

        if (el.childNodes.length > 0) {
          const node = el.childNodes[0]
          range.setStart(node, node.textContent?.length || 0)
          range.collapse(true)
          sel?.removeAllRanges()
          sel?.addRange(range)
        }
      }
    }
    el.focus()
  })
}

function getTextContent(el = input.value) {
  return el?.textContent || ''
}

function runSpecialKeys(e: KeyboardEvent) {
  const key = e.key

  if (key === 'Tab' && completion.value) {
    e.preventDefault()
    currentQuery.value += completion.value
    setTextContent(currentQuery.value)
    focusInput()
    emit('update:modelValue', currentQuery.value)
  } else if (key === 'ArrowDown' || key === 'Down') {
    e.preventDefault()
    if (listPosition.value < props.options.length - 1) {
      listPosition.value += 1
    }
  } else if (key === 'ArrowUp' || key === 'Up') {
    e.preventDefault()
    if (listPosition.value > -1) {
      listPosition.value -= 1
    }
  } else if (key === 'Enter') {
    e.preventDefault()
    if (listPosition.value > -1 && props.options[listPosition.value]) {
      selectCurrentOption(props.options[listPosition.value] as Record<string, unknown>)
    } else {
      triggerSearch()
    }
  } else if (key === 'Escape') {
    e.preventDefault()
    isOpenList.value = false
  }
}

function selectCurrentOption (option: Record<string, unknown>) {
  if (!option) return

  currentQuery.value = option[props.label] as string
  setTextContent(currentQuery.value)
  listPosition.value = -1

  emit('selected', option)
  emit('update:modelValue', currentQuery.value)

  isOpenList.value = false
  focusInput()
}

function setTextContent (value: string, el = input.value) {
  if (el) {
    el.textContent = value
  }
}

function triggerSearch () {
  emit('searched', currentQuery.value)
  isOpenList.value = false
}

function updateValue () {
  const content = getTextContent()

  if (content !== currentQuery.value) {
    currentQuery.value = content
    isOpenList.value = true
    emit('update:modelValue', currentQuery.value)

    if (content && content.length >= props.minChars) {
      fetchOptions(content)
    }
  }
}

async function fetchOptions(searchString: string) {
  if (!searchString || searchString.length < props.minChars) {
    return
  }

  isLoading.value = true

  try {
    const route = props.routeGenerator(searchString)
    const response = await dpApi({
      method: 'GET',
      url: route,
      params: {},
      headers: {},
      data: {}
    })

    // Only emit results that match the current search -> prevents race conditions
    if (currentQuery.value === searchString) {
      emit('search-changed', response)
    }
  } catch (e) {
    console.error('Error fetching autocomplete options:', e)
  } finally {
    isLoading.value = false
  }
}

const observer = new MutationObserver((mutations) => {
  const hasContentChanged = mutations.some(mutation =>
    // Direct text change
    mutation.type === 'characterData' ||
    // Nodes added or removed
    mutation.addedNodes.length > 0 ||
    mutation.removedNodes.length > 0
  )

  if (hasContentChanged) {
    updateValue()
  }
})

// Setup mutation observer to track contenteditable changes
onMounted(() => {
  observer.observe(input.value, {
    childList: true,
    characterData: true,
    subtree: true
  })
})

onUnmounted(() => {
  observer.disconnect()
})
</script>
