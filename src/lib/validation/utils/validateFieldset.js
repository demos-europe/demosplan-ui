import { toggleErrorClass } from './helpers'

export default function validateFieldset (fieldset) {
  let allValid = true
  const checkboxes = Array.from(fieldset.querySelectorAll('input[type="checkbox"]'))
  const radios = Array.from(fieldset.querySelectorAll('input[type="radio"]'))

  let fieldsToCheck = null
  if (checkboxes.length > 0) {
    fieldsToCheck = checkboxes
  } else if (radios.length > 0) {
    fieldsToCheck = radios
  }
  if (fieldsToCheck === null) {
    return true
  }

  const isMinimumOneChecked = fieldsToCheck.some(el => el.checked === true)
  if (isMinimumOneChecked === false) {
    allValid = false
    fieldsToCheck.forEach(el => toggleErrorClass(el, true))
  } else {
    fieldsToCheck.forEach(el => toggleErrorClass(el, false))
  }
  return allValid
}
