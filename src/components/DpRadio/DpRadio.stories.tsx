import type { Meta, StoryObj } from '@storybook/vue3'
import DpRadio from './'

interface IDpRadio {
  id: string
  name?: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  value?: string
  dataCy?: string
  dataDpValidateErrorFieldname?: string
  label?: {
    text?: string
    bold?: boolean
    hint?: string
    tooltip?: string
  }
  'change': (checked: boolean) => void
}

const meta: Meta<typeof DpRadio> = {
  component: DpRadio,
  title: "Components/Radio",
  parameters: {
    docs: {
      description: {
        component: 'A radio button input with customizable label and states.'
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpRadio>

export const Default: Story = {
  args: {
    id: 'radio-default',
    label: {
      text: 'Default radio option'
    }
  },
  argTypes: {
    'change': { action: 'change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default radio button with a label'
      }
    }
  }
}

export const States: Story = {
  render: (args) => ({
    components: { DpRadio },
    setup() {
      return { args }
    },
    template: `
      <div class="space-stack-s">
        <div class="u-mb-0_5">
          <dp-radio
            id="radio-checked"
            :label="{ text: 'Checked radio option' }"
            :checked="true"
            @change="args.change" />
        </div>

        <div class="u-mb-0_5">
          <dp-radio
            id="radio-disabled"
            :label="{ text: 'Disabled radio option' }"
            :disabled="true"
            @change="args.change" />
        </div>

        <div class="u-mb-0_5">
          <dp-radio
            id="radio-required"
            :label="{ text: 'Required radio option' }"
            :required="true"
            @change="args.change" />
        </div>
      </div>
    `
  }),
  argTypes: {
    'change': { action: 'change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in different states: checked, disabled, and required'
      }
    }
  }
}

export const WithLabelOptions: Story = {
  args: {
    id: 'radio-hint',
    label: {
      text: 'Radio with hint and tooltip',
      hint: 'This is additional information about this option',
      tooltip: 'Tooltip text',
    }
  },
  argTypes: {
    'change': { action: 'change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button with hint text to provide additional context'
      }
    }
  }
}
