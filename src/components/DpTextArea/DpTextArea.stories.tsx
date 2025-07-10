import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpTextArea from './'

interface IDpTextArea {
  id: string
  label: string
  value: string
  hint?: string
  maxlength?: number
  disabled?: boolean
  required?: boolean
  reducedHeight?: boolean
  growToParent?: boolean
  attributes?: string[]
  dataDpValidateIf?: boolean | string
  dataDpValidateErrorFieldname?: string
  input: (value: string) => void
}

const meta: Meta<typeof DpTextArea> = {
  component: DpTextArea,
  title: 'Components/TextArea',
  argTypes: {
    id: {
      control: 'text',
      description: 'ID attribute for the textarea element',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' }
      }
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' }
      }
    },
    hint: {
      control: 'text',
      description: 'Hint text displayed below the label',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' }
      }
    },
    value: {
      control: 'text',
      description: 'Current value of the textarea',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' }
      }
    },
    maxlength: {
      control: 'number',
      description: 'Maximum number of characters allowed',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: 'undefined' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    reducedHeight: {
      control: 'boolean',
      description: 'Display the textarea with reduced height (60px)',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    growToParent: {
      control: 'boolean',
      description: 'If enabled, makes the textarea grow to 100% height of its parent',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    attributes: {
      control: 'object',
      description: 'Additional HTML attributes to apply to the textarea, like rows and cols',
      table: {
        type: { summary: 'Array<string>' },
        defaultValue: { summary: '[]' }
      }
    },
    dataDpValidateIf: {
      control: 'text',
      description: 'Conditional validation expression',
      table: {
        type: { summary: 'Boolean | String' },
        defaultValue: { summary: 'false' }
      }
    },
    dataDpValidateErrorFieldname: {
      control: 'text',
      description: 'Custom field name for validation error messages',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' }
      }
    },
    input: {
      description: 'Event emitted when the input value changes',
      table: { type: { summary: 'event' } }
    }
  },
  tags: ['autodocs', '!dev'],
}

export default meta
type Story = StoryObj<IDpTextArea>

export const Default: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    value: ''
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic textarea with label'
      }
    }
  },

  tags: ['!autodocs', 'dev'],
}

export const WithHint: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    hint: 'A hint explaining what to enter in the textarea',
    value: ''
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with additional descriptive hint text'
      }
    }
  }
}

export const WithMaxlength: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    maxlength: 100,
    value: 'This is some sample text that demonstrates the maxlength feature'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character limit and remaining character counter'
      }
    }
  }
}

export const Required: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    required: true,
    value: ''
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Required textarea with an asterisk on the label'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    disabled: true,
    value: 'This textarea is disabled and cannot be edited'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled textarea that cannot be edited'
      }
    }
  }
}

export const ReducedHeight: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    reducedHeight: true,
    value: 'This textarea has reduced height (60px)'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with smaller vertical size (60px height)'
      }
    }
  }
}

export const WithAttributes: Story = {
  args: {
    id: 'textAreaId',
    label: 'Enter some text',
    attributes: ['rows=5', 'cols=40'],
    value: 'This textarea has custom rows and columns attributes'
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with custom HTML attributes (rows=5, cols=40)'
      }
    }
  }
}

export const WithValidation: Story = {
  args: {
    id: 'textAreaId',
    label: 'Your Comments',
    required: true,
    dataDpValidateIf: '#someOtherField',
    dataDpValidateErrorFieldname: 'Comments',
    value: ''
  },
  argTypes: {
    input: { action: 'input' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with conditional validation that activates when another field is filled'
      }
    }
  }
}
