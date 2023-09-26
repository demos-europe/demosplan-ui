import type { Meta, StoryObj } from '@storybook/vue'
import DpTableCard from './DpTableCard.vue'

interface IDpTableCard {
    open: boolean
    isOpen: boolean
}

const meta: Meta<typeof DpTableCard> = {
    component: DpTableCard,
    title: 'Components/TableCard',
    render: (args) => ({
        components: {
            DpTableCard
        },
        setup() {
            return { args }
        },
        template: `
          <div>
            <ul class="o-list o-list--card u-mb">
              <div class="o-list__item">
                <dp-table-card class="o-accordion u-p-0_5" v-bind="args">
                  <template v-slot:header>
                    <div class="flex">
                      <div class="">
                          <input
                              type="checkbox">
                      </div>
                      <div class="">
                        <p>Title</p>
                      </div>
                      <button
                          :aria-expanded="args.open"
                          @click="args.open = !args.open"
                          type="button"
                          class="btn--blank o-link--default">
                        Click to Toggle
                      </button>
                    </div>
                  </template>
                  <template>
                    <div>
                      Test 1
                    </div>
                    <div>
                      Test 2
                    </div>
                  </template>
                </dp-table-card>
              </div>
            </ul>
          </div>
        `,
    })
}

type Story = StoryObj<IDpTableCard>

export default meta

export const Default: Story = {
    args: {
        open: false,
        isOpen: false
    },
    argTypes: {}
}
