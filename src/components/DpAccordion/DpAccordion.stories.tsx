import type { Meta, StoryObj } from '@storybook/vue'
import DpAccordion from './DpAccordion.vue'

const meta: Meta<typeof DpAccordion> = {
    component: DpAccordion,
    title: "Components/Accordion",
}

interface IDpAccordion {
    fontWeight: 'bold' | 'regular',
    compressed: boolean,
    isOpen: boolean,
    title: string,
}

// export default meta
type Story = StoryObj<IDpAccordion>

export const Default: Story = {
    args: {
        fontWeight: 'bold',
        compressed: true,
        isOpen: false,
        title: 'Accordion',

    }
}
