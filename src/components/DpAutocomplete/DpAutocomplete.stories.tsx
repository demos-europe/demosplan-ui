import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpAutocomplete from './'

const meta: Meta<typeof DpAutocomplete> = {
  component: DpAutocomplete,
  title: 'Components/Autocomplete',
  parameters: {
    actions: { disable: true },
  },
}

export default meta

type Story = StoryObj<{
  height: string
  label: string
  placeholder: string
  routeGenerator: () => string
  searchChanged: object
}>

export const Default: Story = {
  args: {
    height: '50px',
    label: 'Autocomplete',
    placeholder: 'Search',
    routeGenerator: () => '',
  }
}
