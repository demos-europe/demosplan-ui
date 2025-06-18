import type { Meta, StoryObj } from '@storybook/vue3'
import DpContextualHelp from './'
import { SIZES as ICON_SIZES } from '~/components/DpIcon/util/iconConfig'

interface IDpContextualHelp {
  icon?: string
  size?: string
  text?: string
  tooltipOptions?: Record<string, any>
}

const meta: Meta<typeof DpContextualHelp> = {
  component: DpContextualHelp,
  title: "Components/ContextualHelp",
  argTypes: {
    icon: {
      control: 'text',
      description: 'The icon to display as trigger for the tooltip',
      defaultValue: 'question'
    },
    size: {
      control: 'select',
      options: Object.keys(ICON_SIZES),
      description: 'The size of the icon',
      defaultValue: 'medium'
    },
    text: {
      control: 'text',
      description: 'The text content of the tooltip'
    },
    tooltipOptions: {
      control: 'object',
      description: 'Additional options for the tooltip, including content'
    }
  }
}

export default meta

type Story = StoryObj<IDpContextualHelp>

export const Default: Story = {
  args: {
    text: 'This is helpful contextual information for the user'
  }
}

export const CustomIcon: Story = {
  args: {
    icon: 'info',
    text: 'This tooltip uses a different icon'
  }
}

export const CustomSize: Story = {
  args: {
    size: 'large',
    text: 'This tooltip has a larger icon'
  }
}

export const TooltipOptions: Story = {
  args: {
    tooltipOptions: {
      content: 'This tooltip uses <strong>custom classes</strong> and styling with <em>HTML support</em>',
      classes: 'z-modal'
    }
  },
  render: (args) => ({
    components: { DpContextualHelp },
    setup() {
      return { args }
    },
    template: `
      <DpContextualHelp
        :tooltipOptions="args.tooltipOptions"
        :icon="args.icon || 'info'"
        :size="args.size || 'medium'"
      />
    `
  })
}
