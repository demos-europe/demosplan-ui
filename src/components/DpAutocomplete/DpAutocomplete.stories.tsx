import type { Meta, StoryObj } from '@storybook/vue'

import DpAutocomplete from './DpAutocomplete.vue'

const meta: Meta<typeof DpAutocomplete> = {
    component: DpAutocomplete,
    title: "Components/Autocomplete",
    argTypes: {
        'searchChanged': { action: 'searchChanged' }
    }
}

export default meta
type Story = StoryObj<typeof DpAutocomplete>

export const Default: Story = {
    args: {
        height: '50px',
        label: 'Autocomplete',
        placeholder: 'Search',
        routeGenerator: () => '',
    }
}
