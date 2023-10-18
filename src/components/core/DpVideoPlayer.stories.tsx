import type { Meta, StoryObj } from '@storybook/vue'
import DpVideoPlayer from './DpVideoPlayer.vue'

const meta: Meta<typeof DpVideoPlayer> = {
    component: DpVideoPlayer,
    title: 'Components/VideoPlayer',
    render: (args) => ({
        components: {
            DpVideoPlayer
        },
        setup() {
            return { args }
        },
        template: `<dp-video-player v-bind="args"></dp-video-player>`,
    })
}

interface IDpVideoPlayer {
    iconUrl: string
    id: string
    sources: object[]
}

type Story = StoryObj<IDpVideoPlayer>

export default meta

export const Default: Story = {
    args: {
        iconUrl: 'videoIconUrl.svg',
        id: 'videoId',
        sources: [{
            src: 'videoSrc',
            type: 'videoType'
        }]
    },
    argTypes: {}
}
