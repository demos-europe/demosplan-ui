/**
 * DPConfirm - Display a confirmation dialog
 */
export default function Confirm () {
  window.dpconfirm = function (message, isUrlEncoded) {
    if (typeof isUrlEncoded !== 'undefined' && isUrlEncoded) {
      message = decodeURI(message)
    }
    return confirm(message)
  }
}
