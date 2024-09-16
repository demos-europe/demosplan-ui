import type { Meta, StoryObj } from '@storybook/vue3'
import DpSkeletonBox from './'

const meta: Meta<typeof DpSkeletonBox> = {
    component: DpSkeletonBox,
    title: "Components/SkeletonBox",
    argTypes: {}
}

export default meta
type Story = StoryObj<typeof DpSkeletonBox>

export const Default: Story = {
    args: {}
}
