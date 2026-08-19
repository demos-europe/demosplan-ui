<template>
  <node-view-wrapper
    ref="linkedBoilerplateWrapper"
    as="div"
    class="border-l-2 border-interactive hover:bg-surface-light"
    v-tooltip="de.linkedBoilerplate.hint"
  >
    <node-view-content
      ref="linkedBoilerplateContent"
      class="p-2"
    >
    </node-view-content>
  </node-view-wrapper>
</template>
<script setup>

import { nodeViewProps, NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import prefixClass from '~/utils/prefixClass'
import { Tooltip as vTooltip } from '~/directives'
import { de } from '../shared/translations'

defineProps(nodeViewProps)
</script>
