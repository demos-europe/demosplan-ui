import type { Meta, StoryObj } from '@storybook/vue'
import DpNotification from './'

const meta: Meta<typeof DpNotification> = {
    component: DpNotification,
    title: 'Components/Notification'
}

interface IDpNotification {
    dpNotifyRemove: object
    message: object
}

type Story = StoryObj<IDpNotification>

export default meta

export const Default: Story = {
    args: {
        message: {
            text: 'here text'
        },
    },
    argTypes: {
        dpNotifyRemove: { action: 'dpNotifyRemove' }
    }
}
