import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { DpTransitionExpand } from '~/components'

const meta: Meta<typeof DpTransitionExpand> = {
  title: 'Components/TransitionExpand',
  component: DpTransitionExpand,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof DpTransitionExpand>

export const Basic: Story = {
  render: () => ({
    components: { DpTransitionExpand },
    setup() {
      const isVisible = ref(false)

      return { isVisible }
    },
    template: `
      <div class="w-[400px]">
        <button
          class="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          @click="isVisible = !isVisible"
        >
          Toggle Content
        </button>
        <dp-transition-expand>
          <div v-show="isVisible" class="p-4 bg-gray-100 rounded">
            <p>This content expands and collapses with a smooth animation.</p>
            <p class="mt-2">The height is calculated automatically based on the content.</p>
          </div>
        </dp-transition-expand>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `
<template>
  <button @click="isVisible = !isVisible">Toggle Content</button>
  <dp-transition-expand>
    <div v-show="isVisible">
      <p>This content expands and collapses with a smooth animation.</p>
      <p>The height is calculated automatically based on the content.</p>
    </div>
  </dp-transition-expand>
</template>

<script setup>
import { ref } from 'vue'
import DpTransitionExpand from '~/components/DpTransitionExpand'

const isVisible = ref(false)
</script>
`
      }
    }
  }
}
