<template>
  <div class="relative">
    <video
      :aria-labelledby="ariaLabelledby"
      :id="id"
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
        :src="track.src"
        :srclang="track.srclang"
        :label="track.label"
        :kind="track.kind"
        :default="!!track.default">
    </video>
  </div>
</template>

<script>
import Plyr from 'plyr/dist/plyr.polyfilled.min'
export default {
  name: 'DpVideoPlayer',

  props: {
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

    poster: {
      type: String,
      required: false,
      default: ''
    },

    sources: {
      required: false,
      validator: (value) => {
        // Check if all sources have a src and a type attribute
        return Array.isArray(value) && value.filter(source => source.src && source.type).length === value.length
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
}
</script>
