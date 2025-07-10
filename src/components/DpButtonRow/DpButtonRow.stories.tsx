import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpButtonRow from './'
import DpButton from '~/components/DpButton'

const meta: Meta<typeof DpButtonRow> = {
  component: DpButtonRow,
  title: 'Components/ButtonRow',
  argTypes: {
    alignment: {
      control: { type: 'select' },
      options: ['right', 'left'],
      description: 'Alignment of the button row',
    },
    busy: {
      control: { type: 'boolean' },
      description: 'Indicates if the button row is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables all buttons in the row',
    },
    href: {
      control: { type: 'text' },
      description: 'Link for the primary button if applicable',
    },
    primary: {
      control: { type: 'boolean' },
      description: 'Enables the primary button',
    },
    primaryAction: {
      action: 'primaryAction',
      description: 'Action triggered by the primary button',
    },
    primaryText: {
      control: { type: 'text' },
      description: 'Text for the primary button',
    },
    secondary: {
      control: { type: 'boolean' },
      description: 'Enables the secondary button',
    },
    secondaryAction: {
      action: 'secondaryAction',
      description: 'Action triggered by the secondary button',
    },
    secondaryText: {
      control: { type: 'text' },
      description: 'Text for the secondary button',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'subtle'],
      description: 'Variant of the button row',
    },
  },
}

export default meta

type Story = StoryObj<typeof DpButtonRow>

type StoryArgs = {
  primary: boolean
  secondary: boolean
  primaryText: string
  secondaryText: string
  disabled?: boolean | { primary?: boolean, secondary?: boolean }
  alignment?: string
  variant?: string
}

export const Default: Story = {
  args: {
    primary: true,
    secondary: true,
    primaryText: 'Save',
    secondaryText: 'Cancel',
  } as StoryArgs,
}

export const ThirdButtonInSlot: Story = {
  args: {
    primary: true,
    secondary: true,
    primaryText: 'Save',
    secondaryText: 'Cancel',
  },
  render: (args: StoryArgs) => ({
    components: { DpButtonRow, DpButton },
    setup() {
      return { args }
    },
    template: `
      <dp-button-row v-bind="args" @primary-action="args.primaryAction" @secondary-action="args.secondaryAction">
        <dp-button
          class="u-ml-0_5"
          color="secondary"
          :text="'Close'"
          @click="args.secondaryAction" />
      </dp-button-row>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: '<DpButtonRow primary primaryText="Save" secondary secondaryText="Cancel">\n  <DpButton color="secondary" text="Close" />\n</DpButtonRow>'
      }
    }
  }
}

export const AllButtonsDisabled: Story = {
  args: {
    primary: true,
    secondary: true,
    primaryText: 'Save',
    secondaryText: 'Cancel',
    disabled: true
  } as StoryArgs,
}
