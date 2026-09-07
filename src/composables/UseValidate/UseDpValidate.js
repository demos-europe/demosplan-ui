import { errorClass, scrollToVisibleElement } from '~/lib/validation/utils/helpers'
import { ref, watch } from 'vue'
import { assignHandlersForInputs } from '~/lib/validation/utils/assignHandlersForInputs'
import assignObserver from '~/lib/validation/utils/assignObserver'
import { de } from '~/components/shared/translations'
import validateForm from '~/lib/validation/utils/validateForm'

export function useDpValidate (formRef) {
  const isValid = ref(true)

  function validate () {
    const form = formRef.value

    if (!form) {
      return true
    }

    const formValidation = validateForm(form)

    isValid.value = formValidation.valid

    if (formValidation.valid === false) {
      const invalidFields = formValidation.invalidFields
      const customErrors = invalidFields
        .filter(element => element.dataset.dpValidateError !== undefined)
        .map(element => element.dataset.dpValidateError)
      customErrors.forEach(error => dplan.notify.notify('error', error))

      if (customErrors.length === 0) {
        const fieldsWithTopics = []

        invalidFields.forEach(field => {
          const fieldName = field.dataset.dpValidateErrorFieldname
          
          if (!fieldName) {
            return
          }

          const topicElement = field.closest('[data-dp-validate-topic]')
          const topicName = topicElement ? (topicElement.dataset.dpValidateTopic ?? '') : ''

          const existingIndex = fieldsWithTopics.findIndex(
            item => item.fieldName === fieldName && item.topicName === topicName,
          )

          if (existingIndex === -1) {
            fieldsWithTopics.push({ fieldName, topicName })
          }
        })

        if (fieldsWithTopics.length) {
          const fieldsString = fieldsWithTopics.map(item => {
            return item.topicName ? `${item.fieldName} (${item.topicName})` : item.fieldName
          }).join(', ')
          const errorMandatoryFields = de.error.mandatoryFields.intro + fieldsString + de.error.mandatoryFields.outro
          dplan.notify.notify('error', errorMandatoryFields)
        } else {
          dplan.notify.notify('error', de.error.mandatoryFields.default)
        }
      }

      const firstErrorElement = form.querySelector('.' + errorClass)
      
      scrollToVisibleElement(firstErrorElement)
    }

    return formValidation.valid
  }

  watch(formRef, (form) => {
    if (!form) {
      return
    }

    assignHandlersForInputs(form)
    assignObserver(form)
  }, { flush: 'post', immediate: true })

  return { isValid, validate }
}
