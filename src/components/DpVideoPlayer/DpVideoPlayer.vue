<template>
  <div class="relative">
    <template v-if="isEmbeddedSource">
      <div
        :id="id"
        :data-cy="dataCy"
        :data-plyr-embed-id="primarySource.embedId"
        :data-plyr-provider="primarySource.provider" />
    </template>
    <template v-else>
      <video
        :id="id"
        :aria-labelledby="ariaLabelledby"
        :data-cy="dataCy"
        playsinline
        :data-poster="poster">
        <source
          v-for="source in sources"
          :key="source.src"
          :src="source.src"
          :type="source.type">
        <track
          v-for="track in tracks"
          :key="track.src"
          :default="!!track.default"
          :kind="track.kind"
          :label="track.label"
          :src="track.src"
          :srclang="track.srclang">
      </video>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Plyr from 'plyr/dist/plyr.polyfilled.min'
export default defineComponent({
  name: 'DpVideoPlayer',

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'videoPlayer'
    },

    /**
     * You may pass the id of an element containing content that describes the video.
     */
    ariaLabelledby: {
      type: [String, Boolean],
      required: false,
      default: false
    },

    /**
     * See: https://github.com/sampotts/plyr#using-the-iconurl-option
     */
    iconUrl: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    },

    isEmbedded: {
      type: Boolean,
      required: false,
      default: false
    },

    poster: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * An array of video sources to be used by the player.
     *
     * This prop can handle both embedded video sources (e.g., YouTube, Vimeo)
     * and traditional HTML5 video sources. The first source in the array is
     * considered the `primarySource`, and it is used by the player first.
     *
     * For embedded videos:
     * - `provider`: The video platform (e.g., 'youtube', 'vimeo').
     * - `embedId`: The unique video ID or URL for the embedded video.
     *
     * For HTML5 videos:
     * - `src`: The URL to the video file.
     * - `type`: The MIME type of the video (e.g., 'video/mp4', 'video/webm').
     *
     * The player will automatically detect whether the source is for an embedded
     * video or an HTML5 video and render the appropriate player markup.
     *
     * @type {Array<Object>}
     * @default []
     */
    sources: {
      required: false,
      validator: (value) => {
        // Check if all sources have a src and a type attribute
        return Array.isArray(value) && value.every(source => {
          return (source.src && source.type) || (source.embedId && source.provider)
        })
      },
      default: () => ([])
    },

    tracks: {
      required: false,
      validator: (value) => {
        // Check if all tracks have their required attributes
        return Array.isArray(value) && value.filter(track => track.kind && track.srclang && track.label && track.src).length === value.length
      },
      default: () => ([])
    }
  },

  computed: {
    isEmbeddedSource() {
      return this.primarySource && this.primarySource.embedId && this.primarySource.provider
    },
    primarySource() {
      return this.sources[0] || null
    }
  },

  data () {
    return {
      player: {}
    }
  },

  mounted () {
    // eslint-disable-next-line new-cap
    this.player = new Plyr('#' + this.id, {
      iconUrl: this.iconUrl,
      // For a full list of available controls see https://github.com/sampotts/plyr/blob/master/CONTROLS.md
      controls: [
        'play-large',
        'play',
        'progress',
        'duration',
        'mute',
        'volume',
        'captions',
        'settings',
        'download',
        'fullscreen'
      ]
    })
  }
})
</script>
