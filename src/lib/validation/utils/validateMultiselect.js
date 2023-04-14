import { shouldValidate, toggleErrorClass } from './helpers'

export default function validateMultiselect (field) {
  if (shouldValidate(field) === false) {
    return true
  }

  const isValid = field.getAttribute('data-dp-validate-is-valid') === 'true'
  toggleErrorClass(field, !isValid)

  return isValid
}
