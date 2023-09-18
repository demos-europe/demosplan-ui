import type { Meta, StoryObj } from '@storybook/vue'
import DpNotifyMessage from './DpNotifyMessage.vue'

const meta: Meta<typeof DpNotifyMessage> = {
    component: DpNotifyMessage,
    title: 'Components/NotifyMessage'
}

interface IDpNotifyMessage {
    dpNotifyRemove: object
    message: object
}

type Story = StoryObj<IDpNotifyMessage>

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
