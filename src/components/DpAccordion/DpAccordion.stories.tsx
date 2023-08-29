import type { Meta, StoryObj } from '@storybook/vue'
import DpAccordion from './DpAccordion.vue'

const meta: Meta<typeof DpAccordion> = {
    component: DpAccordion,
    title: "Components/Accordion",
}

interface IDpAccordion {
    fontWeight: 'bold' | 'regular'
    compressed: boolean
    isOpen: boolean
    title: string
    itemToggle: object
}

type Story = StoryObj<IDpAccordion>

export default meta

export const Default: Story = {
    args: {
        fontWeight: 'bold',
        compressed: true,
        isOpen: false,
        title: 'Accordion',
    },
    argTypes: {
        itemToggle: { action: 'itemToggle' }
    }
}
