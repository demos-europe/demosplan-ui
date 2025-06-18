<template>
  <dp-modal
    ref="confirmDialog"
    content-classes="w-2/3 xl:w-1/3"
    :data-cy="`confirmDialog:${dataCy}`"
    aria-describedby="dialogDescription"
    @modal:toggled="onModalToggled">
    <p
      id="dialogDescription"
      class="font-normal break-words mb-3">
      {{ message }}
    </p>
    <dp-button-row
      primary
      :primary-text="confirmButtonText"
      secondary
      @primary-action="handleConfirm(true)"
      @secondary-action="handleConfirm(false)" />
  </dp-modal>
</template>

<script lang="ts">
import { de } from '~/components/shared/translations'
import DpButtonRow from '~/components/DpButtonRow'
import DpModal from '~/components/DpModal'

export default {
  name: 'DpConfirmDialog',

  components: {
    DpButtonRow,
    DpModal
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: ''
    },

    message: {
      type: String,
      required: false,
      default: de.confirmDialog.confirm
    }
  },

  data () {
    return {
      confirmButtonText: de.operations.confirm,
      resolvePromise: null as ((result: boolean) => void) | null
    }
  },
  methods: {
    handleConfirm (isConfirmed: boolean): void {
      if (this.resolvePromise) {
        this.resolvePromise(isConfirmed)
        /* Clear the reference to the resolver to avoid reusing it later */
        this.resolvePromise = null
      }
      this.$refs.confirmDialog.toggle()
    },

    onModalToggled (isOpen: boolean): void {
      if (!isOpen && this.resolvePromise) {
        this.resolvePromise(false)
        this.resolvePromise = null
      }
    },

    open (): Promise<boolean> {
      this.$refs.confirmDialog.toggle()

      return new Promise(resolve => {
        this.resolvePromise = resolve
      })
    }
  }
}
</script>
