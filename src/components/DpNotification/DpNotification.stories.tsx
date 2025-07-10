import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpNotification from './'

interface NotificationMessage {
  type: 'info' | 'warning' | 'error' | 'confirm' | 'dev'
  text: string
  linkUrl?: string
  linkText?: string
  uid?: string
}

interface IDpNotification {
  message: NotificationMessage
  hideTimer?: number
  'dp-notify-remove': (message: NotificationMessage) => void
}

const meta: Meta<typeof DpNotification> = {
  component: DpNotification,
  title: 'Components/Notification',
  render: (args) => ({
    components: { DpNotification },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 400px; margin: 20px;">
        <dp-notification v-bind="args" @dp-notify-remove="args['dp-notify-remove']" />
      </div>
    `
  })
}

export default meta
type Story = StoryObj<IDpNotification>

export const Info: Story = {
  args: {
    message: {
      type: 'info',
      text: 'This is an information message'
    },
    hideTimer: 20000
  },
  argTypes: {
    'dp-notify-remove': { action: 'dp-notify-remove' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Information notification with blue styling'
      }
    }
  }
}

export const Warning: Story = {
  args: {
    message: {
      type: 'warning',
      text: 'Warning! This action may have consequences'
    }
  },
  argTypes: {
    'dp-notify-remove': { action: 'dp-notify-remove' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning notification with orange styling'
      }
    }
  }
}

export const ErrorState: Story = {
  name: 'Error',
  args: {
    message: {
      type: 'error',
      text: 'An error occurred while processing your request'
    }
  },
  argTypes: {
    'dp-notify-remove': { action: 'dp-notify-remove' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Error notification with red styling. Error notifications do not auto-dismiss.'
      }
    }
  }
}

export const Confirm: Story = {
  args: {
    message: {
      type: 'confirm',
      text: 'Your changes have been successfully saved'
    }
  },
  argTypes: {
    'dp-notify-remove': { action: 'dp-notify-remove' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmation notification with green styling'
      }
    }
  }
}

export const WithLink: Story = {
  args: {
    message: {
      type: 'info',
      text: 'Documentation is available:',
      linkUrl: 'https://example.com/docs',
      linkText: 'View Documentation'
    },
    hideTimer: 20000
  },
  argTypes: {
    'dp-notify-remove': { action: 'dp-notify-remove' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Notification with a clickable link'
      }
    }
  }
}
