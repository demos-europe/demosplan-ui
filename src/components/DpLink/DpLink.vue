<template>
  <a
    :aria-label="ariaLabel"
    :class="linkClass"
    :data-cy="dataCy"
    :href="href"
    :rel="rel"
    :target="target"
    @click="handleClick">

    <dp-icon
      v-if="icon"
      aria-hidden="true"
      :class="iconClass"
      :icon="icon" />

    {{ text }}

    <dp-icon
      v-if="iconAfter"
      aria-hidden="true"
      :class="iconClass"
      :icon="icon" />
  </a>
</template>

<script>
import DpIcon from "~/components/DpIcon/DpIcon"

export default {
  name: 'DpLink',

  components: {
    DpIcon
  },

  props: {
    ariaLabel: {
      type: String,
      required: false
    },

    dataCy: {
      type: String,
      required: false,
      default: 'link'
    },

    event: {
      type: Function,
      required: false,
      default: () => undefined
    },

    href: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: false
    },

    /**
     * Icon that will be placed after link text.
     */
    iconAfter: {
      required: false,
      type: String
    },

    iconClass: {
      type: String,
      required: false
    },

    linkClass: {
      type: String,
      required: false
    },

    rel: {
      type: String,
      required: false
    },

    target: {
      type: String,
      required: false
    },

    text: {
      type: String,
      required: true
    }
  },

  methods: {
    handleClick (event) {
      if (this.event) {
        this.event(event)
      }
    },
  }
}
</script>
