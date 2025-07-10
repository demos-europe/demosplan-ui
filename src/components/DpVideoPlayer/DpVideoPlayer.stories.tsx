import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DpVideoPlayer } from '~/components'

const meta: Meta<typeof DpVideoPlayer> = {
  title: 'Components/VideoPlayer',
  component: DpVideoPlayer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Video player component that supports both HTML5 and embedded videos (YouTube, Vimeo) with comprehensive playback controls.'
      }
    }
  },
  argTypes: {
    sources: {
      description: 'Array of video sources',
      control: 'object',
    },
    tracks: {
      description: 'Array of subtitle/caption tracks',
      control: 'object',
    },
    iconUrl: {
      description: 'URL to the icons SVG sprite',
      control: 'text'
    },
    id: {
      description: 'Unique ID for the video player',
      control: 'text'
    },
    poster: {
      description: 'URL to the poster image',
      control: 'text'
    },
    isEmbedded: {
      description: 'Whether the video is an embedded source (YouTube, Vimeo)',
      control: 'boolean'
    },
    ariaLabelledby: {
      description: 'ID of an element that labels the video player',
      control: 'text'
    },
    dataCy: {
      description: 'Data attribute for Cypress testing',
      control: 'text',
      table: {
        defaultValue: { summary: 'videoPlayer' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof DpVideoPlayer>

/**
 * Standard HTML5 video player with an MP4 source.
 */
export const Standard: Story = {
  render: (args) => ({
    components: { DpVideoPlayer },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 640px;">
        <dp-video-player v-bind="args" />
      </div>
    `
  }),
  args: {
    id: 'standard-video',
    iconUrl: 'https://cdn.plyr.io/3.6.12/plyr.svg',
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
    sources: [
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
        type: 'video/mp4'
      }
    ]
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-video-player
  id="standard-video"
  icon-url="https://cdn.plyr.io/3.6.12/plyr.svg"
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  :sources="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4'
    }
  ]"
/>
`
      }
    }
  }
}

/**
 * YouTube embedded video player.
 */
export const YouTube: Story = {
  render: (args) => ({
    components: { DpVideoPlayer },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 640px;">
        <dp-video-player v-bind="args" />
      </div>
    `
  }),
  args: {
    id: 'youtube-video',
    iconUrl: 'https://cdn.plyr.io/3.6.12/plyr.svg',
    isEmbedded: true,
    sources: [
      {
        provider: 'youtube',
        embedId: 'bTqVqk7FSmY' // Big Buck Bunny trailer
      }
    ]
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-video-player
  id="youtube-video"
  icon-url="https://cdn.plyr.io/3.6.12/plyr.svg"
  :is-embedded="true"
  :sources="[
    {
      provider: 'youtube',
      embedId: 'bTqVqk7FSmY'
    }
  ]"
/>
`
      }
    }
  }
}

/**
 * Video player with captions/subtitles.
 */
export const WithCaptions: Story = {
  render: (args) => ({
    components: { DpVideoPlayer },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 640px;">
        <dp-video-player v-bind="args" />
      </div>
    `
  }),
  args: {
    id: 'captions-video',
    iconUrl: 'https://cdn.plyr.io/3.6.12/plyr.svg',
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
    sources: [
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
        type: 'video/mp4'
      }
    ],
    tracks: [
      {
        kind: 'captions',
        label: 'English',
        srclang: 'en',
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
        default: true
      },
      {
        kind: 'captions',
        label: 'French',
        srclang: 'fr',
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt'
      }
    ]
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-video-player
  id="captions-video"
  icon-url="https://cdn.plyr.io/3.6.12/plyr.svg"
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  :sources="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4'
    }
  ]"
  :tracks="[
    {
      kind: 'captions',
      label: 'English',
      srclang: 'en',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      default: true
    },
    {
      kind: 'captions',
      label: 'French',
      srclang: 'fr',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt'
    }
  ]"
/>
`
      }
    }
  }
}

/**
 * Video player with multiple source formats for browser compatibility.
 */
export const MultipleSources: Story = {
  render: (args) => ({
    components: { DpVideoPlayer },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 640px;">
        <dp-video-player v-bind="args" />
      </div>
    `
  }),
  args: {
    id: 'multi-source-video',
    iconUrl: 'https://cdn.plyr.io/3.6.12/plyr.svg',
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
    sources: [
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
        type: 'video/mp4'
      },
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.webm',
        type: 'video/webm'
      }
    ]
  },
  parameters: {
    docs: {
      source: {
        code: `
<dp-video-player
  id="multi-source-video"
  icon-url="https://cdn.plyr.io/3.6.12/plyr.svg"
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  :sources="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4'
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.webm',
      type: 'video/webm'
    }
  ]"
/>
`
      }
    }
  }
}
