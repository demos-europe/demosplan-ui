/*
 * This is the dpValidate vue mixin that allows us to validate inputs in vue components.
 * It is to be used in vue components. To use it in vanilla JS-context see: src/lib/validation/dpValidate.js
 *
 * Up to date documentation and usage examples can be found here:
 * https://dplan-documentation.demos-europe.eu/development/application-architecture/validation/frontend/#_1-use-as-a-vue-mixin-dpvalidatemixin-js
 */

import { de } from '~/components/shared/translations'
import { errorClass, scrollToVisibleElement } from '~/lib/validation/utils/helpers'
import { assignHandlersForInputs } from '~/lib/validation/utils/assignHandlersForInputs'
import hasOwnProp from '~/utils/hasOwnProp'
import validateForm from '~/lib/validation/utils/validateForm'

export default {
  data () {
    return {
      dpValidate: {}
    }
  },

  methods: {
    /**
     *
     * @param formId
     * @param callback
     * @param forceCallback   if true, the callback function is called even if the form is invalid
     */
    dpValidateAction (formId, callback, forceCallback = true) {
      const isForm = this.$el.hasAttribute('data-dp-validate') && this.$el.getAttribute('data-dp-validate') === formId
      const form = isForm ? this.$el : this.$el.querySelector(`[data-dp-validate=${formId}]`)
      const formValidation = validateForm(form)
      this.dpValidate = { ...this.dpValidate, [formId]: formValidation.valid }

      if (hasOwnProp(this.dpValidate, 'invalidFields') === false) {
        this.dpValidate.invalidFields = {}
      }
      this.dpValidate.invalidFields[formId] = formValidation.invalidFields

      if (this.dpValidate[formId] === false) {
        const invalidFields = this.dpValidate.invalidFields[formId]
        const customErrors = invalidFields
          .filter(element => element.hasAttribute('data-dp-validate-error'))
          .map(element => element.dataset.dpValidateError)
        customErrors.forEach(error => dplan.notify.notify('error', error))

        if (customErrors.length === 0) {
          // Collect field information with topics for wizard
          const fieldsWithTopics = []

          invalidFields.forEach(field => {
            const fieldName = field.getAttribute('data-dp-validate-error-fieldname')
            if (!fieldName) return // Überspringe Felder ohne Namen

            // Search for parent element with data-wizard-topic
            let topicElement = field.closest('[data-wizard-topic]')
            let topicName = topicElement ? topicElement.getAttribute('data-wizard-topic') : ''

            const existingIndex = fieldsWithTopics.findIndex(
              item => item.fieldName === fieldName && item.topicName === topicName
            )

            if (existingIndex === -1) {
              fieldsWithTopics.push({ fieldName, topicName })
            }
          })

          if (fieldsWithTopics.length) {
            const fieldsString = fieldsWithTopics.map(item => {
              return item.topicName
                ? `${item.fieldName} (${item.topicName})`
                : item.fieldName
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

      // In some cases, we want to call the callback even if the form is invalid
      if ((this.dpValidate[formId] === false && forceCallback) || this.dpValidate[formId]) {
        return callback()
      }
    }
  },

  mounted () {
    // Set the initial values for form validity to true and add event listener for input fields (focus and blur)
    let forms = []
    if (this.$el.hasAttribute('data-dp-validate')) {
      this.isComponentForm = true // It means a whole component is a form to be validated; it has no child-forms
      forms.push(this.$el)
    } else {
      this.isComponentForm = false // It means in this component there are several forms that need to be validated
      forms = Array.from(this.$el.querySelectorAll('[data-dp-validate]'))
    }

    this.dpValidateForms = forms

    this.dpValidateForms.forEach(form => {
      const formId = form.getAttribute('data-dp-validate')
      this.dpValidate[formId] = true
      assignHandlersForInputs(form)
    })
  },

  updated () {
    this.$nextTick(() => {
      // Check if new forms were added - only if component is not a form itself
      if (this.isComponentForm === false) {
        // Collect all forms, that are in DOM after the update
        const afterUpdateForms = Array.from(this.$el.querySelectorAll('[data-dp-validate]'))
        // Merge forms that are currently in DOM with the forms that were previously in DOM
        const allForms = afterUpdateForms.concat(this.dpValidateForms)
        // Loop over all forms
        allForms.forEach(form => {
          if (this.dpValidateForms.includes(form) && afterUpdateForms.includes(form) === false) {
            // Remove form from dpValidateForms if it is no longer in DOM
            const idx = this.dpValidateForms.findIndex(el => el === form)
            delete this.dpValidateForms[idx]
          } else if (this.dpValidateForms.includes(form) === false && afterUpdateForms.includes(form)) {
            // If it is a new form (was just added to DOM), add it to dpValidateForms and assign handlers to each field
            this.dpValidateForms.push(form)
            const formId = form.getAttribute('data-dp-validate')
            this.dpValidate[formId] = true
            assignHandlersForInputs(form)
          } else {
            // If the form was previously in DOM and was not removed, reassign handlers as the required/validateIf/pattern properties may have changed
            assignHandlersForInputs(form)
          }
        })
      } else {
        // If component is a form, only reassign handlers in existing forms
        this.dpValidateForms.forEach(form => {
          assignHandlersForInputs(form)
        })
      }
    })
  }
}
