/**
 * High-performance selection manager for tree structures
 * Optimizes parent-child selection operations using path-based indexing
 */
export class SelectionManager {
  constructor(options = {}) {
    this.options = {
      branchesSelectable: false,
      leavesSelectable: false,
      selectOn: {
        childSelect: false,
        parentSelect: false,
      },
      deselectOn: {
        childDeselect: false,
        parentDeselect: false,
      },
      ...options,
    }

    // High-performance data structures
    this.nodePath = new Map() // NodeId -> path array
    this.nodeParentId = new Map() // NodeId -> parentId
    this.nodeChildren = new Map() // NodeId -> Set of childIds
    this.selectedNodes = new Set() // Set of selected nodeIds
    this.explicitlySelected = new Set() // Nodes explicitly selected by user
    this.nodeType = new Map() // NodeId -> 'branch' | 'leaf'
    this.nodeObject = new Map() // NodeId -> full node object reference

    // Selection counting for performance optimization
    this.totalSelectableCount = 0 // Total nodes that CAN be selected
    this.selectedSelectableCount = 0 // Actually selected selectable nodes

    this.pendingOperations = []
    this.isProcessingBatch = false
  }

  /**
   * Build optimized indexes from tree data
   * Only called when tree structure changes
   */
  buildIndexes(treeData, branchIdentifier) {
    this.clearIndexes()
    this._buildIndexesRecursively(treeData, null, [], branchIdentifier)
    this._countSelectableNodes()
  }

  _buildIndexesRecursively(nodes, parentId, path, branchIdentifier) {
    nodes.forEach((node, index) => {
      const nodeId = node.id
      const currentPath = [...path, index]
      const isBranch = branchIdentifier({ node })

      // Build all indexes
      this.nodePath.set(nodeId, currentPath)
      this.nodeParentId.set(nodeId, parentId)
      this.nodeType.set(nodeId, isBranch ? 'branch' : 'leaf')
      this.nodeObject.set(nodeId, node)

      if (parentId) {
        if (!this.nodeChildren.has(parentId)) {
          this.nodeChildren.set(parentId, new Set())
        }
        this.nodeChildren.get(parentId).add(nodeId)
      }

      if (node.nodeIsSelected) {
        this.selectedNodes.add(nodeId)
        this.explicitlySelected.add(nodeId)
      }

      if (node.children && node.children.length > 0) {
        this._buildIndexesRecursively(node.children, nodeId, currentPath, branchIdentifier)
      }
    })
  }

  _countSelectableNodes() {
    this.totalSelectableCount = 0
    this.selectedSelectableCount = 0

    this.nodeType.forEach((nodeType, nodeId) => {
      if (this._isNodeSelectable(nodeId)) {
        this.totalSelectableCount++

        if (this.selectedNodes.has(nodeId)) {
          this.selectedSelectableCount++
        }
      }
    })
  }

  /**
   * Toggle selection state of a node with optimized propagation
   */
  toggleSelection(nodeId) {
    const isCurrentlySelected = this.isSelected(nodeId)
    const newState = !isCurrentlySelected

    // Batch the operation
    this.pendingOperations.push({
      nodeId,
      newState,
    })

    if (!this.isProcessingBatch) {
      this.processBatchOperations()
    }

    return newState
  }

  /**
   * Process all pending operations in a single batch
   */
  processBatchOperations() {
    if (this.isProcessingBatch || this.pendingOperations.length === 0) {
      return
    }

    this.isProcessingBatch = true
    const operations = [...this.pendingOperations]
    this.pendingOperations = []

    operations.forEach(op => this._processToggleOperation(op.nodeId, op.newState))

    this.isProcessingBatch = false

    if (this.pendingOperations.length > 0) {
      this.processBatchOperations()
    }
  }

  _processToggleOperation(nodeId, newState) {
    const wasSelected = this.selectedNodes.has(nodeId)
    const isSelectable = this._isNodeSelectable(nodeId)

    if (newState) {
      this.explicitlySelected.add(nodeId)
      this.selectedNodes.add(nodeId)

      if (isSelectable && !wasSelected) {
        this.selectedSelectableCount++
      }
    } else {
      this.explicitlySelected.delete(nodeId)
      this.selectedNodes.delete(nodeId)

      if (isSelectable && wasSelected) {
        this.selectedSelectableCount--
      }
    }

    if (newState && this.options.selectOn.parentSelect) {
      this._selectAllChildren(nodeId)
    } else if (!newState && this.options.deselectOn.parentDeselect) {
      this._deselectAllChildren(nodeId)
    }

    if (newState && this.options.selectOn.childSelect) {
      this._selectParentIfAllChildrenSelected(nodeId)
    } else if (!newState && this.options.deselectOn.childDeselect) {
      this._deselectParentIfNoChildrenSelected(nodeId)
    }
  }

  _selectAllChildren(nodeId) {
    const children = this.nodeChildren.get(nodeId)

    if (!children) {
      return
    }

    children.forEach(childId => {
      if (this._isNodeSelectable(childId)) {
        const wasSelected = this.selectedNodes.has(childId)

        this.selectedNodes.add(childId)

        if (!wasSelected) {
          this.selectedSelectableCount++
        }

        this._selectAllChildren(childId)
      }
    })
  }

