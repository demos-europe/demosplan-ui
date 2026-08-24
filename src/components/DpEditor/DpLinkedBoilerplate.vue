<!--
  Node view for the `boilerplate` node (see libs/editorBoilerplates.js).

  Display only: nothing rendered here is saved. What ends up in the database is produced by
  the node's renderHTML, so the header, icons and tooltip never reach exports or the backend.
-->
<template>
  <node-view-wrapper
    ref="linkedBoilerplateWrapper"
    v-tooltip="de.editor.linkedBoilerplate.hint"
    as="div"
    class="mb-4 border-l-2 border-interactive hover:bg-surface-light"
  >
    <!--
      Grid rather than flex, and the middle track needs the explicit `minmax(0, …)`: the title
      does not wrap (`truncate`), so without a zero minimum its intrinsic width propagates up
      and widens the whole segment list column, which is a flex item with `min-width: auto`.
      `min-w-0` on the title itself is needed as well — the track rule doesn't cover the item.
    -->
    <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 px-2 pt-2 text-interactive">
      <dp-icon
        icon="puzzle-piece"
        weight="fill"
      />
      <span class="truncate min-w-0">{{ de.editor.linkedBoilerplate.label({ title: props.extension.options.getBoilerplateTitle(props.node.attrs.boilerplateId) }) }}</span>
      <button
        :aria-label="de.editor.linkedBoilerplate.editLabel"
        type="button"
        @click="handleEditClick"
      >
        <dp-icon
          class="cursor-pointer"
          icon="pencil-simple"
          weight="fill"
        />
      </button>
    </div>
    <!--
      Where ProseMirror renders the node's own content. Deliberately without
      `contenteditable="false"`: that would make the browser treat the whole subtree as a
      non-editable island and break cursor placement at the node's edges. The content is kept
      read-only by the extension's ProseMirror plugin instead.
    -->
    <node-view-content
      ref="linkedBoilerplateContent"
      class="p-2"
    />
  </node-view-wrapper>
</template>
<script setup>

import { de, DpIcon } from '~/components'
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Tooltip as vTooltip } from '~/directives'

/*
 * The fixed set of props Tiptap hands to every node view: node, editor, getPos,
 * updateAttributes, extension and a few more. Passed through as-is — without declaring them
 * they'd be treated as fallthrough attributes and end up in the DOM.
 */
const props = defineProps(nodeViewProps)

/**
 * Asks the consuming app to unlink this boilerplate. The node view cannot do it itself: it
 * needs a confirmation dialog and the boilerplate's title, both of which live in the app.
 *
 * `editorId` is passed along because several editors can be open at once (one per segment),
 * so the handler has to be able to tell which one this came from.
 */
const handleEditClick = () => {
  props.extension.options.onUnlinkRequest({
    boilerplateId: props.node.attrs.boilerplateId,
    pos: props.getPos(),
    editorId: props.editor.options.id,
  })
}
</script>
