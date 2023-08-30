import type { Meta, StoryObj } from '@storybook/vue'
import DpAccordion from './DpAccordion.vue'

const meta: Meta<typeof DpAccordion> = {
    component: DpAccordion,
    title: "Components/Accordion"
}

interface IDpAccordion {
    fontWeight: 'bold' | 'regular'
    compressed: boolean
    isOpen: boolean
    title: string
    'item:toggle': object
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
        'item:toggle': { action: 'item:toggle' }
    }
}
