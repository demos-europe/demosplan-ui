import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpPopover from './'

interface IDpPopover {
    ariaLabel: string
    buttonClass: string
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
        buttonClass: 'cursor-pointer rounded-md border border-interactive px-1.5 py-0.5 text-xs text-interactive'
    }
}
