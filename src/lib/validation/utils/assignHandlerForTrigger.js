import { de } from '~/components/shared/translations'
import { scrollToVisibleElement } from './helpers'
import validateForm from './validateForm'

/**
 *  Append hidden form field to a form
 *  @param form DOM element
 *  @param fieldName string
 *  @param value string
 */
function addFormHiddenField (form, fieldName, value) {
  const input = document.createElement('input')
  const options = { type: 'hidden', name: fieldName, value: value, 'data-form-actions-added': '1' }
  Object.keys(options).forEach(attr => {
    input.setAttribute(attr, options[attr])
  })
  form.appendChild(input)
}

const submitAction = (form, triggerName) => {
  document.dispatchEvent(new CustomEvent('customValidationPassed', { detail: { form: form } }))
  if (typeof form.submit === 'function') {
    if (triggerName) {
      addFormHiddenField(form, triggerName, triggerName)
    }

    form.submit()
  }
}

export default function assignHandlerForTrigger (triggerButton, form) {
  triggerButton.addEventListener('click', (e) => {
    const callback = triggerButton.dataset.dpValidateCallback ? triggerButton.dataset.dpValidateCallback : ''
    const transKey = triggerButton.dataset.dpValidateTranskey ? triggerButton.dataset.dpValidateTranskey : ''
    const triggerName = triggerButton.getAttribute('name')
    const captureClick = triggerButton.hasAttribute('data-dp-validate-capture-click')
    const validatedForm = validateForm(form)
    e.preventDefault()
    if (validatedForm.valid === false) {
      if (captureClick) {
        e.stopImmediatePropagation()
      }
      // Display custom error messages defined via `data-dp-validate-error` as notifications
      const invalidCustomErrorFields = validatedForm.invalidFields.filter(field => field.dataset.dpValidateError)
      invalidCustomErrorFields.forEach(field => {
        dplan.notify.notify('error', Translator.trans(field.validationMessage))
      })

      if (invalidCustomErrorFields.length === 0 || invalidCustomErrorFields.length < validatedForm.invalidFields) {
        const nonEmptyUniqueFieldNames = validatedForm.invalidFields
          .map(field => field.getAttribute('data-dp-validate-error-fieldname'))
          .filter(Boolean)
          .filter((field, idx, arr) => arr.indexOf(field) === idx)

        const fieldsString = nonEmptyUniqueFieldNames ? nonEmptyUniqueFieldNames.join(', ') : ' '
        const errorMandatoryFields = de.error.mandatoryFields.intro + fieldsString + de.error.mandatoryFields.outro

        nonEmptyUniqueFieldNames.length ? dplan.notify.notify('error', errorMandatoryFields) : dplan.notify.notify('error', de.error.mandatoryFields.default)
      }

      scrollToVisibleElement(validatedForm.invalidFields[0])
      document.dispatchEvent(new CustomEvent('customValidationFailed', { detail: { form: form } }))
    } else {
      switch (callback) {
        case 'dpconfirm':
          if (window.dpconfirm(transKey, true) === false) {
            e.preventDefault()
          } else {
            submitAction(form, triggerName)
          }
          break
        default:
          submitAction(form, triggerName)
      }
    }
  })
}
