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
        parentSelect: false
      },
      deselectOn: {
        childDeselect: false,
        parentDeselect: false
      },
      ...options
    }

    // High-performance data structures
    this.nodePathMap = new Map() // nodeId -> path array
    this.nodeParentMap = new Map() // nodeId -> parentId
    this.nodeChildrenMap = new Map() // nodeId -> Set of childIds
    this.selectedNodes = new Set() // Set of selected nodeIds
    this.explicitlySelected = new Set() // Nodes explicitly selected by user
    this.nodeTypeMap = new Map() // nodeId -> 'branch' | 'leaf'
    this.nodeObjectMap = new Map() // nodeId -> full node object reference

    // Selection counting for performance optimization
    this.totalSelectableCount = 0 // Total nodes that CAN be selected
    this.selectedSelectableCount = 0 // Selected nodes that ARE selectable

    // Batch operation support
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
    
    // Count selectable nodes after building indexes
    this._countSelectableNodes()
  }

  _buildIndexesRecursively(nodes, parentId, path, branchIdentifier) {
    nodes.forEach((node, index) => {
      const nodeId = node.id
      const currentPath = [...path, index]
      const isBranch = branchIdentifier({ node })

      // Build all indexes
      this.nodePathMap.set(nodeId, currentPath)
      this.nodeParentMap.set(nodeId, parentId)
      this.nodeTypeMap.set(nodeId, isBranch ? 'branch' : 'leaf')
      this.nodeObjectMap.set(nodeId, node)

      if (parentId) {
        if (!this.nodeChildrenMap.has(parentId)) {
          this.nodeChildrenMap.set(parentId, new Set())
        }
        this.nodeChildrenMap.get(parentId).add(nodeId)
      }

      // Preserve existing selection state
      if (node.nodeIsSelected) {
        this.selectedNodes.add(nodeId)
        this.explicitlySelected.add(nodeId)
      }

      if (node.children && node.children.length > 0) {
        this._buildIndexesRecursively(node.children, nodeId, currentPath, branchIdentifier)
      }
    })
  }

  /**
   * Count selectable nodes and update selected count
   */
  _countSelectableNodes() {
    this.totalSelectableCount = 0
    this.selectedSelectableCount = 0
    
    this.nodeTypeMap.forEach((nodeType, nodeId) => {
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
      type: 'toggle',
      nodeId,
      newState
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

    operations.forEach(op => {
      if (op.type === 'toggle') {
        this._processToggleOperation(op.nodeId, op.newState)
      }
    })

    this.isProcessingBatch = false

    // Process any operations that were queued during batch processing
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
      
      // Update count if this is a selectable node that wasn't selected before
      if (isSelectable && !wasSelected) {
        this.selectedSelectableCount++
      }
    } else {
      this.explicitlySelected.delete(nodeId)
      this.selectedNodes.delete(nodeId)
      
      // Update count if this is a selectable node that was selected before
      if (isSelectable && wasSelected) {
        this.selectedSelectableCount--
      }
    }

    // Handle parent-child propagation based on options
    if (newState && this.options.selectOn.parentSelect) {
      this._selectAllChildren(nodeId)
    } else if (!newState && this.options.deselectOn.parentDeselect) {
      this._deselectAllChildren(nodeId)
    }

    // Handle child-parent propagation
    if (newState && this.options.selectOn.childSelect) {
      this._selectParentIfAllChildrenSelected(nodeId)
    } else if (!newState && this.options.deselectOn.childDeselect) {
      this._deselectParentIfNoChildrenSelected(nodeId)
    }
  }

  _selectAllChildren(nodeId) {
    const children = this.nodeChildrenMap.get(nodeId)

    if (!children) {
      return
    }

    children.forEach(childId => {
      if (this._isNodeSelectable(childId)) {
        const wasSelected = this.selectedNodes.has(childId)
        this.selectedNodes.add(childId)
        
        // Update count if this node wasn't selected before
        if (!wasSelected) {
          this.selectedSelectableCount++
        }
        
        this._selectAllChildren(childId) // Recurse
      }
    })
  }

  _deselectAllChildren(nodeId) {
    const children = this.nodeChildrenMap.get(nodeId)

    if (!children) {
      return
    }

    children.forEach(childId => {
      const wasSelected = this.selectedNodes.has(childId)
      this.selectedNodes.delete(childId)
      this.explicitlySelected.delete(childId)
      
      // Update count if this was a selectable node that was selected
      if (wasSelected && this._isNodeSelectable(childId)) {
        this.selectedSelectableCount--
      }
      
      this._deselectAllChildren(childId)
    })
  }

  _selectParentIfAllChildrenSelected(nodeId) {
    const parentId = this.nodeParentMap.get(nodeId)
    const siblings = this.nodeChildrenMap.get(parentId)

    if (!parentId || !this._isNodeSelectable(parentId)) {
      return
    }

    if (!siblings) {
      return
    }

    const allSiblingsSelected = Array.from(siblings).every(siblingId =>
      this.isSelected(siblingId) || !this._isNodeSelectable(siblingId)
    )

    if (allSiblingsSelected) {
      const wasSelected = this.selectedNodes.has(parentId)
      this.selectedNodes.add(parentId)
      
      // Update count if this parent wasn't selected before
      if (!wasSelected) {
        this.selectedSelectableCount++
      }
      
      this._selectParentIfAllChildrenSelected(parentId)
    }
  }

  _deselectParentIfNoChildrenSelected(nodeId) {
    const parentId = this.nodeParentMap.get(nodeId)
    const siblings = this.nodeChildrenMap.get(parentId)

    if (!parentId) {
      return
    }

    if (!siblings) {
      return
    }

    const noSiblingsSelected = Array.from(siblings).every(siblingId =>
      !this.isSelected(siblingId)
    )

    if (noSiblingsSelected) {
      const wasSelected = this.selectedNodes.has(parentId)
      this.selectedNodes.delete(parentId)
      this.explicitlySelected.delete(parentId)
      
      // Update count if this parent was selected before and is selectable
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
    const nodeType = this.nodeTypeMap.get(nodeId)

    return (nodeType === 'branch' && this.options.branchesSelectable)
      || (nodeType === 'leaf' && this.options.leavesSelectable)
  }

  /**
   * Get selection state
   */
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
        const nodeObject = this.nodeObjectMap.get(nodeId)

        if (nodeObject) {
          const enrichedNode = {
            ...nodeObject,
            nodeId: nodeId,
            nodeType: this.nodeTypeMap.get(nodeId),
            nodeIsSelected: true,
            explicitlySelected: this.explicitlySelected.has(nodeId)
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
          nodeType: this.nodeTypeMap.get(node.id)
        }
      }

      // Recursively update children if they exist
      if (node.children && node.children.length > 0) {
        const updatedChildren = this._applySelectionRecursively(node.children)

        // Only create new object if children actually changed
        const childrenChanged = updatedChildren.some((child, index) =>
          child !== node.children[index]
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

  /**
   * Select all selectable nodes in the tree
   */
  selectAllSelectableNodes() {
    this.nodeTypeMap.forEach((nodeType, nodeId) => {
      if (this._isNodeSelectable(nodeId)) {
        const wasSelected = this.selectedNodes.has(nodeId)
        this.selectedNodes.add(nodeId)
        this.explicitlySelected.add(nodeId)
        
        // Update count if this node wasn't selected before
        if (!wasSelected) {
          this.selectedSelectableCount++
        }
      }
    })
  }

  /**
   * Check if all selectable nodes are currently selected
   * O(1) operation using cached counts
   */
  areAllSelectableNodesSelected() {
    return this.totalSelectableCount > 0 && 
           this.selectedSelectableCount === this.totalSelectableCount
  }

  /**
   * Clear all indexes (when tree structure changes)
   */
  clearIndexes() {
    this.nodePathMap.clear()
    this.nodeParentMap.clear()
    this.nodeChildrenMap.clear()
    this.nodeTypeMap.clear()
    this.nodeObjectMap.clear()
    this.selectedNodes.clear()
    this.explicitlySelected.clear()
    this.totalSelectableCount = 0
    this.selectedSelectableCount = 0
  }

}
