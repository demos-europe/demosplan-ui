import type { Meta, StoryObj } from '@storybook/vue3'
import DpProgressBar from './'

const meta: Meta<typeof DpProgressBar> = {
    component: DpProgressBar,
    title: "Components/ProgressBar",

}

interface IDpProgressBar {}

type Story = StoryObj<IDpProgressBar>

export default meta

export const Default: Story = {
    args: {},
    argTypes: {}
}
