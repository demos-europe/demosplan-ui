import { convertSize } from '../../../lib'
import { de as german } from '../../shared/translations'

const de = () => {
  return {
    strings: {
      /*
       * Text to show on the droppable area.
       * `%{browse}` is replaced with a link that opens the system file selection dialog.
       */
      dropHereOr: german.upload.select.pdf({
        browse: '{browse}',
        maxUploadSize: convertSize('GB', 2)
      }),
      failedToUpload: german.upload.failed,
      // This string is clickable and opens the system file selection dialog.
      browse: german.computer
    }
  }
}

export { de }
