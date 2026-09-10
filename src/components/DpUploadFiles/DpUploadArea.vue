<template>
  <div
    :data-cy="dataCy"
    class="relative flex flex-col items-center justify-center gap-1.5 w-full p-3 overflow-hidden border-2 border-dashed border-neutral bg-surface-light text-center"
    :class="showProgress ? 'cursor-default' : 'cursor-pointer'"
    v-bind="rootProps"
  >
    <input
      class="sr-only"
      data-cy="uppyDragDropInput:0"
      v-bind="inputProps"
    >

    <dp-icon
      aria-hidden="true"
      class="text-muted"
      icon="cloud-arrow-up"
      size="xlarge"
    />
    <p class="m-0">
      {{ dropParts[0] }}<span class="underline text-interactive">{{ browseLabel }}</span>{{ dropParts[1] }}
    </p>

    <progress
      v-if="showProgress"
      :value="context.progress"
      class="absolute left-0 bottom-0 w-full h-0.5 appearance-none border-0 bg-transparent [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-status-progress [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-200 [&::-moz-progress-bar]:bg-status-progress"
      max="100"
    />
  </div>
</template>

<script>
import { UppyContextSymbol, useDropzone } from '@uppy/vue'
import DpIcon from '../DpIcon'
import { inject } from 'vue'

export default {
  name: 'DpUploadArea',

  components: {
    DpIcon,
  },

  props: {
    /**
     * Word that opens the file dialog, highlighted inside the drop hint.
     */
    browseLabel: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Data-cy attribute set on the dropzone
     */
    dataCy: {
      type: String,
      required: false,
      default: 'upload',
    },

    /**
     * Hint rendered inside the dropzone while idle. The `{browse}` placeholder
     * is replaced by the highlighted `browseLabel`.
     */
    dropLabel: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup () {
    /*
     * The dropzone handlers and the upload status come from the surrounding
     * <UppyContextProvider> rendered by DpUpload.vue. `getRootProps`/`getInputProps`
     * already return lowercased handlers meant to be spread via `v-bind`.
     */
    const { getRootProps, getInputProps } = useDropzone()

    return {
      context: inject(UppyContextSymbol),
      inputProps: getInputProps(),
      rootProps: getRootProps(),
    }
  },

  computed: {
    dropParts () {
      /*
       * The locale string carries Uppy's `%{browse}` placeholder (the `%` is
       * literal in the template); older strings may use a plain `{browse}`.
       */
      return this.dropLabel.split(/%?\{browse\}/)
    },

    /**
     * Keep the bar visible through the completed state, mirroring the old plugin's `hideAfterFinish: false` behavior.
     * It is removed when the uppy instance resets shortly after completion.
     */
    showProgress () {
      return ['uploading', 'complete'].includes(this.context.status)
    },
  },
}
</script>
