<template>
  <div
    class="c-treelist"
    :class="{ 'is-dragging': dragging }"
  >
    <!-- Header -->
    <div
      ref="header"
      class="c-treelist__header o-sticky line-height--2"
      :class="{ 'has-checkbox': checkAll }"
    >
      <div class="flex bg-color--white">
        <dp-tree-list-checkbox
          v-if="checkAll"
          v-model="allElementsSelected"
          name="checkAll"
          check-all
          :style="checkboxIndentationStyle" />
        <div class="grow color--grey">
          <!--
            @slot Content displayed at the top of the tree list. Typically used for column headers or global actions.
          -->
          <slot name="header" />
        </div>
        <dp-tree-list-toggle
          v-if="treeData.length > 0"
          class="color--grey"
          data-cy="treeListNodeToggle"
          :value="allElementsExpanded"
          toggle-all
          @input="toggleAll" />
      </div>
    </div>

    <!-- Tree List -->
    <component
      :is="draggable && opts.rootDraggable ? 'dp-draggable' : 'div'"
      ref="treeList"
      :drag-across-branches="opts.dragAcrossBranches ? opts.dragAcrossBranches : null"
      class="list-style-none u-mb-0 u-1-of-1"
      data-cy="treeListNode"
      :content-data="draggable ? optimizedTreeData : []"
      draggable-tag="ul"
      :handle-change="handleChange"
      :handle-drag="handleDrag"
      :is-draggable="draggable ? draggable : null"
      :on-move="onMove"
      :opts="opts.draggable"
    >
      <dp-tree-list-node
        v-for="(node, idx) in optimizedTreeData"
        :ref="`node_${node.id}`"
        :key="node.id"
        :data-cy="`treeListNode:${idx}`"
        :check-branch="branchIdentifier"
        :children="node.children || []"
        :draggable="draggable"
        :handle-change="handleChange"
        :handle-drag="handleDrag"
        :level="0"
        :node="node"
        :node-id="node.id"
        :on-move="onMove"
        :options="opts"
        :selection-manager="selectionManager"
        @draggable:change="bubbleDraggableChange"
        @end="handleDrag('end')"
        @node-selected="handleNodeSelectionChanged"
        @start="handleDrag('start')"
        @tree:change="bubbleChangeEvent"
      >
        <template
          v-for="slot in Object.keys($slots)"
          v-slot:[slot]="scope"
        >
          <!--
            @slot branch: Template for rendering branch nodes. Receives props: nodeElement, nodeChildren, nodeId, parentId. leaf: Template for rendering leaf nodes. Receives props: nodeElement, nodeId, parentId.
          -->
          <slot
            :name="slot"
            v-bind="scope" />
        </template>
      </dp-tree-list-node>
    </component>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      ref="footer"
      class="c-treelist__footer o-sticky"
    >
      <div class="u-p-0_5 bg-color--white">
        <!--
          @slot Content displayed at the bottom of the tree list. Useful for summary information or action buttons.
        -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { deepMerge } from '~/utils'
import DpDraggable from '../DpDraggable/DpDraggable'
import DpTreeListCheckbox from './DpTreeListCheckbox'
import DpTreeListNode from './DpTreeListNode'
import DpTreeListToggle from './DpTreeListToggle'
import { dragHandleWidth } from './utils/constants'
import { SelectionManager } from './utils/SelectionManager'
import { Stickier } from '~/lib'

