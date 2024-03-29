import type { Meta, StoryObj } from '@storybook/vue'
import DpAutocomplete from './'

interface IDpAutocomplete {
    height: string
    label: string
    placeholder: string
    routeGenerator: Function
    searchChanged: object
}

const meta: Meta<typeof DpAutocomplete> = {
    component: DpAutocomplete,
    title: "Components/Autocomplete"
}

export default meta
type Story = StoryObj<IDpAutocomplete>

export const Default: Story = {
    args: {
        height: '50px',
        label: 'Autocomplete',
        placeholder: 'Search',
        routeGenerator: () => '',
    },
    argTypes: {
        searchChanged: { action: 'searchChanged' }
    }
}
