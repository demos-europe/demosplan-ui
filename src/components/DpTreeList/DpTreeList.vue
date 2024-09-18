<template>
  <div
    class="c-treelist"
    :class="{ 'is-dragging': dragging }">
    <!-- Header -->
    <div
      ref="header"
      class="c-treelist__header o-sticky line-height--2"
      :class="{ 'has-checkbox': checkAll }">
      <div class="flex bg-color--white">
        <dp-tree-list-checkbox
          v-if="checkAll"
          name="checkAll"
          v-model="allElementsSelected"
          check-all
          :style="checkboxIndentationStyle" />
        <div class="grow color--grey">
          <slot name="header" />
        </div>
        <dp-tree-list-toggle
          class="color--grey"
          data-cy="treeListNodeToggle"
          @input="toggleAll"
          :value="allElementsExpanded"
          toggle-all />
      </div>
    </div>

    <!-- Tree List -->
    <component
      :is="draggable ? 'dp-draggable' : 'div'"
      ref="treeList"
      :drag-across-branches="opts.dragAcrossBranches ? opts.dragAcrossBranches : null"
      class="list-style-none u-mb-0 u-1-of-1"
      data-cy="treeListNode"
      :content-data="draggable ? treeData : null"
      draggable-tag="ul"
      :handle-change="handleChange"
      :handle-drag="handleDrag"
      :is-draggable="draggable ? draggable : null"
      :on-move="onMove"
      :opts="opts.draggable">
      <dp-tree-list-node
        v-for="(node, idx) in treeData"
        :data-cy="`treeListNode:${idx}`"
        :ref="`node_${node.id}`"
        :key="node.id"
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
        :parent-selected="allElementsSelected"
        @draggable:change="bubbleDraggableChange"
        @end="handleDrag('end')"
        @node-selected="handleSelectEvent"
        @start="handleDrag('start')"
        @tree:change="bubbleChangeEvent">
        <template
          v-for="slot in Object.keys($slots)"
          v-slot:[slot]="scope">
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
      class="c-treelist__footer o-sticky">
      <div class="u-p-0_5 bg-color--white">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { deepMerge, hasOwnProp } from '~/utils'
import DpDraggable from '../DpDraggable/DpDraggable'
import DpTreeListCheckbox from './DpTreeListCheckbox'
import DpTreeListNode from './DpTreeListNode'
import DpTreeListToggle from './DpTreeListToggle'
import { dragHandleWidth } from './utils/constants'
import { Stickier } from '~/lib'

export default {
  name: 'DpTreeList',

  components: {
    DpDraggable,
    DpTreeListCheckbox,
    DpTreeListNode,
    DpTreeListToggle
  },

  props: {
    branchIdentifier: {
      type: Function,
      required: true
    },

    draggable: {
      type: Boolean,
      required: false,
      default: true
    },

    /*
     * Callback to be executed on move event of draggable.
     * It can be used to cancel drag by returning false.
     */
    onMove: {
      type: Function,
      required: false,
      default: () => true
    },

    options: {
      type: Object,
      required: false,
      default: () => ({})
    },

    treeData: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      allElementsExpanded: false,
      allElementsSelected: false,

      /*
       * To be able to control the appearance of nodes when hovered vs. when dragged,
       * the outermost container receives an `is-dragging` class if a node is dragged.
       */
      dragging: false,

      opts: {},
      selectedNodesObjects: []
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

    destroyFixedControls () {
      this.stickyHeader.destroy()
      this.stickyFooter.destroy()
    },

    filterSelectableNodes (selectedNodes) {
      if (this.opts.branchesSelectable && this.opts.leavesSelectable) return selectedNodes

      return selectedNodes.filter(({ nodeType }) => {
        let nodeSelectable = false
        if ((this.opts.branchesSelectable && nodeType === 'branch') ||
          (this.opts.leavesSelectable && nodeType === 'leaf')) {
          nodeSelectable = true
        }

        return nodeSelectable
      })
    },

    getAllSelectedNodesObjects (treeData) {
      let selectedNodes = []

      treeData.forEach(node => {
        if (node.nodeIsSelected) {
          selectedNodes.push(node)
        }

        if (node.children && node.children.length > 0) {
          const selectedChildNodes = this.getAllSelectedNodesObjects(node.children)
          selectedNodes = selectedNodes.concat(selectedChildNodes)
        }
      })

      return selectedNodes
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
          parentId: nodeId
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

    handleSelectEvent () {
      this.selectedNodesObjects = this.getAllSelectedNodesObjects(this.treeData)
      const filteredSelections = this.filterSelectableNodes(this.selectedNodesObjects)

      this.$emit('node-selection-change', filteredSelections)
    },

    // Header and Footer should be fixed to the top/bottom of the page when the TreeList exceeds the viewport height.
    initFixedControls () {
      this.stickyHeader = new Stickier(this.$refs.header, this.$refs.treeList.$el, 0, 'top')

      if (this.$slots.footer) {
        this.stickyFooter = new Stickier(this.$refs.footer, this.$refs.treeList.$el, 0, 'bottom')
      }
    },

    toggleAll () {
      this.$root.$emit('treelist:toggle-all', !this.allElementsExpanded)
      this.allElementsExpanded = !this.allElementsExpanded
    },

    unselectAll () {
      this.selectedNodesObjects.forEach(node => {
        if (this.$refs['node_' + node.id]) {
          this.$refs['node_' + node.id][0].setSelectionState(false)
        }
      })
      this.selectedNodesObjects = []
      this.allElementsSelected = false
      this.$emit('node-selection-change', this.selectedNodesObjects)
    }
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
        chosenClass: 'c-treelist__node-chosen'
      },
      checkboxIdentifier: {
        branch: 'nodeSelected',
        leaf: 'nodeSelected'
      },
      selectOn: {
        childSelect: false,
        parentSelect: false
      },
      deselectOn: {
        childDeselect: false,
        parentDeselect: false
      }
    }
    this.opts = deepMerge(defaults, this.options)

    this.initFixedControls()
  }
}
</script>
