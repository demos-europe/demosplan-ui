<template>
  <div
    ref="notification"
    :class="prefixClass('c-notify__message ' + messageClass)"
    role="alert"
    tabindex="0"
    @keydown.esc="hide"
  >
    <button
      :class="prefixClass('c-notify__closer')"
      type="button"
      :aria-label="closeButtonLabel"
      @click.stop.prevent="hide"
    >
      <i
        :class="prefixClass('c-notify__icon fa fa-times-circle')"
        aria-hidden="true"
      />
    </button>

    <div :class="prefixClass('flow-root')">
      <i
        :class="prefixClass('c-notify__icon fa u-mt-0_125 u-mr-0_25 float-left ' + messageIcon)"
        aria-hidden="true"
      />
      <div :class="prefixClass('u-ml')">
        {{ message.text }}
        <a
          v-if="message.linkUrl"
          :class="prefixClass('c-notify__link u-mt-0_25')"
          :href="message.linkUrl"
          data-cy="messageLink"
        >
          {{ message.linkText || message.linkUrl }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpNotification',

  mixins: [prefixClassMixin],

  props: {
    /**
     * A single notification message object containing type, text(, linkUrl, linkText)
     */
    message: {
      type: Object,
      required: true,
    },
    hideTimer: {
      type: Number,
      required: false,
      default: 20000,
    },
  },

  emits: [
    'dp-notify-remove',
  ],

  data () {
    return {
      messageId: '',
      icons: {
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-exclamation-circle',
        confirm: 'fa-check-circle',
        dev: 'fa-info-circle',
      },
    }
  },

  computed: {
    messageClass () {
      return 'c-notify__message--' + this.message.type
    },

    messageIcon () {
      return this.icons[this.message.type]
    },

    closeButtonLabel () {
      return de.hint.dismiss
    },
  },

  methods: {
    hide () {
      this.$emit('dp-notify-remove', this.message)
    },
  },

  mounted () {
    if (this.message.type !== 'error' && !this.message.persist) {
      setTimeout(() => {
        this.hide()
      }, this.hideTimer)
    }
  },
}
</script>
