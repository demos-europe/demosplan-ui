import validateMultiselect from './utils/validateMultiselect'

const dpValidateMultiselectDirective = {
  mounted (el, binding) {
    if(!binding.value) {
      return
    }

    // Set initially correct validity value (no dropdown options => isValid)
    const component = binding.instance
    const hasOptions = component.groupValues ? component.options.some(group => group[component.groupValues].length > 0) : component.options.length > 0

    component.$el.setAttribute('data-dp-validate-is-valid', !hasOptions)
    const validateMultiselectField = (e) => {
      e.stopPropagation()
      const validate = () => {
        document.removeEventListener('mouseup', validate)
        validateMultiselect(el)
      }
      document.addEventListener('mouseup', validate)
    }

    el.addEventListener('mouseup', validateMultiselectField)
  },

  updated (el, binding) {
    if(!binding.value) {
      return
    }

    const component = binding.instance
    const hasOptions = component.groupValues ? component.options.some(group => group[component.groupValues].length > 0) : component.options.length > 0
    const isValid = !hasOptions ? true : checkValue(component.value)

    component.$el.setAttribute('data-dp-validate-is-valid', isValid)
    validateMultiselect(component.$el)
  }
}

function checkValue (val) {
  if (!val) {
    return false
  }

  let isValid

  if (Array.isArray(val)) { // If it is a multiple select, value is Array
    if (val.length === 0) {
      isValid = false
    } else if (val.length === 1) {
      isValid = typeof val[0] === 'object' ? val[0].id !== '' : val[0] !== '' // Each value in array can be either an object or a string
    } else {
      isValid = true
    }
  } else if (typeof val === 'object') { // In single selects value is object or string
    isValid = val === null ? false : (Object.keys(val).length > 0 && val.id !== '') // We have to check if id is not empty, because sometime we have an 'empty option' in dropdowns and if the input is required the empty option is not a valid input
  } else if (typeof val === 'string') { // In single selects value is object or string
    isValid = val !== ''
  }

  return isValid
}

export default dpValidateMultiselectDirective
