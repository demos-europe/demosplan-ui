<template>
  <div
    ref="notification"
    :class="prefixClass('c-notify__message ' + messageClass)"
    :role="ariaRole"
  >
    <button
      ref="closeButton"
      :class="prefixClass('c-notify__closer')"
      type="button"
      :aria-label="closeButtonLabel"
      @click.stop.prevent="hide"
      @keydown.esc="hide"
    >
      <dp-icon
        :class="prefixClass('c-notify__icon')"
        icon="x-circle"
        aria-hidden="true"
        weight="fill"
      />
    </button>

    <div :class="prefixClass('flow-root')">
      <dp-icon
        :class="prefixClass('c-notify__icon mt-px mr-1 float-left')"
        :icon="messageIcon"
        aria-hidden="true"
        weight="fill"
      />
      <div :class="prefixClass('c-notify__text u-ml mt-2')">
        {{ message.text }}
        <a
          v-if="message.linkUrl"
          :class="prefixClass('c-notify__link mt-1')"
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
import { de } from '~/components/shared/translations'
import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { prefixClassMixin } from '~/mixins'

export default {
  name: 'DpNotification',

  components: {
    DpIcon,
  },

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
        info: 'info',
        warning: 'warning',
        error: 'warning-circle',
        confirm: 'check-circle',
        dev: 'info',
      },
    }
  },

  computed: {
    ariaRole () {
      return ['error', 'warning'].includes(this.message.type) ? 'alert' : 'status'
    },

    closeButtonLabel () {
      return de.hint.dismiss
    },

    messageClass () {
      return 'c-notify__message--' + this.message.type
    },

    messageIcon () {
      return this.icons[this.message.type]
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

    // Focus close button for error notifications immediately for accessibility
    if (this.message.type === 'error') {
      this.$nextTick(() => {
        this.$refs.closeButton?.focus()
      })
    }
  },
}
</script>