  _deselectAllChildren(nodeId) {
    const children = this.nodeChildren.get(nodeId)

    if (!children) {
      return
    }

    children.forEach(childId => {
      const wasSelected = this.selectedNodes.has(childId)

      this.selectedNodes.delete(childId)
      this.explicitlySelected.delete(childId)

      if (wasSelected && this._isNodeSelectable(childId)) {
        this.selectedSelectableCount--
      }

      this._deselectAllChildren(childId)
    })
  }

  _selectParentIfAllChildrenSelected(nodeId) {
    const parentId = this.nodeParentId.get(nodeId)
    const siblings = this.nodeChildren.get(parentId)

    if (!parentId || !this._isNodeSelectable(parentId)) {
      return
    }

    if (!siblings) {
      return
    }

    const allSiblingsSelected = Array.from(siblings).every(siblingId =>
      this.isSelected(siblingId) || !this._isNodeSelectable(siblingId),
    )

    if (allSiblingsSelected) {
      const wasSelected = this.selectedNodes.has(parentId)

      this.selectedNodes.add(parentId)

      if (!wasSelected) {
        this.selectedSelectableCount++
      }

      this._selectParentIfAllChildrenSelected(parentId)
    }
  }

  _deselectParentIfNoChildrenSelected(nodeId) {
    const parentId = this.nodeParentId.get(nodeId)
    const siblings = this.nodeChildren.get(parentId)

    if (!parentId) {
      return
    }

    if (!siblings) {
      return
    }

    const noSiblingsSelected = Array.from(siblings).every(siblingId =>
      !this.isSelected(siblingId),
    )

    if (noSiblingsSelected) {
      const wasSelected = this.selectedNodes.has(parentId)
      this.selectedNodes.delete(parentId)
      this.explicitlySelected.delete(parentId)

      if (wasSelected && this._isNodeSelectable(parentId)) {
        this.selectedSelectableCount--
      }

      this._deselectParentIfNoChildrenSelected(parentId)
    }
  }

  /**
   * Check if a node is selectable based on type and options
   */
  _isNodeSelectable(nodeId) {
    const nodeType = this.nodeType.get(nodeId)

    return (nodeType === 'branch' && this.options.branchesSelectable)
      || (nodeType === 'leaf' && this.options.leavesSelectable)
  }

  isSelected(nodeId) {
    return this.selectedNodes.has(nodeId)
  }

  /**
   * Get all selected nodes with full node objects and metadata
   * Returns actual node objects with added selection metadata
   */
  getSelectedNodes() {
    const result = []

    this.selectedNodes.forEach(nodeId => {
      if (this._isNodeSelectable(nodeId)) {
        const nodeObject = this.nodeObject.get(nodeId)

        if (nodeObject) {
          const enrichedNode = {
            ...nodeObject,
            nodeId: nodeId,
            nodeType: this.nodeType.get(nodeId),
            nodeIsSelected: true,
            explicitlySelected: this.explicitlySelected.has(nodeId),
          }

          result.push(enrichedNode)
        }
      }
    })

    return result
  }

  /**
   * Apply selection states to tree data (shallow updates only)
   */
  applySelectionToTreeData(treeData) {
    return this._applySelectionRecursively(treeData)
  }

  _applySelectionRecursively(nodes) {
    return nodes.map(node => {
      const isSelected = this.isSelected(node.id)
      const needsUpdate = node.nodeIsSelected !== isSelected
      let updatedNode = node

      if (needsUpdate) {
        updatedNode = {
          ...node,
          nodeIsSelected: isSelected,
          nodeId: node.id,
          nodeType: this.nodeType.get(node.id),
        }
      }

      // Recursively update children if they exist
      if (node.children && node.children.length > 0) {
        const updatedChildren = this._applySelectionRecursively(node.children)

        // Only create new object if children actually changed
        const childrenChanged = updatedChildren.some((child, index) =>
          child !== node.children[index],
        )

        if (childrenChanged) {
          updatedNode = updatedNode === node ? { ...node } : updatedNode
          updatedNode.children = updatedChildren
        }
      }

      return updatedNode
    })
  }

  clearAllSelections() {
    this.selectedNodes.clear()
    this.explicitlySelected.clear()
    this.selectedSelectableCount = 0
  }

  selectAllSelectableNodes() {
    this.nodeType.forEach((nodeType, nodeId) => {
      if (this._isNodeSelectable(nodeId)) {
        const wasSelected = this.selectedNodes.has(nodeId)

        this.selectedNodes.add(nodeId)
        this.explicitlySelected.add(nodeId)

        if (!wasSelected) {
          this.selectedSelectableCount++
        }
      }
    })
  }

  /**
   * Check if all selectable nodes are currently selected
   */
  areAllSelectableNodesSelected() {
    return this.totalSelectableCount > 0 && this.selectedSelectableCount === this.totalSelectableCount
  }

  /**
   * Clear all indexes (when tree structure changes)
   */
  clearIndexes() {
    this.nodePath.clear()
    this.nodeParentId.clear()
    this.nodeChildren.clear()
    this.nodeType.clear()
    this.nodeObject.clear()
    this.selectedNodes.clear()
    this.explicitlySelected.clear()
    this.totalSelectableCount = 0
    this.selectedSelectableCount = 0
  }

}
