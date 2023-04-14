import { convertSize } from '../../../../lib'
const de = () => {
  return {
    strings: {
      /*
       * Text to show on the droppable area.
       * `%{browse}` is replaced with a link that opens the system file selection dialog.
       */
      dropHereOr: Translator.trans('form.button.upload.pdf', {
        browse: '{browse}',
        maxUploadSize: convertSize('GB', window.dplan.settings.maxUploadSize)
      }),
      failedToUpload: Translator.trans('form.button.upload.failed', {
        file: '{file}'
      }),
      // This string is clickable and opens the system file selection dialog.
      browse: Translator.trans('form.button.upload.search')
    }
  }
}

export { de }
