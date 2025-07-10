import type { Meta, StoryObj } from '@storybook/vue3-vite'
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

/**
 * A notification may be too prominent if permanently visible. In that case it can be dismissed.
 * A small icon will take the place of the notification to bring it back if needed.
 */
export const Dismissible: Story = {
    args: {
        dismissible: true,
        message: 'Dismissible notification message'
    }
}

/**
 * If set, the dismissed state will be preserved via localStorage.
 */
export const DismissibleKey: Story = {
    args: {
        dismissible: true,
        dismissibleKey: 'demosplan-ui-dismissible-notification',
        message: 'Dismissible notification with persistent state'
    }
}
