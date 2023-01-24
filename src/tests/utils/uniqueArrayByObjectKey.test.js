import uniqueArrayByObjectKey from '../../utils/uniqueArrayByObjectKey'

describe('uniqueArrayByObjectKey', () => {
    const arrayDuplicateValues = [
        { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
        { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
        { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
        { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
        { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' }
    ]
    const uniqueArray = [
        { id: 1067, firstName: 'Torsten', lastName: 'Wulf' },
        { id: 1035, firstName: 'Katharina', lastName: 'Maier' },
        { id: 1031, firstName: 'Daniel', lastName: 'Ostermann' }
    ]

    it('filters array of objects by the parameter "id" to hold only unique values', () => {
        expect(uniqueArrayByObjectKey(arrayDuplicateValues, 'id')).toEqual(uniqueArray)
    })

    it('returns unchanged array if the object does not contains the property', () => {
        expect(uniqueArrayByObjectKey(arrayDuplicateValues, 'incorrectProperty')).toEqual(arrayDuplicateValues)
    })

    it('returns unchanged array if the property is null or undefined', () => {
        expect(uniqueArrayByObjectKey(arrayDuplicateValues, undefined)).toEqual(arrayDuplicateValues)
        expect(uniqueArrayByObjectKey(arrayDuplicateValues, null)).toEqual(arrayDuplicateValues)
    })
})