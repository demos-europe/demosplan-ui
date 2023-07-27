import type { Meta, StoryObj } from '@storybook/vue'

import DpAccordion from './DpAccordion.vue'

const meta: Meta<typeof DpAccordion> = {
    component: DpAccordion,
    title: "Components/DpAccordion",
    argTypes: {
        'item:toggle': { action: 'item:toggle' }
    }
}

export default meta
type Story = StoryObj<typeof DpAccordion>

export const Default: Story = {
    args: {
        fontWeight: 'bold',
        compressed: true,
        isOpen: false,
        title: 'Accordion',

    }
}
