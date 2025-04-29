import type { Meta, StoryObj } from '@storybook/vue3'
import DpBadge from './'

const meta: Meta<typeof DpBadge> = {
  component: DpBadge,
  title: 'Components/Badge'
}

export default meta

type Story = StoryObj<{
  text: string,
  color: string,
  size: string
}>

export const Default: Story = {
  args: {
    text: 'Badge Text',
    color: 'default',
    size: 'medium'
  },
  argTypes: {
    text: { control: 'text' },
    color: {
      control: 'select',
      options: ['default', 'confirm', 'error', 'info', 'warning']
    },
    size: {
      control: 'select',
      options: ['smaller', 'small', 'medium', 'large']
    }
  }
}

export const ColorConfirm: Story = {
  args: {
    text: 'Confirm Badge',
    color: 'confirm',
    size: 'medium'
  }
}

export const ColorError: Story = {
  args: {
    text: 'Error Badge',
    color: 'error',
    size: 'medium'
  }
}

export const ColorInfo: Story = {
  args: {
    text: 'Info Badge',
    color: 'info',
    size: 'medium'
  }
}

export const ColorWarning: Story = {
  args: {
    text: 'Warning Badge',
    color: 'warning',
    size: 'medium'
  }
}

export const SizeXSmall: Story = {
  args: {
    text: 'Extra Small Badge',
    color: 'default',
    size: 'smaller'
  }
}

export const SizeSmall: Story = {
  args: {
    text: 'Small Badge',
    color: 'default',
    size: 'small'
  }
}

export const SizeMedium: Story = {
  args: {
    text: 'Small Badge',
    color: 'default',
    size: 'medium'
  }
}

export const SizeLarge: Story = {
  args: {
    text: 'Large Badge',
    color: 'default',
    size: 'large'
  }
}
