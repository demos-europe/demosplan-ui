import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import { de } from '~/components/shared/translations'
import { errorClass } from '~/lib/validation/utils/helpers'
import { useDpValidate } from '~/composables/UseValidate/UseDpValidate'

function createForm (innerHTML) {
  const form = document.createElement('form')
  form.innerHTML = innerHTML
  document.body.appendChild(form)
  return form
}

/*
 * jsdom does not implement layout, so `offsetParent` is always null. `scrollToVisibleElement`
 * relies on it to find the closest rendered ancestor - stub it to the DOM parent so elements
 * attached to `document.body` are treated as visible. Restored in afterAll() so the prototype
 * patch does not leak into other test files.
 */
const originalOffsetParent = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetParent')

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    configurable: true,
    get () {
      return this.parentNode
    },
  })
})

afterAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', originalOffsetParent)
})

beforeEach(() => {
  document.body.innerHTML = ''
  window.dplan = { notify: { notify: vi.fn() } }
})

describe('useDpValidate', () => {
  test('validate() returns true and does not notify when no form is set', () => {
    const formRef = ref(null)
    const { isValid, validate } = useDpValidate(formRef)

    const result = validate()

    expect(result).toBe(true)
    expect(isValid.value).toBe(true)
    expect(window.dplan.notify.notify).not.toHaveBeenCalled()
  })

  test('validate() returns true when required field is filled', async () => {
    const form = createForm('<input name="email" required value="foo@bar.de">')
    const formRef = ref(form)
    const { isValid, validate } = useDpValidate(formRef)
    await flushPromises()

    const result = validate()

    expect(result).toBe(true)
    expect(isValid.value).toBe(true)
    expect(window.dplan.notify.notify).not.toHaveBeenCalled()
    expect(form.querySelector('input').classList.contains(errorClass)).toBe(false)
  })

  test('validate() returns false and notifies with generic message for an invalid field without fieldname', async () => {
    const form = createForm('<input name="email" required value="">')
    const formRef = ref(form)
    const { isValid, validate } = useDpValidate(formRef)
    await flushPromises()

    const result = validate()

    expect(result).toBe(false)
    expect(isValid.value).toBe(false)
    expect(form.querySelector('input').classList.contains(errorClass)).toBe(true)
    expect(window.dplan.notify.notify).toHaveBeenCalledWith('error', de.error.mandatoryFields.default)
    expect(window.dplan.notify.notify).toHaveBeenCalledTimes(1)
  })

  test('validate() notifies with fieldname and topic for an invalid field', async () => {
    const form = createForm(`
      <div data-dp-validate-topic="Kontakt">
        <input name="email" required value="" data-dp-validate-error-fieldname="E-Mail">
      </div>
    `)
    const formRef = ref(form)
    const { validate } = useDpValidate(formRef)
    await flushPromises()

    validate()

    const expectedMessage = de.error.mandatoryFields.intro + 'E-Mail (Kontakt)' + de.error.mandatoryFields.outro
    expect(window.dplan.notify.notify).toHaveBeenCalledWith('error', expectedMessage)
  })

  test('validate() notifies with the custom error message when data-dp-validate-error is set', async () => {
    const form = createForm('<input name="email" required value="" data-dp-validate-error="Custom Fehlertext">')
    const formRef = ref(form)
    const { validate } = useDpValidate(formRef)
    await flushPromises()

    validate()

    expect(window.dplan.notify.notify).toHaveBeenCalledWith('error', 'Custom Fehlertext')
    expect(window.dplan.notify.notify).toHaveBeenCalledTimes(1)
  })

  test('validate() deduplicates identical fieldname/topic combinations', async () => {
    const form = createForm(`
      <div data-dp-validate-topic="Kontakt">
        <input name="email" required value="" data-dp-validate-error-fieldname="E-Mail">
        <input name="emailConfirm" required value="" data-dp-validate-error-fieldname="E-Mail">
      </div>
    `)
    const formRef = ref(form)
    const { validate } = useDpValidate(formRef)
    await flushPromises()

    validate()

    const expectedMessage = de.error.mandatoryFields.intro + 'E-Mail (Kontakt)' + de.error.mandatoryFields.outro
    expect(window.dplan.notify.notify).toHaveBeenCalledWith('error', expectedMessage)
    expect(window.dplan.notify.notify).toHaveBeenCalledTimes(1)
  })

  test('assigns blur/focus handlers to inputs once the form is set', async () => {
    const form = createForm('<input name="email" required value="">')
    const formRef = ref(form)
    const { validate } = useDpValidate(formRef)
    await flushPromises()

    validate()
    const input = form.querySelector('input')
    expect(input.classList.contains(errorClass)).toBe(true)

    input.dispatchEvent(new Event('focus'))

    expect(input.classList.contains(errorClass)).toBe(false)
  })
})
