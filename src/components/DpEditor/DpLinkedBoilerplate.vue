<template>
  <node-view-wrapper
    ref="linkedBoilerplateWrapper"
    v-tooltip="de.editor.linkedBoilerplate.hint"
    as="div"
    class="border-l-2 border-interactive hover:bg-surface-light"
  >
    <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 px-2 pt-2 text-interactive">
      <dp-icon
        icon="puzzle-piece"
        weight="fill"
      />
      <span class="truncate min-w-0">{{ de.editor.linkedBoilerplate.label({ title: props.extension.options.getBoilerplateTitle(props.node.attrs.boilerplateId) }) }}</span>
      <dp-icon
        icon="pencil-simple"
        weight="fill"
      />
    </div>
    <node-view-content
      ref="linkedBoilerplateContent"
      class="p-2"
    />
  </node-view-wrapper>
</template>
<script setup>

import { nodeViewProps, NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import { Tooltip as vTooltip } from '~/directives'
import { de } from '../shared/translations'
import { DpIcon } from '~/components'

const props = defineProps(nodeViewProps)
</script>
