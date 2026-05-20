<template>
  <dp-modal
    ref="confirmDialog"
    aria-describedby="dialogDescription"
    content-classes="w-2/3 xl:w-1/3"
    :content-header-classes="contentHeaderClasses"
    :data-cy="`confirmDialog:${dataCy}`"
    @modal:toggled="onModalToggled"
  >
    <template
      v-if="header"
      v-slot:header
    >
      <span>{{ header }}</span>
    </template>
    <p
      id="dialogDescription"
      class="font-normal break-words whitespace-pre-line mb-3"
    >
      {{ message }}
    </p>
    <div class="flex flex-col items-end gap-3">
      <dp-button-row
        primary
        :primary-text="confirmButtonText"
        :primary-btn-variant="primaryBtnVariant"
        secondary
        :secondary-text="declineButtonText"
        :secondary-btn-variant="secondaryBtnVariant"
        @primary-action="handleConfirm(true)"
        @secondary-action="handleConfirm(false)"
      />
      <dp-button
        v-if="tertiaryButtonText"
        :text="tertiaryButtonText"
        color="warning"
        variant="subtle"
        @click="handleTertiaryAction"
      />
    </div>
  </dp-modal>
</template>

<script lang="ts">
import { de } from '~/components/shared/translations'
import DpButton from '~/components/DpButton'
import DpButtonRow from '~/components/DpButtonRow'
import DpModal from '~/components/DpModal'
import { PropType } from 'vue'

type ButtonVariant = 'solid' | 'outline' | 'subtle'

export default {
  name: 'DpConfirmDialog',

  components: {
    DpButton,
    DpButtonRow,
    DpModal,
  },

  props: {
    confirmButtonText: {
      type: String,
      required: false,
      default: de.operations.confirm,
    },

    contentHeaderClasses: {
      required: false,
      type: String,
      default: '',
    },

    dataCy: {
      type: String,
      required: false,
      default: '',
    },

    declineButtonText: {
      type: String,
      required: false,
      default: de.operations.abort,
    },

    header: {
      type: String,
      required: false,
      default: '',
    },

    message: {
      type: String,
      required: false,
      default: de.confirmDialog.confirm,
    },

    primaryBtnVariant: {
      required: false,
      type: String as PropType<ButtonVariant>,
      default: 'solid',
      validator: (prop: ButtonVariant) => ['solid', 'outline', 'subtle'].includes(prop),
    },

    secondaryBtnVariant: {
      required: false,
      type: String as PropType<ButtonVariant>,
      default: 'solid',
      validator: (prop: ButtonVariant) => ['solid', 'outline', 'subtle'].includes(prop),
    },

    tertiaryButtonText: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: [
    'confirmed',
    'tertiary-action',
  ],

  data () {
    return {
      resolvePromise: null as ((result: boolean) => void) | null,
    }
  },
  methods: {
    handleConfirm (isConfirmed: boolean): void {
      if (this.resolvePromise) {
        this.resolvePromise(isConfirmed)
        /* Clear the reference to the resolver to avoid reusing it later */
        this.resolvePromise = null
      }

      this.$emit('confirmed', isConfirmed)
      this.$refs.confirmDialog?.toggle()
    },

    handleTertiaryAction () {
      this.$emit('tertiary-action')
      this.$refs.confirmDialog?.toggle()
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
    },
  },
}
</script>
