import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpAccordion from './'

const meta: Meta<typeof DpAccordion> = {
    component: DpAccordion,
    title: 'Components/Accordion',
    render: (args) => ({
      components: {
        DpAccordion
      },
      setup() {
        return { args }
      },
      template: `<dp-accordion v-bind="args">
            Content goes here (into the default slot).
          </dp-accordion>`,
    })
}

type Story = StoryObj<{
  fontWeight: 'bold' | 'regular'
  compressed: boolean
  isOpen: boolean
  title: string
  'item:toggle': object
}>

export default meta

export const Default: Story = {
    args: {
        fontWeight: 'bold',
        isOpen: false,
        title: 'Default Accordion Title',
    },
    argTypes: {
        'item:toggle': { action: 'item:toggle' }
    }
}

export const Compressed: Story = {
  args: {
    fontWeight: 'bold',
    compressed: true,
    isOpen: false,
    title: 'Compressed Accordion Title',
  },
  argTypes: {
    'item:toggle': { action: 'item:toggle' }
  }
}
