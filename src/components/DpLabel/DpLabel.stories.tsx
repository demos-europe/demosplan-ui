import type { Meta, StoryObj } from '@storybook/vue3'
import DpLabel from './'

interface IDpLabel {
    bold: boolean
    for: string
    hint: string | string[]
    hide: boolean
    text: string
    tooltip: string
    required: boolean
}

const meta: Meta<typeof DpLabel> = {
    component: DpLabel,
    title: "Components/Label",
    argTypes: {
        // Boolean controls as toggle switches
        bold: {
            control: 'boolean',
            description: 'Whether the label text should be bold'
        },
        hide: {
            control: 'boolean',
            description: 'Hide the label visually, but keep it accessible for screen readers'
        },
        required: {
            control: 'boolean',
            description: 'Display an asterisk after the label text'
        },

        // Text inputs
        for: {
            control: 'text',
            description: 'The ID of the form control this label is associated with'
        },
        text: {
            control: 'text',
            description: 'The text content of the label'
        },
        hint: {
            control: 'text',
            description: 'Hint text displayed below the label'
        },
        tooltip: {
            control: 'text',
            description: 'Text displayed in a tooltip when hovering over the help icon'
        }
    }
}

export default meta

type Story = StoryObj<IDpLabel>

export const Default: Story = {
    args: {
        bold: true,
        for: 'default',
        hint: '',
        hide: false,
        text: 'Label Text',
        tooltip: '',
        required: false
    },
    render: (args) => ({
        components: { DpLabel },
        setup() {
            return { args }
        },
        template: `<DpLabel v-bind="args" />`
    })
}

export const FullExample: Story = {
    render: () => ({
        components: { DpLabel },
        template: `
            <div class="space-y-6">
                <!-- Basic label -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Basic Label</h3>
                    <DpLabel
                        for="basic"
                        text="First name"
                    />
                    <input id="basic" type="text" class="border border-gray-300 p-1 rounded mt-1" />
                </div>

                <!-- Required label -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Required Label</h3>
                    <DpLabel
                        for="required"
                        text="Email address"
                        required
                    />
                    <input id="required" type="email" required class="border border-gray-300 p-1 rounded mt-1" />
                </div>

                <!-- Label with hint -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Label with Hint</h3>
                    <DpLabel
                        for="hint"
                        text="Contact person"
                        hint="Please enter the name of the primary contact person"
                    />
                    <input id="hint" type="text" class="border border-gray-300 p-1 rounded mt-1" />
                </div>

                <!-- Label with multiple hints -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Label with Multiple Hints</h3>
                    <DpLabel
                        for="multiHint"
                        text="Username"
                        :hint="['Must be 3-20 characters', 'Can only contain letters, numbers, and underscores']"
                    />
                    <input id="multiHint" type="text" class="border border-gray-300 p-1 rounded mt-1" />
                </div>

                <!-- Label with tooltip -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Label with Tooltip</h3>
                    <DpLabel
                        for="tooltip"
                        text="Authorized users"
                        tooltip="These users will have full access to the application"
                    />
                    <input id="tooltip" type="text" class="border border-gray-300 p-1 rounded mt-1" />
                </div>

                <!-- Non-bold label -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Non-bold Label</h3>
                    <DpLabel
                        for="nonbold"
                        text="Optional field"
                        :bold="false"
                    />
                    <input id="nonbold" type="text" class="border border-gray-300 p-1 rounded mt-1" />
                </div>

                <!-- Visually hidden label (for accessibility) -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Visually Hidden Label (screenreader-only)</h3>
                    <DpLabel
                        for="hidden"
                        text="Search"
                        hide
                    />
                    <input id="hidden" type="search" placeholder="Search..." class="border border-gray-300 p-1 rounded" />
                </div>

                <!-- Comprehensive example -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">Comprehensive Example</h3>
                    <DpLabel
                        for="comprehensive"
                        text="Document Title"
                        required
                        hint="Enter the official title of the document"
                        tooltip="This will be displayed as the main heading in reports"
                    />
                    <input id="comprehensive" type="text" required class="border border-gray-300 p-1 rounded mt-1" />
                </div>
            </div>
        `
    }),
    tags: ['!dev'],
}
