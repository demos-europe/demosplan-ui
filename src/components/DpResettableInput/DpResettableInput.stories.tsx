import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpResettableInput from './'

interface IDpResettableInput {
  id: string
  dataCy?: string
  buttonVariant?: 'small' | 'medium'
  inputAttributes?: Record<string, any>
  pattern?: string
  required?: boolean
  rounded?: 'full' | 'left' | 'right'
  modelValue?: string
  'update:modelValue'?: (value: string) => void
  'reset'?: () => void
  'input'?: (value: string) => void
  'blur'?: (value: string) => void
  'enter'?: (value: string) => void
  'focus'?: () => void
}

const meta: Meta<typeof DpResettableInput> = {
  component: DpResettableInput,
  title: "Components/ResettableInput",
  parameters: {
    docs: {
      description: {
        component: 'An input field with a reset button that allows users to quickly clear the input value.'
      }
    }
  },
  render: (args) => ({
    components: { DpResettableInput },
    setup() {
      return {
        args
      }
    },
    template: `
      <dp-resettable-input
        :id="args.id"
        :button-variant="args.buttonVariant"
        :input-attributes="args.inputAttributes"
        :required="args.required"
        :rounded="args.rounded"
        :pattern="args.pattern"
        :data-cy="args.dataCy" />
    `
  })
}

export default meta
type Story = StoryObj<IDpResettableInput>

export const Default: Story = {
  args: {
    id: 'resettable-input',
    inputAttributes: {
      placeholder: 'Type something...'
    }
  },
  argTypes: {
    'input': { action: 'input' },
    'reset': { action: 'reset' },
    'blur': { action: 'blur' },
    'enter': { action: 'enter' },
    'focus': { action: 'focus' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic resettable input with empty value. The reset button is disabled when the input is empty.'
      }
    }
  }
}
