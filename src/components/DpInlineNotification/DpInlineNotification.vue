<template>
  <div
    v-if="isDismissed === false"
    :data-cy="dataCy"
    :class="`flash flash-${type} flex`">
    <i
      class="fa u-pr-0_25 line-height--1_4"
      :class="iconClasses[type]"
      aria-hidden="true" />
    <div class="space-stack-xs">
      <div
        v-if="message"
        :data-cy="`${dataCy}:message`"
        v-html="message" />
      <slot />
      <button
        v-if="dismissible"
        class="btn--blank o-link--default weight--bold"
        :data-cy="`${dataCy}:hideHint`"
        @click="dismiss"
        v-text="translations.hintDismiss" />
    </div>
  </div>
  <div
    v-else
    class="flow-root">
    <button
      :aria-label="translations.hintShow"
      class="btn--blank color--grey float-right"
      :data-cy="`${dataCy}:showHint`"
      @click="show">
      <dp-icon
        icon="info"
        aria-hidden="true" />
    </button>
  </div>
</template>

<script>
import { de } from "~/components/shared/translations"
import DpIcon from '~/components/DpIcon'
import lscache from 'lscache'

export default {
  name: 'DpInlineNotification',

  components: {
    DpIcon
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'inlineNotification'
    },

    /**
     * A notification may be too prominent if permanently visible. In that case it can be dismissed.
     * A small icon will take the place of the notification to bring it back if needed.
     */
    dismissible: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * If set, the dismissed state will be preserved via localStorage.
     */
    dismissibleKey: {
      type: String,
      required: false,
      default: null
    },

    message: {
      type: String,
      required: false,
      default: null
    },

    type: {
      type: String,
      required: false,
      default: 'error'
    }
  },

  data () {
    return {
      iconClasses: {
        confirm: 'fa-check',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
      },
      isDismissed: true,
      translations: {
        hintDismiss: de.hint.dismiss,
        hintShow: de.hint.show
      }
    }
  },

  methods: {
    dismiss () {
      this.isDismissed = true
      this.dismissibleKey && lscache.set(this.dismissibleKey, Date.now())
    },

    show () {
      this.isDismissed = false
      this.dismissibleKey && lscache.remove(this.dismissibleKey)
    }
  },

  mounted () {
    this.isDismissed = (this.dismissible && this.dismissibleKey) ? !!lscache.get(this.dismissibleKey) : false
  }
}
</script>
