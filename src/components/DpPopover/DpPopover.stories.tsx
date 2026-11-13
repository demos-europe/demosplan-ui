import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpPopover from './'

interface IDpPopover {
    ariaLabel: string
    variant: string
    panelLabel: string
}

const meta: Meta<typeof DpPopover> = {
    component: DpPopover,
    title: 'Components/Popover',
    render: (args) => ({
        components: { DpPopover },
        setup() {
            return { args }
        },
        template: `
            <dp-popover v-bind="args">
                <template #trigger>
                    +5
                </template>
                <div class="p-3 text-sm">
                    <p class="font-semibold">Popover title</p>
                    <p>Popover content</p>
                </div>
            </dp-popover>
        `
    }),
    parameters: {
        docs: {
            description: {
                component: 'A button that toggles a panel with additional information. The panel is not clipped by scroll containers.'
            }
        }
    }
}

export default meta

type Story = StoryObj<IDpPopover>

export const Default: Story = {
    args: {
        ariaLabel: 'Show more',
        panelLabel: 'Popover title',
        variant: 'outline'
    }
}
