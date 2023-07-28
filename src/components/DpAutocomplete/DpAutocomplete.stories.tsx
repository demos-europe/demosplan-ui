import type { Meta, StoryObj } from '@storybook/vue'

import DpAutocomplete from './DpAutocomplete.vue'

const meta: Meta<typeof DpAutocomplete> = {
    component: DpAutocomplete,
    title: "Components/DpAutocomplete",
    argTypes: {
        'searchChanged': { action: 'searchChanged' }
    }
}

export default meta
type Story = StoryObj<typeof DpAutocomplete>

export const Default: Story = {
    args: {
        height: '28px',
        label: 'label',
        placeholder: 'Search',
        routeGenerator: () => '',
    }
}
