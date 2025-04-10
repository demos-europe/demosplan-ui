import { awaitElement, errorClass, getAllInputsArray, getInputType } from './helpers'
import validateDatepicker from './validateDatepicker'
import validateFieldset from './validateFieldset'
import validateInput from './validateInputField'
import validateTiptap from './validateTiptap'

function assignHandlersForInputs (form) {
  const allInputsArray = getAllInputsArray(form)
  allInputsArray.forEach(input => { assignHandlersForSingleInput(input) })
}

// Add event listener to inputs - remove error border on focus and validate on blur
function assignHandlersForSingleInput (input) {
  let checkboxes, radios, fieldsToCheck
  const type = getInputType(input)

  const observeValidationRelations = (input, validationFunction) => {
    if (input.hasAttribute('data-dp-validate-if')) {
      const allConditions = input.getAttribute('data-dp-validate-if').split(',')

      allConditions.forEach(condition => {
        const comparisonType = condition.indexOf('!==') > -1 ? 'isNotEqual' : 'isEqual'
        const matchers = condition.split(comparisonType === 'isNotEqual' ? '!==' : '===')
        const validationContainer = input.closest('[data-dp-validate]')
        /**
         * Use the form as the validation container. This is necessary because in some cases, such as wizard,
         * the value of the 'data-dp-validate-if' attribute may refer to a different fieldset.
         * By using the form, this condition can be found throughout the entire form.
         */
        const form = validationContainer.tagName === 'FIELDSET' && validationContainer.form ? validationContainer.form : validationContainer

        try {
          const inputToCheck = form.querySelector(matchers[0]) // It has to be a valid querySelector, which means that numerical ids will throw an error

          if (inputToCheck.type === 'radio') {
            // Get all other radios
            const siblingRadios = Array.from(form.querySelectorAll(`input[name="${inputToCheck.name}"]:not([value="${inputToCheck.value}"]`))
            siblingRadios.forEach(radio => radio.addEventListener('input', validationFunction))
          } else {
            inputToCheck.addEventListener('input', validationFunction)
            inputToCheck.addEventListener('change', validationFunction)
            inputToCheck.addEventListener('select', validationFunction)
          }
        } catch (e) {

        }
      })
    }
  }

  switch (type) {
  case 'tiptap':
    awaitElement('div[contenteditable="true"]', input.parentNode).then(() => {
      const tiptapField = input.parentNode.querySelector('div[contenteditable="true"]')
      tiptapField.addEventListener('blur', () => validateTiptap(input))
      tiptapField.addEventListener('focus', () => {
        // If input has error remove it on focus
        if (tiptapField.classList.contains(errorClass)) {
          tiptapField.classList.remove(errorClass)
        }
      })
      observeValidationRelations(input, () => validateTiptap(input))
    })
    break
  case 'fieldset':
    checkboxes = Array.from(input.querySelectorAll('input[type="checkbox"]'))
    radios = Array.from(input.querySelectorAll('input[type="radio"]'))

    if (checkboxes.length > 0) {
      fieldsToCheck = checkboxes
    } else if (radios.length > 0) {
      fieldsToCheck = radios
    } else {
      fieldsToCheck = []
    }

    fieldsToCheck.forEach(checkbox => checkbox.addEventListener('blur', () => validateFieldset(input)))
    fieldsToCheck.forEach(checkbox => checkbox.addEventListener('change', () => validateFieldset(input)))
    observeValidationRelations(input, () => validateFieldset(input))
    break
  case 'datepicker':
    input.addEventListener('focus', () => {
      // If input has error remove it on focus
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass)
      }
    })
    input.addEventListener('blur', () => validateDatepicker(input))
    observeValidationRelations(input, () => validateDatepicker(input))
    break
  case 'input':
    input.addEventListener('focus', () => {
      // If input has error remove it on focus
      if (input.classList.contains(errorClass)) {
        input.classList.remove(errorClass)
      }
    })
    input.addEventListener('blur', () => validateInput(input))
    observeValidationRelations(input, () => validateInput(input))
    break
  default:
  }
}

export { assignHandlersForInputs, assignHandlersForSingleInput }
