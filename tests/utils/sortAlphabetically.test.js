import sortAlphabetically from '~/utils/sortAlphabetically'

describe('sortAlphabetically', () => {
  const arrayOfStrings = [ 'copySpec', 'email2', 'showlist', 'allowedRoleIds' ]
  const sortedArrayOfStrings = [ 'allowedRoleIds', 'copySpec', 'email2', 'showlist' ]
  const reverseSortedArrayOfStrings = [ 'showlist', 'email2', 'copySpec', 'allowedRoleIds' ]
  const filteredUsersByFirstName =  [
    { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' },
    { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
    { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
  ]
  const users = [
    { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
    { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
    { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' },
  ]

  it('returns an unchanged array if an object does not contain the given property', () => {
    expect(sortAlphabetically(users, 'phone')).toEqual(users)
  })

  it('sorts an object by the property "firstName" in alphabetical order', () => {
    expect(sortAlphabetically(users, 'firstName')).toEqual(filteredUsersByFirstName)
  })

  it('sorts an object by the property "firstName" in reverse alphabetical order when the third "desc" parameter is provided', () => {
    const filteredUsersReverse =  [
      { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
      { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
      { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' },
    ]

    expect(sortAlphabetically(users, 'firstName', 'desc')).toEqual(filteredUsersReverse)
  })

  it('sorts an array of strings in alphabetical order by default', () => {
    expect(sortAlphabetically([...arrayOfStrings], '')).toEqual(sortedArrayOfStrings)
  })

  it('sorts an array of strings in alphabetical order when the third parameter "asc" is provided', () => {
    expect(sortAlphabetically([...arrayOfStrings], '', 'asc')).toEqual(sortedArrayOfStrings)
  })

  it('sorts an array of strings in reverse alphabetical order when the third parameter "desc" is provided', () => {
    expect(sortAlphabetically([...arrayOfStrings], '', 'desc')).toEqual(reverseSortedArrayOfStrings)
  })

  it('sorts an object by a dot-separated nested property', () => {
    const nested = [
      { id: 1, attributes: { title: 'Zaun' } },
      { id: 2, attributes: { title: 'Abwasser' } },
      { id: 3, attributes: { title: 'Muelltrennung' } },
    ]

    expect(sortAlphabetically(nested, 'attributes.title').map(item => item.id)).toEqual([2, 3, 1])
  })

  it('sorts an object by a three-level-deep dot-separated nested property', () => {
    const nested = [
      { id: 1, definition: { attributes: { name: 'Zaun' } } },
      { id: 2, definition: { attributes: { name: 'Abwasser' } } },
    ]

    expect(sortAlphabetically(nested, 'definition.attributes.name').map(item => item.id)).toEqual([2, 1])
  })

  it('ignores leading/trailing whitespace when sorting strings', () => {
    const withWhitespace = [' Grundtenor', 'Artenschutz', ' Inhaltliche Intention']

    expect(sortAlphabetically(withWhitespace, '')).toEqual(['Artenschutz', ' Grundtenor', ' Inhaltliche Intention'])
  })

  it('ignores leading/trailing whitespace when sorting objects by a property', () => {
    const withWhitespace = [
      { title: ' Grundtenor' },
      { title: 'Artenschutz' },
    ]

    expect(sortAlphabetically(withWhitespace, 'title').map(item => item.title)).toEqual(['Artenschutz', ' Grundtenor'])
  })

  it('returns an unchanged array of objects instead of throwing when sortBy is undefined', () => {
    expect(sortAlphabetically(users, undefined)).toEqual(users)
  })

  it('sorts objects with the given property before objects missing it, regardless of input order', () => {
    const mixed = [
      { id: 1, title: 'Zaun' },
      { id: 2 },
      { id: 3, title: 'Abwasser' },
    ]

    expect(sortAlphabetically(mixed, 'title').map(item => item.id)).toEqual([3, 1, 2])
  })

  it('sorts objects with the given property before objects missing it, even in "desc" direction', () => {
    const mixed = [
      { id: 1, title: 'Zaun' },
      { id: 2 },
      { id: 3, title: 'Abwasser' },
    ]

    expect(sortAlphabetically(mixed, 'title', 'desc').map(item => item.id)).toEqual([1, 3, 2])
  })
})
