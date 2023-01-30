import sortAlphabetically from '../../utils/sortAlphabetically'

describe('sortAlphabetically', () => {
    const arrayOfString = [ 'copySpec', 'email2', 'showlist', 'allowedRoleIds' ]
    const filteredUsersByFirstName =  [
        { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' },
        { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
        { id: 1067, firstName: 'Torsten', lastName: 'Wulf' }
    ]
    const users = [
        { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
        { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
        { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' }
    ]

    it('returns an unchanged array if an object does not contain the given property', () => {
        expect(sortAlphabetically(users, 'phone')).toEqual(users)
    })

    it('sorts an object by the property "firstName" in alphabetical order', () => {
        expect(sortAlphabetically(users, 'firstName')).toEqual(filteredUsersByFirstName)
    })

    it('sorts an object in alphabetical order by default', () => {
        expect(sortAlphabetically(users, 'firstName')).toEqual(filteredUsersByFirstName)
    })

    it('sorts an object by the property "firstName" in reverse alphabetical order when the third "desc" parameter is provided', () => {
        const filteredUsersReverse =  [
            { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
            { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
            { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' }
        ]

        expect(sortAlphabetically(users, 'firstName', 'desc')).toEqual(filteredUsersReverse)
    })

    it('sorts an array of string in alphabetical order by default', () => {
        const sortedArrayOfString = arrayOfString.sort()

        expect(sortAlphabetically(arrayOfString, '')).toEqual(sortedArrayOfString)
    })

    it('sorts an array of string in alphabetical order when the third parameter "asc" is provided', () => {
        const sortedArrayOfString = arrayOfString.sort()

        expect(sortAlphabetically(arrayOfString, '', 'asc')).toEqual(sortedArrayOfString)
    })

    it('sorts an array of string in reverse alphabetical order when the third parameter "desc" is provided', () => {
        const sortedArrayOfString = arrayOfString.sort().reverse()

        expect(sortAlphabetically(arrayOfString, '', 'desc')).toEqual(sortedArrayOfString)
    })
})