<template>
  <li
    :id="nodeId"
    class="border--top relative"
    data-cy="treeListNode">
    <div class="c-treelist__node flex">
      <div
        v-if="isDraggable"
        class="inline-block u-p-0_25 u-pr-0 u-mt-0_125"
        :class="dragHandle">
        <dp-icon
          class="c-treelist__drag-handle-icon"
          icon="drag-handle" />
      </div>
      <dp-tree-list-checkbox
        v-if="isSelectable"
        :checked="isNodeSelected"
        :name="checkboxIdentifier"
        :string-value="nodeId"
        @check="handleSelectionToggle" />
      <div
        class="flex grow items-start"
        :style="indentationStyle">
        <dp-tree-list-toggle
          v-if="isBranch"
          v-model="isExpanded"
          class="c-treelist__folder text--left u-pv-0_25"
          :class="{ 'pointer-events-none': 0 === children.length }"
          :icon-class-prop="iconClassFolder" />
        <div class="grow u-pl-0 u-p-0_25">
          <slot
            v-if="isBranch"
            name="branch"
            :node-element="node"
            :node-children="children"
            :node-id="nodeId"
            :parent-id="parentId" />
          <slot
            v-if="isLeaf"
            name="leaf"
            :node-element="node"
            :node-id="nodeId"
            :parent-id="parentId" />
        </div>
      </div>
      <dp-tree-list-toggle
        v-if="isBranch"
        v-model="isExpanded"
        v-tooltip="!hasToggle ? translations.noElementsExisting : ''"
        data-cy="treeListChildToggle"
        class="self-start"
        :disabled="!hasToggle" />
      <div
        v-else
        class="min-w-4" />
    </div>
    <component
      :is="draggable ? 'dp-draggable' : 'div'"
      :drag-across-branches="options.dragAcrossBranches ? options.dragAcrossBranches : null"
      class="list-style-none u-mb-0 u-1-of-1"
      :content-data="draggable ? children : []"
      data-cy="treeListChild"
      draggable-tag="ul"
      :group-id="nodeId"
      :handle-change="handleChange"
      :handle-drag="handleDrag"
      :is-draggable="hasDraggableChildren ? hasDraggableChildren : null"
      :node-id="nodeId"
      :on-move="onMove"
      :opts="options.draggable">
      <dp-tree-list-node
        v-for="(child, idx) in children"
        v-show="true === isExpanded"
        :ref="`node_${child.id}`"
        :key="child.id"
        :data-cy="`treeListChild:${idx}`"
        :check-branch="checkBranch"
        :children="child.children || []"
        :handle-change="handleChange"
        :handle-drag="handleDrag"
        :level="level + 1"
        :node="child"
        :node-id="child.id"
        :on-move="onMove"
        :options="options"
        :parent-id="nodeId"
        :selection-manager="selectionManager"
        @draggable:change="bubbleDraggableChange"
        @end="handleDrag('end')"
        @node-selected="bubbleSelectionChange"
        @start="handleDrag('start')"
        @tree:change="bubbleChangeEvent">
        <template
          v-for="slot in Object.keys($slots)"
          v-slot:[slot]="scope">
          <slot
            v-bind="scope"
            :name="slot" />
        </template>
      </dp-tree-list-node>
    </component>
  </li>
</template>

<script>
import { checkboxWidth, dragHandleWidth, levelIndentationWidth } from './utils/constants'
import { de } from "~/components/shared/translations"
import DpDraggable from '~/components/DpDraggable'
import DpIcon from '~/components/DpIcon'
import DpTreeListCheckbox from './DpTreeListCheckbox'
import DpTreeListToggle from './DpTreeListToggle'
import { Tooltip } from '~/directives'

