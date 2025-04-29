import type { Meta, StoryObj } from '@storybook/vue3'
import DpAutocomplete from './'

/**
 * HEADS UP! This page breaks in SB because DpAutocomplete uses vue-omnibox
 * which seems to be Vue2 only.
 */

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
