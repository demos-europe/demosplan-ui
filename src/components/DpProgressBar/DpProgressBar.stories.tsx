import type { Meta, StoryObj } from '@storybook/vue3'
import DpProgressBar from './'

interface IDpProgressBar {
  indeterminate?: boolean
  label?: string
  percentage?: number
}

const meta: Meta<typeof DpProgressBar> = {
  component: DpProgressBar,
  title: "Components/ProgressBar",
  parameters: {
    docs: {
      description: {
        component: 'The ProgressBar component displays a colored bar indicating the progress of a specific task or process.'
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpProgressBar>

export const Determinate: Story = {
  args: {
    indeterminate: false,
    label: "Uploading files",
    percentage: 65
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the determinate ProgressBar when you know how long a task will take. The green color indicates (increasing) success. The percentage value is displayed to show exact progress.'
      }
    }
  }
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: "Processing data"
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the indeterminate ProgressBar when you don\'t know how long a task will take. It shows a cyclic animation instead of linear progress. The blue color indicates that something is happening, but we don\'t have information on the progress towards completion.'
      }
    }
  }
}