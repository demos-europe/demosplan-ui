import type { Meta, StoryObj } from '@storybook/vue3'
import DpSkeletonBox from './'

interface IDpSkeletonBox {
  height: string
  width: string
}

const meta: Meta<typeof DpSkeletonBox> = {
  component: DpSkeletonBox,
  title: 'Components/SkeletonBox',
  argTypes: {
    height: {
      control: 'text',
      description: 'Height of the skeleton box',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '1em' }
      }
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton box',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '100%' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof DpSkeletonBox>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default skeleton box with default height (1em) and width (100%)'
      }
    }
  }
}

export const CustomSize: Story = {
  args: {
    height: '50px',
    width: '200px'
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton box with custom height and width'
      }
    }
  }
}

export const MultipleItems: Story = {
  render: (args) => ({
    components: { DpSkeletonBox },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 100%;">
        <dp-skeleton-box 
          v-for="i in 3" 
          :key="i" 
          height="54px" 
          style="margin-bottom: 10px;" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Multiple skeleton boxes commonly used to simulate loading a list of items'
      },
      source: {
        code: `
<dp-skeleton-box 
  v-for="(item, idx) in items"
  :key="\`skeleton:\${idx}\`"
  height="54px" />
        `
      }
    }
  }
}