<!--
  Node view for the `boilerplate` node (see libs/editorBoilerplates.js). Display only —
  renderHTML there is what's actually saved.
-->
<template>
  <node-view-wrapper
    v-tooltip="de.editor.linkedBoilerplate.hint"
    as="div"
    class="mb-4 border-l-2 border-interactive hover:bg-surface-light"
  >
    <!--
      Grid, not flex: the middle track needs `minmax(0, …)` and the title needs `min-w-0`, or
      the truncated title's intrinsic width still propagates up and widens the row.
    -->
    <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 px-2 pt-2 text-interactive">
      <dp-icon
        aria-hidden="true"
        icon="puzzle-piece"
        weight="fill"
      />
      <span class="truncate min-w-0">{{ de.editor.linkedBoilerplate.label({ title: props.extension.options.getBoilerplateTitle(props.node.attrs.boilerplateId) }) }}</span>
      <dp-button
        hide-text
        icon="pencil-simple"
        icon-weight="fill"
        :text="de.editor.linkedBoilerplate.editLabel"
        variant="transparent"
        @click="handleEditClick"
      />
    </div>
    <!--
      Where ProseMirror renders the node's content. No `contenteditable="false"` — that breaks
      cursor placement at the edges; the extension's plugin keeps it read-only instead.
    -->
    <node-view-content class="p-2" />
  </node-view-wrapper>
</template>
<script setup>

import { de, DpButton, DpIcon } from '~/components'
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Tooltip as vTooltip } from '~/directives'

// Tiptap's fixed node view props. Declared as-is, or they'd become fallthrough attrs in the DOM.
const props = defineProps(nodeViewProps)

/**
 * Asks the host app to unlink this boilerplate — it owns the confirmation dialog and title.
 * `editorId` identifies which editor this came from, since several can be open at once.
 */
const handleEditClick = () => {
  props.extension.options.onUnlinkRequest({
    boilerplateId: props.node.attrs.boilerplateId,
    pos: props.getPos(),
    editorId: props.editor.options.id,
  })
}
</script>
