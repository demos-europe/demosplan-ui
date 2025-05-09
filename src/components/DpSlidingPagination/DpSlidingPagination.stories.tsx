import type { Meta, StoryObj } from '@storybook/vue3'
import DpSlidingPagination from './'

interface IDpSlidingPagination {
  current: number
  total: number
  'page-change': (page: number) => void
}

const meta: Meta<typeof DpSlidingPagination> = {
  component: DpSlidingPagination,
  title: 'Components/SlidingPagination',
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '1' }
      }
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
      table: {
        type: { summary: 'Number' }
      }
    },
    'page-change': {
      description: 'Event emitted when page is changed',
      table: {
        type: { summary: 'event' }
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpSlidingPagination>

export const Default: Story = {
  args: {
    current: 2,
    total: 10
  },
  argTypes: {
    'page-change': { action: 'page-change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pagination component showing pages 1-10 with current page set to 2'
      }
    }
  }
}

export const LargePageCount: Story = {
  args: {
    current: 7,
    total: 30
  },
  argTypes: {
    'page-change': { action: 'page-change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a large number of pages demonstrating the sliding window functionality'
      }
    }
  }
}