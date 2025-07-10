import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DpStickyElement from './'

interface IDpStickyElement {
  applyZIndex: boolean
  border: boolean
  context: HTMLElement | undefined
  direction: 'top' | 'bottom'
  observeContext: boolean
  offset: number
}

const meta: Meta<typeof DpStickyElement> = {
  component: DpStickyElement,
  title: 'Components/StickyElement',
  render: (args) => ({
    components: {
      DpStickyElement
    },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 100px; position: relative; overflow: auto; border: 1px solid #ccc; padding: 1rem;">
        <dp-sticky-element v-bind="args">
          <div style="background-color: #f0f0f0; padding: 1rem;">
            Sticky content
          </div>
        </dp-sticky-element>
        <div style="height: 300px; padding-top: 120px;">
          Scroll to see sticky behavior
        </div>
      </div>
    `
  }),
  argTypes: {
    applyZIndex: {
      control: 'boolean',
      description: 'Whether to apply z-index to the sticky element',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border on the sticky element',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    context: {
      control: false,
      description: 'The HTML element that serves as context for the sticky element',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'undefined' }
      }
    },
    direction: {
      control: { type: 'inline-radio' },
      options: ['top', 'bottom'],
      description: 'The direction the element should stick to',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'top' }
      }
    },
    observeContext: {
      control: 'boolean',
      description: 'Whether context changes should trigger a refresh of sticky positions',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    offset: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The offset from context the element should enter/exit sticky mode',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '0' }
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpStickyElement>

export const Default: Story = {
  args: {
    direction: 'top',
    border: true,
    offset: 0,
    applyZIndex: true,
    observeContext: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Default sticky element that sticks to the top with a border'
      }
    }
  }
}

export const Bottom: Story = {
  args: {
    direction: 'bottom',
    border: true,
    offset: 0,
    applyZIndex: true,
    observeContext: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Sticky element that sticks to the bottom, useful for action buttons or persistent UI elements at the bottom of the viewport'
      }
    }
  }
}