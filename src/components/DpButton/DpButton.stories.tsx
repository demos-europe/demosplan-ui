import type {Meta, StoryObj} from '@storybook/vue3'
import DpButton from './'
import { SIZES as ICON_SIZES } from '~/components/DpIcon/util/iconConfig'

const meta: Meta<typeof DpButton> = {
  component: DpButton,
  title: 'Components/Button',
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'warning'],
      control: {type: 'select'},
    },
    default: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      },
    },
    variant: {
      options: ['solid', 'outline', 'subtle'],
      control: {type: 'select'},
    },
    iconSize: {
      options: Object.keys(ICON_SIZES),
      control: {type: 'select'},
    },
  },
}

export default meta

type Story = StoryObj<typeof DpButton>

export const Default: Story = {
  args: {
    text: 'Save',
  }
}

export const Primary: Story = {
  args: {
    text: 'Save',
  }
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    text: 'Cancel',
  }
}

export const Warning: Story = {
  args: {
    color: 'warning',
    text: 'Delete',
  }
}

export const Solid: Story = {
  args: {
    text: 'Save',
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    text: 'Save',
  }
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    text: 'Save',
  }
}

export const Rounded: Story = {
  args: {
    rounded: true,
    text: 'Save',
  }
}

export const LinkElement: Story = {
  args: {
    href: 'https://example.com',
    text: 'Go somewhere',
  }
}

export const BusyState: Story = {
  args: {
    busy: true,
    text: 'Saving item...',
  }
}

export const WithIcon: Story = {
  args: {
    iconAfter: 'chevron-right',
    text: 'Next',
  }
}

export const OnlyIcon: Story = {
  args: {
    hideText: true,
    icon: 'edit',
    text: 'Edit item',
  }
}
