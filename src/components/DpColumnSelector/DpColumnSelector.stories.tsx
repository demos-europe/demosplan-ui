import type { Meta, StoryObj } from '@storybook/vue'
import DpColumnSelector from './'

const meta: Meta<typeof DpColumnSelector> = {
    component: DpColumnSelector,
    title: "Components/ColumnSelector",

}

interface IDpColumnSelector {
    selectableColumns: []
    initialSelection: []
    localStorageKey: string
    selectionChanged: object
    useLocalStorage: boolean
}

type Story = StoryObj<IDpColumnSelector>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {
        selectionChanged: { action: 'selectionChanged' }
    }
}