export default {
  name: 'DpTreeListNode',

  components: {
    DpDraggable,
    DpIcon,
    DpTreeListCheckbox,
    DpTreeListToggle
  },

  directives: {
    tooltip: Tooltip
  },

  props: {
    checkBranch: {
      type: Function,
      required: true
    },

    children: {
      type: Array,
      required: true
    },

    draggable: {
      type: Boolean,
      required: false,
      default: true
    },

    /*
     * The function to handle the draggable "change" event is passed as a prop here.
     * This way we do not run into performance issues with deeply nested lists.
     * @see https://www.digitalocean.com/community/tutorials/vuejs-communicating-recursive-components
     */
    handleChange: {
      type: Function,
      required: true
    },

    /*
     * The function to handle the draggable "start" and "end" events is passed as a prop here.
     */
    handleDrag: {
      type: Function,
      required: true
    },

    level: {
      type: Number,
      required: true
    },

    node: {
      type: Object,
      required: true
    },

    nodeId: {
      type: String,
      required: true
    },

    onMove: {
      type: Function,
      required: true
    },

    options: {
      type: Object,
      required: false,
      default: () => ({})
    },

    parentId: {
      type: String,
      required: false,
      default: ''
    },

    selectionManager: {
      type: Object,
      required: false,
      default: null
    },
  },

  emits: [
    'draggable:change',
    'tree:change',
    'node-selected'
  ],

  data () {
    return {
      isExpanded: false,
      translations: {
        noElementsExisting: de.noElementsExisting
      }
    }
  },

  computed: {
    checkboxIdentifier () {
      const prefix = this.isBranch
        ? this.options.checkboxIdentifier.branch
        : this.options.checkboxIdentifier.leaf
      return prefix + ':' + this.nodeId
    },

    dragHandle () {
      const str = this.options.draggable.handle
      return str.substring(1, str.length)
    },

    hasDraggableChildren () {
      return this.isBranch && (this.options.dragLeaves || this.options.dragBranches) && this.draggable
    },

    hasToggle () {
      return this.isBranch && this.children.length > 0
    },

    iconClassFolder () {
      const hasContent = this.children.length > 0
      let folderClass
      if (hasContent) {
        folderClass = this.isExpanded ? 'fa-folder-open' : 'fa-folder'
      } else {
        folderClass = 'fa-folder-o'
      }
      return 'fa ' + folderClass
    },

    indentationStyle () {
      let margin = this.level * levelIndentationWidth

      // If leaves are draggable, but branches are not, or vice versa, add extra space
      if ((this.isBranch && !this.options.dragBranches && this.options.dragLeaves) ||
        (this.isLeaf && this.options.dragBranches && !this.options.dragLeaves)) {
        margin += dragHandleWidth
      }

      // If leaves are selectable, but branches are not, or vice versa, add extra space
      if ((this.isBranch && !this.options.branchesSelectable && this.options.leavesSelectable) ||
        (this.isLeaf && this.options.branchesSelectable && !this.options.leavesSelectable)) {
        margin += checkboxWidth
      }

      return `margin-left: ${margin}px;`
    },

    isBranch () {
      return this.checkBranch({ node: this.node, children: this.children, id: this.nodeId })
    },

    isDraggable () {
      return this.isDraggableLeaf || this.isDraggableBranch
    },

    isDraggableBranch () {
      return this.options.dragBranches && this.isBranch
    },

    isDraggableLeaf () {
      return this.options.dragLeaves && this.isLeaf
    },

    isLeaf () {
      return this.isBranch === false
    },

    isSelectable () {
      return (this.isBranch && this.options.branchesSelectable) ||
        (this.isLeaf && this.options.leavesSelectable) ||
        false
    },

    isNodeSelected () {
      return this.selectionManager.isSelected(this.nodeId)
    },

    // See docblock in `tree` computed of parent component.
    tree: {
      get () {
        return this.children
      },

      set (payload) {
        this.$emit('tree:change', payload)
      }
    }
  },

  methods: {
    bubbleChangeEvent (payload) {
      this.$emit('tree:change', payload)
    },

    bubbleDraggableChange (payload) {
      this.$emit('draggable:change', payload)
    },

    bubbleSelectionChange (nodeId) {
      this.$emit('node-selected', nodeId)
    },

    handleSelectionToggle () {
      this.$emit('node-selected', this.nodeId)
    },
  },

  mounted () {
    this.$root.$on('treelist:toggle-all', (expanded) => (this.isExpanded = expanded))
  }
}
</script>
