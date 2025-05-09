import type { Meta, StoryObj } from '@storybook/vue3'
import DpTooltip from './'
import { DpButton } from '~/components'

interface IDpTooltip {
  text: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  container?: string
  nodeType?: string
}

const meta: Meta<typeof DpTooltip> = {
  component: DpTooltip,
  title: 'Components/Tooltip',
  argTypes: {
    text: {
      control: 'text',
      description: 'Content displayed in the tooltip',
      table: {
        type: { summary: 'String' }
      }
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to the trigger element',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'top' }
      }
    },
    container: {
      control: 'text',
      description: 'CSS selector for the container element that the tooltip should be appended to',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'body' }
      }
    },
    nodeType: {
      control: { type: 'select' },
      options: ['div', 'span', 'button', 'a'],
      description: 'HTML element type to use for the tooltip wrapper',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'div' }
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpTooltip>

export const Default: Story = {
  render: (args) => ({
    components: { DpTooltip },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 50px; display: flex; justify-content: center;">
        <dp-tooltip v-bind="args">
          <span style="border-bottom: 1px dotted #000; cursor: help;">Hover me for information</span>
        </dp-tooltip>
      </div>
    `
  }),
  args: {
    text: 'This is a helpful tooltip that provides additional information.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip that appears when hovering over the trigger element'
      }
    }
  }
}

export const Placement: Story = {
  render: (args) => ({
    components: { DpTooltip, DpButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 80px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
        <dp-tooltip text="Tooltip on top" placement="top">
          <dp-button>Top</dp-button>
        </dp-tooltip>
        <dp-tooltip text="Tooltip on right" placement="right">
          <dp-button>Right</dp-button>
        </dp-tooltip>
        <dp-tooltip text="Tooltip on bottom" placement="bottom">
          <dp-button>Bottom</dp-button>
        </dp-tooltip>
        <dp-tooltip text="Tooltip on left" placement="left">
          <dp-button>Left</dp-button>
        </dp-tooltip>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be positioned in different directions: top, right, bottom, or left'
      },
      source: {
        code: `
<dp-tooltip text="Tooltip on top" placement="top">
  <dp-button>Top</dp-button>
</dp-tooltip>

<dp-tooltip text="Tooltip on right" placement="right">
  <dp-button>Right</dp-button>
</dp-tooltip>

<dp-tooltip text="Tooltip on bottom" placement="bottom">
  <dp-button>Bottom</dp-button>
</dp-tooltip>

<dp-tooltip text="Tooltip on left" placement="left">
  <dp-button>Left</dp-button>
</dp-tooltip>
`
      }
    }
  }
}

export const WithHTML: Story = {
  render: (args) => ({
    components: { DpTooltip },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 50px; display: flex; justify-content: center;">
        <dp-tooltip v-bind="args">
          <span style="border-bottom: 1px dotted #000; cursor: help;">Hover for formatted content</span>
        </dp-tooltip>
      </div>
    `
  }),
  args: {
    text: 'This tooltip contains <strong>HTML</strong> content including: <ul><li>Formatted text</li><li>Lists</li><li>And more</li></ul>'
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich HTML content with formatting and lists'
      }
    }
  }
}

export const WithCustomContainer: Story = {
  render: (args) => ({
    components: { DpTooltip },
    setup() {
      return { args }
    },
    template: `
      <div id="tooltip-container" style="padding: 50px; position: relative; border: 1px dashed #ccc; display: flex; justify-content: center;">
        <dp-tooltip v-bind="args">
          <span style="border-bottom: 1px dotted #000; cursor: help;">Tooltip constrained to container</span>
        </dp-tooltip>
      </div>
    `
  }),
  args: {
    text: 'This tooltip is constrained to its parent container',
    container: '#tooltip-container'
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be constrained to a specific container element'
      }
    }
  }
}

export const CustomNodeType: Story = {
  render: (args) => ({
    components: { DpTooltip },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 50px; display: flex; justify-content: center;">
        <dp-tooltip
          v-bind="args"
          href="https://example.com">
          Click this link
        </dp-tooltip>
      </div>
    `
  }),
  args: {
    text: 'This tooltip is attached to a link element',
    nodeType: 'a',
    placement: 'bottom'
  },
  parameters: {
    docs: {
      description: {
        story: 'The wrapper element can be customized to use a different HTML tag (div, span, a, button, etc.)'
      },
      source: {
        code: `
<dp-tooltip
  text="This tooltip is attached to a link element"
  nodeType="a"
  placement="bottom"
  href="https://example.com">
  Click this link
</dp-tooltip>
`
      }
    }
  }
}