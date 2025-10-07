<template>
  <div class="relative">
    <dp-resettable-input
      :id="id"
      ref="suggestionInput"
      v-model="currentQuery"
      :input-attributes="{
        placeholder: placeholder,
        'aria-labelledby': ariaLabelledby,
        'aria-haspopup': 'listbox',
        'aria-controls': 'suggestions-list',
        'aria-expanded': isOptionsListVisible,
        'aria-activedescendant': activeDescendantId,
        'data-cy': dataCy,
        autocomplete: 'off'
      }"
      :default-value="defaultValue"
      :required="required"
      :rounded="rounded"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeydown"
      @reset="handleReset">

      <template v-if="searchButton">
        <dp-button
          class="search h-[32px] w-[34px] justify-center rounded-r-md rounded-l-none border !border-l-1 z-[5] -ml-px"
          data-cy="suggestionSearchButton"
          hide-text
          icon="search"
          :text="searchButtonText"
          variant="outline"
          @click="triggerSearch" />
      </template>
    </dp-resettable-input>

    <!-- Screen reader live region for announcements -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="sr-only">
      {{ screenReaderStatus }}
    </div>

    <!-- Options list -->
    <div class="relative z-flyout">
      <div
        v-if="isOptionsListVisible"
        id="suggestions-list"
        role="listbox"
        class="absolute w-full border-x border-b border-neutral p-2 bg-surface z-10 shadow-md mt-[1px]"
        @mouseleave="listPosition = -1">
        <div
          v-for="(option, idx) in options"
          :id="getOptionId(idx)"
          :key="getOptionKey(option, idx)"
          :class="idx === listPosition ? 'bg-interactive-subtle-hover text-interactive-hover font-bold' : ''"
          class="font-medium cursor-pointer px-2 py-1 hover:bg-interactive-subtle-hover hover:text-interactive-hover"
          role="option"
          :aria-selected="idx === listPosition"
          @mousedown.stop.prevent="selectOption(option)"
          @mouseenter="listPosition = idx">
          <slot
            name="option"
            :option="option">
            {{ option[label] }}
          </slot>
        </div>
        <div
          v-if="options.length === 0 && showNoResults"
          class="text-gray-500 px-2 py-1">
          {{ noResultsText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  compatConfig: {
    COMPONENT_V_MODEL: false
  }
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { de } from '~/components/shared/translations'
import { dpApi } from '~/lib/DpApi'
import DpResettableInput from '~/components/DpResettableInput'
import DpButton from '~/components/DpButton'

/**
 * DpAutocomplete - A suggestion input component with dropdown functionality.
 * Provides real-time suggestions based on user input via API calls.
 */

const props = defineProps({
  ariaLabelledby: {
    type: String,
    required: false,
    default: null
  },

  dataCy: {
    type: String,
    required: false,
    default: ''
  },

  /**
   * Default value for reset functionality
   */
  defaultValue: {
    type: String,
    required: false,
    default: ''
  },

  /**
   * Unique identifier for the input
   */
  id: {
    type: String,
    required: true
  },

  /**
   * The property name from options objects to display
   */
  label: {
    type: String,
    required: false,
    default: 'label'
  },

  /**
   * Minimum characters required before showing suggestions
   */
  minChars: {
    type: Number,
    required: false,
    default: 3
  },

  /**
   * Current value of the input (v-model)
   */
  modelValue: {
    type: String,
    required: false,
    default: ''
  },

  noResultsText: {
    type: String,
    required: false,
    default: de.autocompleteNoResults
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
   * Placeholder text for the input
   */
  placeholder: {
    type: String,
    required: false,
    default: de.placeholderAutoSuggest
  },

  required: {
    type: Boolean,
    required: false,
    default: false
  },

  /**
   * Function that generates the API route for fetching suggestions
   */
  routeGenerator: {
    type: Function,
    required: true
  },

  rounded: {
    type: String,
    required: false,
    default: 'full',
    validator: (prop: string) => ['full', 'left', 'right'].includes(prop)
  },

  /**
   * Show search button inside input
   */
  searchButton: {
    type: Boolean,
    required: false,
    default: true
  },

  /**
   * Aria-label and title for icon-only search button
   */
  searchButtonText: {
    type: String,
    required: false,
    default: de.search.searching
  }
})

const emit = defineEmits([
  'blur',
  'focus',
  'reset',
  'search',
  'search-changed',
  'searched',
  'selected',
  'update:modelValue'
])

const suggestionInput = ref<InstanceType<typeof DpResettableInput> | null>(null)
const currentQuery = ref(props.modelValue)
const isInputFocused = ref(false)
const isLoading = ref(false)
const listPosition = ref(-1)
const showNoResults = ref(false)

const isOptionsListVisible = computed(() => {
  return currentQuery.value.length >= props.minChars &&
    isInputFocused.value &&
    (props.options.length > 0 || showNoResults.value)
})

const activeDescendantId = computed(() => {
  return listPosition.value >= 0 ? getOptionId(listPosition.value) : null
})

const screenReaderStatus = computed(() => {
  if (currentQuery.value.length < props.minChars) {
    return ''
  }

  if (isLoading.value) {
    return de.loadingData
  }

  if (props.options.length === 0 && showNoResults.value) {
    return de.search.noResults(currentQuery.value)
  }

  if (props.options.length > 0) {
    return de.search.resultsHighlighted(props.options.length, listPosition.value)
  }

  return ''
})

watch(() => props.modelValue, (newVal) => {
  if (currentQuery.value !== newVal) {
    currentQuery.value = newVal
  }
})

watch(() => props.options, () => {
  listPosition.value = -1
  showNoResults.value = currentQuery.value.length >= props.minChars && props.options.length === 0
})

const getOptionId = (idx: number): string => {
  return `${props.id}-option-${idx}`
}

const getOptionKey = (option: Record<string, unknown>, idx: number): string => {
  return `${option[props.label]}_${idx}`
}



/**
 * KEYBOARD EVENT HANDLERS
 * For accessibility and navigation
 * Handle arrow keys, enter, escape, home, end, tab, and blur events.
 */

const handleArrowDown = (event: KeyboardEvent) => {
  event.preventDefault()

  if (isOptionsListVisible.value && props.options.length > 0) {
    listPosition.value = listPosition.value < props.options.length - 1
      ? listPosition.value + 1
      : 0
  }
}

const handleArrowUp = (event: KeyboardEvent) => {
  event.preventDefault()

  if (isOptionsListVisible.value && props.options.length > 0) {
    listPosition.value = listPosition.value > 0
      ? listPosition.value - 1
      : props.options.length - 1
  }
}

const handleBlur = () => {
  // Delay blur to allow option selection
  setTimeout(() => {
    isInputFocused.value = false
    emit('blur')
  }, 150)
}

const handleEnd = (event: KeyboardEvent) => {
  event.preventDefault()

  if (isOptionsListVisible.value && props.options.length > 0) {
    listPosition.value = props.options.length - 1
  }
}

const handleEnter = (event: KeyboardEvent) => {
  event.preventDefault()

  if (listPosition.value >= 0 && props.options[listPosition.value]) {
    selectOption(props.options[listPosition.value] as Record<string, unknown>)
  } else {
    triggerSearch()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  event.preventDefault()

  if (isOptionsListVisible.value) {
    isInputFocused.value = false
    listPosition.value = -1
  }
}

const handleFocus = () => {
  isInputFocused.value = true
  emit('focus')
}

const handleHome = (event: KeyboardEvent) => {
  event.preventDefault()

  if (isOptionsListVisible.value && props.options.length > 0) {
    listPosition.value = 0
  }
}

const handleReset = () => {
  currentQuery.value = props.defaultValue
  emit('update:modelValue', props.defaultValue)
  emit('reset')
  showNoResults.value = false

  nextTick(() => {
    suggestionInput.value?.$el?.querySelector('input')?.focus()
  })
}

const handleTab = () => {
  if (isOptionsListVisible.value) {
    isInputFocused.value = false
    listPosition.value = -1
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  const handlers: Record<string, (event: KeyboardEvent) => void> = {
    'ArrowDown': handleArrowDown,
    'Down': handleArrowDown,
    'ArrowUp': handleArrowUp,
    'Up': handleArrowUp,
    'Home': handleHome,
    'End': handleEnd,
    'Tab': handleTab,
    'Enter': handleEnter,
    'Escape': handleEscape
  }

  const handler = handlers[event.key]

  if (handler) {
    handler(event)
  }
}

const selectOption = (option: Record<string, unknown>) => {
  if (!option) {
    return
  }

  currentQuery.value = option[props.label] as string
  emit('update:modelValue', currentQuery.value)
  emit('selected', option)

  listPosition.value = -1
  isInputFocused.value = false
  showNoResults.value = false

  // Focus the input after selection
  nextTick(() => {
    suggestionInput.value?.$el?.querySelector('input')?.focus()
  })
}

const handleInput = (value: string) => {
  currentQuery.value = value
  emit('update:modelValue', value)

  if (value && value.length >= props.minChars) {
    fetchSuggestions(value)
  } else {
    showNoResults.value = false
  }
}

const triggerSearch = () => {
  emit('searched', currentQuery.value)
  emit('search', currentQuery.value)
  isInputFocused.value = false
}

const fetchSuggestions = async (searchString: string) => {
  if (!searchString || searchString.length < props.minChars) {
    return
  }

  isLoading.value = true
  showNoResults.value = false

  try {
    const route = props.routeGenerator(searchString)
    const response = await dpApi({
      method: 'GET',
      url: route,
      params: {},
      headers: {},
      data: {}
    })

    // Only emit results that match current search to prevent race conditions
    if (currentQuery.value === searchString) {
      emit('search-changed', response)
    }
  } catch (e) {
    console.error('Error fetching suggestions:', e)
  } finally {
    isLoading.value = false
  }
}

</script>
