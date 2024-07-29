import { toggleErrorClass } from './helpers'

export default function validateDatepicker (input) {
  let isValid = true

  if (input.value === '') {
    isValid = !input.hasAttribute('required')
  } else {
    /**
     * DpDatePicker accepts the dateFormat: 'dd.mm.yyyy'
     * Regex to check date from https://www.regextester.com/97612
     * Allows dates following these rules:
     * - days may have leading zeros. 1-31. max 2 digits
     * - months may have leading zeros. 1-12. max 2 digits
     * - years 1900-2099. 4 digits
     */
    const regex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/
    if (regex.test(input.value) === false) {
      isValid = false
    }
  }

  toggleErrorClass(input, !isValid)
  return isValid
}
