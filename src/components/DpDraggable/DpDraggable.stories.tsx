import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import DpDraggable from './'

interface IDpDraggable {
    contentData: any[]
    dragAcrossBranches?: boolean
    isDraggable?: boolean
    draggableTag?: string
    groupId?: string
    handleChange?: (e: any, nodeId: string | null, wrapper: any) => void
    handleDrag?: (type: string, e: any, element?: any, nodeId?: string | null) => void
    nodeId?: string | null
    onMove?: (e: any, isAllowedTarget: boolean, groupId: string) => boolean
    opts?: Record<string, any>
    add?: (e: any) => void
    end?: (e: any, element: any, nodeId: string | null) => void
}

const meta: Meta<typeof DpDraggable> = {
    component: DpDraggable,
    title: "Components/Draggable",
    argTypes: {
        contentData: {
            control: 'object',
            description: 'Array of data objects to display and make draggable'
        },
        dragAcrossBranches: {
            control: 'boolean',
            description: 'Whether items can be dragged between different groups',
            defaultValue: true
        },
        isDraggable: {
            control: 'boolean',
            description: 'Whether dragging is enabled',
            defaultValue: true
        },
        draggableTag: {
            control: 'text',
            description: 'HTML tag for the wrapper element',
            defaultValue: 'div'
        },
        groupId: {
            control: 'text',
            description: 'ID for the draggable group',
            defaultValue: 'noIdGiven'
        },
        add: {
            action: 'add',
            description: 'Event emitted when an item is added to the list'
        },
        end: {
            action: 'end',
            description: 'Event emitted when a drag operation ends'
        }
    }
}

export default meta

type Story = StoryObj<IDpDraggable>

const defaultItems = [
    { label: 'Item 1', id: '1' },
    { label: 'Item 2', id: '2' },
    { label: 'Item 3', id: '3' },
    { label: 'Item 4', id: '4' }
]

export const Default: Story = {
    args: {
        contentData: [...defaultItems],
        isDraggable: true
    },
    render: (args) => ({
        components: { DpDraggable },
        setup() {
            const items = ref([...args.contentData])
            
            const handleChange = (e) => {
                console.log('Change event:', e)
            }
            
            return { args, items, handleChange }
        },
        template: `
            <div class="p-4 border rounded">
                <h3 class="mb-3 font-bold">Drag to reorder items</h3>
                <dp-draggable
                    :content-data="items"
                    :is-draggable="args.isDraggable"
                    :draggable-tag="args.draggableTag"
                    :group-id="args.groupId"
                    :handle-change="handleChange"
                    @add="args.add"
                    @end="args.end"
                >
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="p-2 mb-2 bg-gray-100 border rounded cursor-move flex items-center"
                    >
                        <span class="mr-2">☰</span>
                        <span>{{ item.label }}</span>
                    </div>
                </dp-draggable>
            </div>
        `
    })
}

export const WithCustomTag: Story = {
    args: {
        contentData: [
            { label: 'List item 1', id: '1' },
            { label: 'List item 2', id: '2' },
            { label: 'List item 3', id: '3' }
        ],
        draggableTag: 'ul'
    },
    render: (args) => ({
        components: { DpDraggable },
        setup() {
            const items = ref([...args.contentData])
            return { args, items }
        },
        template: `
            <div class="p-4 border rounded">
                <h3 class="mb-3 font-bold">Draggable list with custom tag (ul)</h3>
                <dp-draggable
                    :content-data="items"
                    :draggable-tag="args.draggableTag"
                    :is-draggable="args.isDraggable"
                    @add="args.add"
                    @end="args.end"
                >
                    <li
                        v-for="item in items"
                        :key="item.id"
                        class="p-2 mb-2 bg-gray-100 border rounded cursor-move"
                    >
                        {{ item.label }}
                    </li>
                </dp-draggable>
            </div>
        `
    })
}

export const DragBetweenLists: Story = {
    render: () => ({
        components: { DpDraggable },
        setup() {
            const list1 = ref([
                { label: 'List 1 - Item 1', id: 'a1' },
                { label: 'List 1 - Item 2', id: 'a2' },
                { label: 'List 1 - Item 3', id: 'a3' }
            ])
            
            const list2 = ref([
                { label: 'List 2 - Item 1', id: 'b1' },
                { label: 'List 2 - Item 2', id: 'b2' }
            ])
            
            return { list1, list2 }
        },
        template: `
            <div class="p-4 border rounded">
                <h3 class="mb-3 font-bold">Drag between lists</h3>
                <div class="flex gap-4">
                    <div class="w-1/2 p-2 border rounded">
                        <h4 class="mb-2">List 1</h4>
                        <dp-draggable
                            :content-data="list1"
                            drag-across-branches
                            group-id="list1"
                        >
                            <div
                                v-for="item in list1"
                                :key="item.id"
                                class="p-2 mb-2 bg-blue-100 border rounded cursor-move"
                            >
                                {{ item.label }}
                            </div>
                        </dp-draggable>
                    </div>
                    <div class="w-1/2 p-2 border rounded">
                        <h4 class="mb-2">List 2</h4>
                        <dp-draggable
                            :content-data="list2"
                            drag-across-branches
                            group-id="list2"
                        >
                            <div
                                v-for="item in list2"
                                :key="item.id"
                                class="p-2 mb-2 bg-green-100 border rounded cursor-move"
                            >
                                {{ item.label }}
                            </div>
                        </dp-draggable>
                    </div>
                </div>
            </div>
        `
    })
}

export const Disabled: Story = {
    args: {
        contentData: [...defaultItems],
        isDraggable: false
    },
    render: (args) => ({
        components: { DpDraggable },
        setup() {
            const items = ref([...args.contentData])
            return { args, items }
        },
        template: `
            <div class="p-4 border rounded">
                <h3 class="mb-3 font-bold">Disabled dragging</h3>
                <p class="mb-2 text-gray-600">Drag functionality is disabled for this list</p>
                <dp-draggable
                    :content-data="items"
                    :is-draggable="args.isDraggable"
                >
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="p-2 mb-2 bg-gray-100 border rounded"
                    >
                        {{ item.label }}
                    </div>
                </dp-draggable>
            </div>
        `
    })
}