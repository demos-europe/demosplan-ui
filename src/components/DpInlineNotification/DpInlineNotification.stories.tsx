import type { Meta, StoryObj } from '@storybook/vue'
import DpInlineNotification from './DpInlineNotification.vue'

const meta: Meta<typeof DpInlineNotification> = {
    component: DpInlineNotification,
    title: "Components/InlineNotification",
    argTypes: {}
}

export default meta
type Story = StoryObj<typeof DpInlineNotification>

export const Default: Story = {
    args: {
        message: 'Inline Notification Message'
    }
}
