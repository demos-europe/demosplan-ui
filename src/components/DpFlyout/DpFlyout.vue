<template>
  <span
    class="o-flyout"
    :class="{
      'o-flyout--left': align === 'left',
      'o-flyout--right': align === 'right',
      'o-flyout--padded': padded,
      'is-expanded': isExpanded,
      'o-flyout--menu': hasMenu
    }"
    v-click-outside="close"
    data-cy="flyoutTrigger">
    <button
      :disabled="disabled"
      type="button"
      aria-haspopup="true"
      class="o-flyout__trigger btn--blank o-link--default u-ph-0_25 line-height--2 whitespace-nowrap"
      :data-cy="dataCy"
      @click="toggle">
      <slot
        name="trigger"
        v-bind:isExpanded="isExpanded">
        <i class="fa fa-ellipsis-h" />
      </slot>
    </button>
    <div
      class="o-flyout__content shadow"
      data-cy="flyout">
      <slot />
    </div>
  </span>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'DpFlyout',

  directives: {
    ClickOutside
  },

  props: {
    align: {
      required: false,
      type: String,
      default: 'right',
      validator: (prop) => ['left', 'right'].includes(prop)
    },

    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    disabled: {
      required: false,
      type: Boolean,
      default: false
    },

    hasMenu: {
      required: false,
      type: Boolean,
      default: true
    },

    padded: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isExpanded: false
    }
  },

  methods: {
    close () {
      if (this.isExpanded === true) {
        this.$emit('close')
        this.isExpanded = false
      }
    },

    toggle () {
      this.isExpanded = !this.isExpanded

      if (this.isExpanded) {
        this.$emit('open')
      } else {
        this.$emit('close')
      }
    }
  },

  mounted () {
    this.popupItem = this.$el
  }
}
</script>
