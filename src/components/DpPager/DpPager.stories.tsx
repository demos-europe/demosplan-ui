import type { Meta, StoryObj } from '@storybook/vue3'
import DpPager from './'

interface IDpPager {
  currentPage?: number
  totalItems?: number
  totalPages?: number
  perPage?: number
  limits?: number[]
  'page-change': (page: number) => void
  'size-change': (size: number) => void
}

const meta: Meta<typeof DpPager> = {
  component: DpPager,
  title: "Components/Pager",
  parameters: {
    docs: {
      description: {
        component: 'The Pager component combines pagination controls with a dropdown to adjust the number of items displayed per page.'
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpPager>

export const Default: Story = {
  args: {
    currentPage: 3,
    totalItems: 100,
    totalPages: 10,
    perPage: 10,
    limits: [5, 10, 25, 50, 100]
  },
  argTypes: {
    'page-change': { action: 'page-change' },
    'size-change': { action: 'size-change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard pager with page navigation and items per page selection.'
      }
    }
  }
}