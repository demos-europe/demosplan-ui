import { capitalizeFirstLetter } from '~/utils/formatString'

describe('capitalizeFirstLetter', () => {
  test('should capitalize the first letter of a single word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  test('should capitalize the first letter of a sentence', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world')
  })

  test('should return undefined for non string input', () => {
    expect(capitalizeFirstLetter(123)).toBeUndefined()
    expect(capitalizeFirstLetter(null)).toBeUndefined()
    expect(capitalizeFirstLetter(undefined)).toBeUndefined()
    expect(capitalizeFirstLetter({})).toBeUndefined()
  })

  test('should handle empty strings', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  test('should not change an already capitalized string', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello')
  })
})
