import type { Meta, StoryObj } from '@storybook/vue3'
import { DpTabs, DpTab } from '~/components'
import { ref } from 'vue'

interface IDpTabs {
  activeId?: string
  tabSize: 'medium' | 'large'
  useUrlFragment: boolean
  change: (id: string) => void
}

const meta: Meta<typeof DpTabs> = {
  component: DpTabs,
  title: 'Components/Tabs',
  render: (args) => ({
    components: {
      DpTabs,
      DpTab
    },
    setup() {
      const activeTab = ref(args.activeId || 'idTab1')
      
      // Handle tab change
      const handleChange = (id: string) => {
        activeTab.value = id
        args.change && args.change(id)
      }
      
      return { args, activeTab, handleChange }
    },
    template: `
      <div style="width: 100%; padding: 16px; border: 1px solid #eee;">
        <dp-tabs 
          :active-id="activeTab"
          :tab-size="args.tabSize"
          :use-url-fragment="args.useUrlFragment"
          @change="handleChange">
          <dp-tab
            id="idTab1"
            label="Tab Title 1">
            <div style="padding: 20px;">
              Tab content 1. This is the first tab panel with some sample content.
            </div>
          </dp-tab>
          <dp-tab
            id="idTab2"
            label="Tab Title 2">
            <div style="padding: 20px;">
              Tab content 2. This is the second tab panel with different content.
            </div>
          </dp-tab>
          <dp-tab
            id="idTab3"
            label="Tab Title 3">
            <div style="padding: 20px;">
              Tab content 3. This is the third tab panel with even more content.
            </div>
          </dp-tab>
        </dp-tabs>
      </div>
    `
  }),
  argTypes: {
    activeId: {
      control: 'text',
      description: 'ID of the initially active tab',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'null' }
      }
    },
    tabSize: {
      control: { type: 'radio' },
      options: ['medium', 'large'],
      description: 'Size of the tab headers',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'large' }
      }
    },
    useUrlFragment: {
      control: 'boolean',
      description: 'Whether to update URL fragment when changing tabs',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    change: {
      description: 'Event emitted when active tab changes',
      table: {
        type: { summary: 'event' }
      }
    }
  }
}

export default meta
type Story = StoryObj<IDpTabs>

export const Default: Story = {
  args: {
    activeId: 'idTab1',
    tabSize: 'large',
    useUrlFragment: false
  },
  argTypes: {
    change: { action: 'change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default tab configuration with large tab size'
      }
    }
  }
}

export const WithUrlFragment: Story = {
  args: {
    activeId: 'idTab1',
    tabSize: 'large',
    useUrlFragment: true
  },
  argTypes: {
    change: { action: 'change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with URL fragment integration for deep linking'
      }
    }
  }
}

export const MediumSize: Story = {
  args: {
    activeId: 'idTab1',
    tabSize: 'medium',
    useUrlFragment: false
  },
  argTypes: {
    change: { action: 'change' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with medium-sized headers for more compact interfaces'
      }
    }
  }
}