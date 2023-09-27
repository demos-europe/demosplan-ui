import type { Meta, StoryObj } from '@storybook/vue'
import DpInlineNotification from './'

const meta: Meta<typeof DpInlineNotification> = {
    component: DpInlineNotification,
    title: "Components/InlineNotification",
    argTypes: {}
}

interface IDpInlineNotification {
    dismissible: boolean
    dismissibleKey: string
    message: string
    type: string
}

type Story = StoryObj<IDpInlineNotification>

export default meta

export const Default: Story = {
    args: {
        message: 'Inline Notification Message'
    }
}
