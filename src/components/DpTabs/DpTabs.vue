<template>
  <div>
    <div
      class="flex flex-wrap flex-col sm:flex-row gap-x-4 gap-y-2 items-start list-style-none border--bottom"
      role="tablist"
    >
      <button
        v-for="(tab, idx) in tabs"
        :id="`tab-${tab.props.id}`"
        :key="`tab:${idx}`"
        role="tab"
        class="btn--blank o-link--default border--bottom"
        :class="[
          { 'is-active': activeTabId === tab.props.id },
          activeTabId === tab.props.id ? 'color-interactive border-interactive -mb-px pb-[13px]' : 'border--none color-text-muted mb-px pb-2',
          tabSize === 'large' ? 'font-size-larger' : 'font-size-large',
        ]"
        :aria-selected="activeTabId === tab.props.id"
        :aria-controls="tab.props.id"
        :data-cy="tab.props.id"
        @click.prevent="handleTabChange(tab.props.id)"
      >
        {{ tab.props.label }}
        <span
          v-if="tab.props.suffix"
          v-cleanhtml="tab.props.suffix"
        />
      </button>
    </div>
    <div>
      <slot :active-tab-id="activeTabId" />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useSlots } from 'vue'
import { CleanHtml as vCleanhtml } from '~/directives'

const props = defineProps( {
  activeId: {
    type: String,
    required: false,
    default: null,
  },

  tabSize: {
    type: String,
    required: false,
    default: 'large',
    validator: (prop) => ['medium', 'large'].includes(prop),
  },

  /**
   * Active tab state may be persisted via a url fragment. Also, all clicks are pushed
   * to the browser history to enable state change when browser navigation is used.
   */
  useUrlFragment: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['change'])
const slots = useSlots()

const activeTabId = ref(null)

const tabs = computed(() => {
  return slots.default()[0].children.filter(child => child.type.name === 'DpTab')
})

/**
 * When users click the back button, the tabs should behave accordingly.
 */
const handleHashChange = () => {
  const hash = window.location.hash.slice(1)

  if (isTabId(hash)) {
    setActiveTab(hash)
  }
}

const handleTabChange = (id) => {
  emit('change', id)
  setActiveTab(id)

  if (props.useUrlFragment) {
    history.pushState(null, null, `#${id}`)
  }
}

/**
 * Check if a given string is a valid tab id.
 * @param id
 * @return {boolean}
 */
const isTabId = (id) => {
  return tabs.value.map(tab => tab.props.id).includes(id)
}

const setActiveTab = (id) => {
  activeTabId.value = id
}

/**
 * If a hash specifies a tab, activate it. If a tab is activated
 * via prop, activate that tab. Fallback to the first tab.
 */
const setInitialTab = () => {
  const hash = window.location.hash.slice(1)

  if (props.useUrlFragment && isTabId(hash)) {
    handleTabChange(hash)
  } else if (props.activeId) {
    handleTabChange(props.activeId)
  } else {
    handleTabChange(tabs.value[0].props.id)
  }
}

onMounted (() => {
  setInitialTab()

  if (props.useUrlFragment) {
    window.addEventListener('hashchange', handleHashChange)
  }
})

onBeforeUnmount (() => {
  if (props.useUrlFragment) {
    window.removeEventListener('hashchange', handleHashChange)
  }
})
</script>