export default {
  name: 'DpTreeList',

  components: {
    DpDraggable,
    DpTreeListCheckbox,
    DpTreeListNode,
    DpTreeListToggle,
  },

  props: {
    /**
     * Function to determine if a node is a branch or a leaf.
     */
    branchIdentifier: {
      type: Function,
      required: true,
    },

    /**
     * Enable drag and drop functionality
     */
    draggable: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * Callback to be executed on move event of draggable.
     * It can be used to cancel drag by returning false.
     */
    onMove: {
      type: Function,
      required: false,
      default: () => true,
    },

    /**
     * Configuration options for the tree list.
     */
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    /**
     * Array of tree nodes with hierarchical structure.
     */
    treeData: {
      type: Array,
      required: true,
    },
  },

  emits: [
    'tree:change',
    'draggable:change',
    'node-selection-change',
  ],

  data () {
    return {
      allElementsExpanded: false,

      /*
       * To be able to control the appearance of nodes when hovered vs. when dragged,
       * the outermost container receives an `is-dragging` class if a node is dragged.
       */
      dragging: false,

      opts: {},
      selectionManager: null,
      optimizedTreeData: [],
      updateScheduled: false,
    }
  },

  computed: {
    checkAll () {
      return this.opts.branchesSelectable || this.opts.leavesSelectable
    },

    checkboxIndentationStyle () {
      const margin = this.opts.dragBranches || this.opts.dragLeaves ? dragHandleWidth : 0
      return `margin-left: ${margin}px;`
    },

    /**
     * The `tree` getter is called whenever this.treeData is changed from outside DpTreeList.
     * The setter is called whenever the tree structure is changed from within the draggable instance.
     * It emits the changed structure, which may be used in the parent component to update treeData accordingly.
     */
    tree: {
      get () {
        return this.treeData
      },

      set (payload) {
        /**
         * Emitted when tree structure changes.
         * @type {Event}
         */
        this.$emit('tree:change', payload)
      },
    },

    allElementsSelected: {
      get() {
        return this.selectionManager?.areAllSelectableNodesSelected() || false
      },

      set(value) {
        if (!this.selectionManager) return

        if (value) {
          this.selectionManager.selectAllSelectableNodes()
        } else {
          this.selectionManager.clearAllSelections()
        }
        this.scheduleTreeUpdate()

        const selectedNodes = this.selectionManager.getSelectedNodes()
        const filteredSelections = this.filterSelectableNodes(selectedNodes)
        this.$emit('node-selection-change', filteredSelections)
      },
    },
  },

  watch: {
    treeData: {
      handler(newData) {
        this.rebuildIndexesAndUpdateTree(newData)
      },
      immediate: true,
      deep: false, // Only watch array reference changes for performance
    },
  },

  methods: {
    rebuildIndexesAndUpdateTree(treeData) {
      if (!this.selectionManager) {
        return
      }

      // Rebuild indexes when tree structure changes
      this.selectionManager.buildIndexes(treeData, this.branchIdentifier)
      this.scheduleTreeUpdate()
    },

    scheduleTreeUpdate() {
      if (this.updateScheduled) {
        return
      }

      this.updateScheduled = true

      this.$nextTick(() => {
        this.optimizedTreeData = this.selectionManager.applySelectionToTreeData(this.treeData)
        this.updateScheduled = false
      })
    },

    handleNodeSelectionChanged(nodeId) {
      this.selectionManager.toggleSelection(nodeId)

      // Schedule tree update for next tick to batch multiple operations
      this.scheduleTreeUpdate()

      const selectedNodes = this.selectionManager.getSelectedNodes()
      const filteredSelections = this.filterSelectableNodes(selectedNodes)

      this.$emit('node-selection-change', filteredSelections)
    },

    bubbleChangeEvent (payload) {
      this.$emit('tree:change', payload)
    },

    bubbleDraggableChange (payload) {
      /**
       * Emitted when an element is moved via drag and drop.
       * @type {Event}
       */
      this.$emit('draggable:change', payload)
    },

    destroyFixedControls () {
      if (this.stickyHeader) {
        this.stickyHeader.destroy()
      }

      if (this.stickyFooter) {
        this.stickyFooter.destroy()
      }
    },

    filterSelectableNodes (selectedNodes) {
      if (this.opts.branchesSelectable && this.opts.leavesSelectable) {
        return selectedNodes
      }

      return selectedNodes.filter(({ nodeType }) => {
        let nodeSelectable = false

        if ((this.opts.branchesSelectable && nodeType === 'branch') ||
          (this.opts.leavesSelectable && nodeType === 'leaf')) {
          nodeSelectable = true
        }

        return nodeSelectable
      })
    },


    /**
     * Handler for the draggable `change` event.
     * The change event fires whenever the order of items is changed by a drag interaction.
     * The handler then emits an event that is being bubbled up the tree.
     * @see https://github.com/SortableJS/Vue.Draggable#events
     * @param evt
     * @param nodeId
     * @emits draggable:change
     */
    handleChange (evt, nodeId) {
      // The event should only be emitted if an element is moved inside or into a folder.
      if (evt.type === 'change') {
        const { newIndex } = evt

        const payload = {
          elementId: evt.item.id,
          newIndex: newIndex,
          parentId: nodeId,
        }

        this.$emit('draggable:change', payload)
      }
    },

    /**
     * Set `dragging` to true if called via `start` event of draggable, else to false.
     * @param eventType {String} 'start' | 'end'
     * @param event {Event}
     * @param item {Object}
     * @param item.attributes {Object}
     * @param item.id {String}
     * @param item.type {String}
     * @param parentId {String}
     * @emits <start|end>
     */
    handleDrag (eventType, event, item, parentId) {
      this.$emit(eventType, event, item, parentId)
      this.dragging = (eventType === 'start')
    },


    // Header and Footer should be fixed to the top/bottom of the page when the TreeList exceeds the viewport height.
    initFixedControls () {
      this.$nextTick(() => {
        const header = this.$refs.header
        if (header && header.offsetHeight > 0) {
          this.stickyHeader = new Stickier(
            header,
            this.$refs.treeList.$el,
            0,
            'top',
          )
        }

        if (this.$slots.footer) {
          const footer = this.$refs.footer
          if (footer && footer.offsetHeight > 0) {
            this.stickyFooter = new Stickier(
              footer,
              this.$refs.treeList.$el,
              0,
              'bottom',
            )
          }
        }
      })
    },

    toggleAll () {
      this.$root.$emit('treelist:toggle-all', !this.allElementsExpanded)
      this.allElementsExpanded = !this.allElementsExpanded
    },

    unselectAll () {
      if (this.selectionManager) {
        this.selectionManager.clearAllSelections()
        this.scheduleTreeUpdate()
        this.allElementsSelected = false
        this.$emit('node-selection-change', [])
      }
    },
  },

  mounted () {
    const defaults = {
      branchesSelectable: false,
      leavesSelectable: false,
      rootDraggable: false,
      dragAcrossBranches: false,
      dragBranches: false,
      dragLeaves: false,
      // Options that are directly bound to the instances of vuedraggable
      draggable: {
        /*
         * The `handle` property is used both to style the handle and as a DOM hook for draggable,
         * that's why it is noted with the leading dot here. This is to be refactored later.
         */
        handle: '.c-treelist__drag-handle',
        ghostClass: 'c-treelist__node-ghost',
        chosenClass: 'c-treelist__node-chosen',
      },
      checkboxIdentifier: {
        branch: 'nodeSelected',
        leaf: 'nodeSelected',
      },
      selectOn: {
        childSelect: false,
        parentSelect: false,
      },
      deselectOn: {
        childDeselect: false,
        parentDeselect: false,
      },
    }

    this.opts = deepMerge(defaults, this.options)

    this.selectionManager = new SelectionManager(this.opts)
    this.rebuildIndexesAndUpdateTree(this.treeData)

    this.initFixedControls()
  },

  beforeUnmount() {
    this.destroyFixedControls()
  },
}
</script>
