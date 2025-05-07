import type { Meta, StoryObj } from '@storybook/vue3'
import DpMultistepNav from './'

interface Step {
  label: string
  icon?: string
  title?: string
}

interface IDpMultistepNav {
  activeStep?: number
  steps: Step[]
  dataCy?: string
  'change-step': (step: number) => void
}

const meta: Meta<typeof DpMultistepNav> = {
  component: DpMultistepNav,
  title: "Components/MultistepNav"
}

export default meta
type Story = StoryObj<IDpMultistepNav>

export const Default: Story = {
  args: {
    steps: [
      {
        label: 'Step 1',
        icon: 'fa-file-text',
        title: 'Choose document'
      },
      {
        label: 'Step 2',
        icon: 'fa-cog',
        title: 'Configure settings'
      },
      {
        label: 'Step 3',
        icon: 'fa-check',
        title: 'Review and complete'
      }
    ],
    activeStep: 2
  },
  argTypes: {
    'change-step': { action: 'change-step' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Multistep navigation with Font Awesome icons'
      }
    }
  }
}
