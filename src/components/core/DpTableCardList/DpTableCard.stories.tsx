import type { Meta, StoryObj } from '@storybook/vue'
import DpTableCard from './DpTableCard.vue'

interface IDpTableCard {
    open: boolean
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
            <ul class="o-list o-list--card u-mb">
              <div class="o-list__item">
                <dp-table-card
                    class="o-accordion u-p-0_5"
                    ref="card"
                    v-bind="args">
                    <template v-slot:header>
                      <div class="flex">
                          <input type="checkbox">
                          <p>Title</p>
                      </div>
                      <button
                          @click="$refs.card.toggle()"
                          type="button"
                          class="btn--blank o-link--default">
                        Click to Toggle
                      </button>
                    </template>
                    <template>
                      <div>
                        Content
                      </div>
                    </template>
                </dp-table-card>
              </div>
            </ul>
        `,
    })
}

type Story = StoryObj<IDpTableCard>

export default meta

export const Default: Story = {
    args: {
        open: false
    },
    argTypes: {}
}
