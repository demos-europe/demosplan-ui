<template>
  <component
    :is="draggableTag"
    ref="wrapper">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ref } from 'vue'

const wrapper = ref<HTMLElement | null>(null)
const list = ref([])

const emit = defineEmits(
  [
    'add',
    'end'
  ]
)

const props = defineProps({
  /*
     * Content you want to display in the draggable.
     */
  contentData: {
    type: Array,
    required: true
  },

  /*
   * Set to true if items should be draggable between different lists
   */
  dragAcrossBranches: {
    type: Boolean,
    required: false,
    default: true
  },

  /*
   * Set to true if the content should be draggable and false if not.
   */
  isDraggable: {
    type: Boolean,
    required: false,
    default: true
  },

  /*
   * HTML node type of the element that draggable component create as outer element for the included slot eg 'ul'.
   */
  draggableTag: {
    type: String,
    required: false,
    default: 'div'
  },

  /*
   * The id for a group in which items should be draggable
   */
  groupId: {
    type: String,
    required: false,
    default: 'noIdGiven'
  },

  /*
   * The function to handle the draggable "change" event.
   * By passing it as a prop, we do not run into performance issues with deeply nested lists.
   * @see https://www.digitalocean.com/community/tutorials/vuejs-communicating-recursive-components
   */
  handleChange: {
    type: Function,
    required: false,
    default: () => undefined
  },

  /*
   * The function to handle the draggable "start" and "end" events
   */
  handleDrag: {
    type: Function,
    required: false,
    default: () => undefined
  },

  /*
   * The id of the draggable node to identify items in callbacks
   */
  nodeId: {
    type: String,
    required: false,
    default: null
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

  opts: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

list.value = props.contentData

useSortable(
  wrapper,
  list,
  {
    disabled: !props.isDraggable,
    group: props.dragAcrossBranches ? 'treelistgroup' : props.groupId,
    onChange: (e: Event) => props.handleChange(e, props.nodeId, wrapper),
    onAdd: () => emit('add'),
    onEnd: (e) => {
      const currentElement = list.value[e.oldIndex]

      props.handleDrag('end', e, currentElement, props.nodeId)
      emit('end', e, currentElement, props.nodeId)
    },
    onMove: (e: Event) => props.onMove(e),
    onStart: (e: Event) => props.handleDrag('start', e),
    ...props.opts
  }
)
</script>
