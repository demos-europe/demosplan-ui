import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpDetails from './'

interface IDpDetails {
    summary: string
    open?: boolean
}

const meta: Meta<typeof DpDetails> = {
    component: DpDetails,
    title: "Components/Details",
    argTypes: {
        summary: {
            control: 'text',
            description: 'Text to show in the summary element'
        },
        open: {
            control: 'boolean',
            description: 'Whether the details should be open by default'
        },
        default: {
            control: {
                type: 'text',
            },
            description: 'Content to be revealed when expanded',
            table: {
                category: 'Slots',
                type: {
                    summary: 'html',
                },
            }
        }
    }
}

export default meta

type Story = StoryObj<IDpDetails>

export const Default: Story = {
    args: {
        summary: 'The summary tells users what to find in the details'
    },
    render: (args) => ({
        components: { DpDetails },
        setup() {
            return { args }
        },
        template: `
            <dp-details :summary="args.summary" :open="args.open">
                Content to be revealed onClick of the summary. Here, content of any length can be placed. However
                this does not mean that content have to be as long as possible, especially if no real value is added 
                by lengthening sentences that otherwise would not even have to be read.
            </dp-details>
        `
    })
}

export const OpenByDefault: Story = {
    args: {
        summary: 'This details element is open by default',
        open: true
    },
    render: (args) => ({
        components: { DpDetails },
        setup() {
            return { args }
        },
        template: `
            <dp-details :summary="args.summary" :open="args.open">
                This content is visible by default because the 'open' attribute is set to true.
            </dp-details>
        `
    })
}

export const WithHTML: Story = {
    args: {
        summary: 'Details with HTML content'
    },
    render: (args) => ({
        components: { DpDetails },
        setup() {
            return { args }
        },
        template: `
            <dp-details :summary="args.summary" :open="args.open">
                <h3 class="text-lg font-bold mb-2">HTML Content Example</h3>
                <p class="mb-2">You can include <strong>formatted text</strong>, <em>emphasis</em>, and other HTML elements.</p>
                <ul class="list-disc pl-5 mb-2">
                    <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                </ul>
                <a href="#" class="text-blue-500 hover:underline">Example link</a>
            </dp-details>
        `
    })
}
