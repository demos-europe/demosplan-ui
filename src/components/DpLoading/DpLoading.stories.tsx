import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpLoading from './'

interface IDpLoading {
    hideLabel: boolean
    overlay: boolean
}

const meta: Meta<typeof DpLoading> = {
    component: DpLoading,
    title: "Components/Loading",
    argTypes: {
        hideLabel: {
            control: 'boolean',
            description: 'When true, only shows the spinning animation without any text'
        },
        overlay: {
            control: 'boolean',
            description: 'When true, renders as a full overlay that blocks interaction with content beneath it'
        }
    },
    tags: ['autodocs', '!dev'],
    parameters: {
        docs: {
            description: {
                component: 'The `DpLoading` component indicates background activity with a spinning animation, optionally accompanied by text. It is commonly used during data loading or processing operations.'
            }
        }
    }
}

export default meta

type Story = StoryObj<IDpLoading>

/**
 * Default loading indicator with text that reads "Daten werden geladen..." (Data is loading...)
 */
export const Default: Story = {
  args: {
      hideLabel: false,
      overlay: false
  },
  tags: ['!autodocs', 'dev'],
}

/**
 * Loading indicator without text, useful in contexts with limited space.
 */
export const WithoutLabel: Story = {
    args: {
        hideLabel: true,
        overlay: false
    }
}

/**
 * Loading indicator as an overlay that blocks interaction with content beneath it.
 * Use this when refreshing content and you want to prevent user interaction until loading completes.
 */
export const AsOverlay: Story = {
    args: {
        hideLabel: false,
        overlay: true
    },
    render: (args) => ({
        components: { DpLoading },
        setup() {
            return { args }
        },
        template: `
            <div style="position: relative; min-height: 100px; padding: 20px; border: 1px solid #ccc; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0;">Content beneath the overlay</h3>
                <p>This content is still visible but cannot be interacted with while loading.</p>
                <p>The overlay prevents clicks and other interactions until the loading completes.</p>
                <DpLoading v-bind="args" />
            </div>
        `
    })
}
