import deepMerge from '../../utils/deepMerge'

let mergedTarget
let source = {
    autoSuggest: {},
    controls: [],
    hideDefaultLayer: true,
    procedureExtent: false
}
let target = {
    autoSuggest: {
        enabled: true,
        serviceUrlPath: 'test-path1'
    },
    controls: ['contr1', 'contr2'],
    hideDefaultLayer: false,
    procedureExtent: false
}

describe.each([
    { wrongType: 'test' },
    { wrongType: 1234 },
    { wrongType: Array },
    { wrongType: null },
    { wrongType: undefined },
    { wrongType: true }
]) ('checks the incorrect data type', ({ wrongType }) => {
    it(`returns a second parameter "source" when the first parameter "target" has a ${wrongType} type`, () => {
        expect(deepMerge(wrongType, source)).toBe(source)
    })

    it(`returns a second parameter "source" when it has a ${wrongType} type`, () => {
        expect(deepMerge(target, wrongType)).toBe(wrongType)
    })
})

describe('deepMerge', () => {
    it('merges properties of two objects (changes a value of the "hideDefaultLayer" property to true)', () => {
        mergedTarget = {
            hideDefaultLayer: true,
            procedureExtent: false,
            controls: ['contr1', 'contr2'],
            autoSuggest: {
                enabled: true,
                serviceUrlPath: 'test-path1'
            }
        }

        expect(deepMerge(target, source)).toEqual(mergedTarget)
    })

    it('merges properties of two objects (merges "controls" arrays inside an Object)', () => {
        mergedTarget = {
            hideDefaultLayer: false,
            procedureExtent: false,
            controls: ['contr1', 'contr2', 'contr3'],
            autoSuggest: {
                enabled: true,
                serviceUrlPath: 'test-path1'
            }
        }
        source = {
            controls: ['contr3']
        }
        target = {
            hideDefaultLayer: false,
            procedureExtent: false,
            controls: ['contr1', 'contr2'],
            autoSuggest: {
                enabled: true,
                serviceUrlPath: 'test-path1'
            }
        }

        expect(deepMerge(target, source)).toEqual(mergedTarget)
    })

    it('merges properties of two objects (merges "autoSuggest" Objects inside an Object)', () => {
        mergedTarget = {
            hideDefaultLayer: false,
            procedureExtent: false,
            controls: ['contr1', 'contr2'],
            autoSuggest: {
                enabled: false,
                serviceUrlPath: 'test-path2'
            }
        }
        source = {
            autoSuggest: {
                enabled: false,
                serviceUrlPath: 'test-path2'
            }
        }
        target = {
            hideDefaultLayer: false,
            procedureExtent: false,
            controls: ['contr1', 'contr2'],
            autoSuggest: {
                enabled: true,
                serviceUrlPath: 'test-path1'
            }
        }

        expect(deepMerge(target, source)).toEqual(mergedTarget)
    })
})

