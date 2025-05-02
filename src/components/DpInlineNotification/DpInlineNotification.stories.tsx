import type { Meta, StoryObj } from '@storybook/vue3'
import DpInlineNotification from './'

interface IDpInlineNotification {
    dismissible: boolean
    dismissibleKey: string
    message: string
    type: string
}

const meta: Meta<typeof DpInlineNotification> = {
    component: DpInlineNotification,
    title: "Components/InlineNotification",
    argTypes: {}
}

export default meta

type Story = StoryObj<IDpInlineNotification>

export const Default: Story = {
    args: {
        message: 'Inline Notification Message'
    }
}
