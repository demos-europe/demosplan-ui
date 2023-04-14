import { formatBytes } from '../../index';

describe('formatBytes', () => {
    const bytes = {
        bytes1: 1234,
        bytes2: 1,
        bytes3: 100005464,
        bytes4: 10000546456
    }
    const decimalCounts = {
        decimalCount1: 3,
        decimalCount2: 4,
        decimalCount3: -1,
        decimalCount4: 0
    }
    const finalBytes = {
        finalBytes1: 1.205,
        finalBytes2: 1.2051,
        finalBytes3: 1,
        finalBytes4: 95.373,
        finalBytes5: 9.314
    }

    it('transforms the bytes into a size with the same count of decimals like in the argument of the function', () => {
        expect(formatBytes(bytes.bytes1, decimalCounts.decimalCount1)).toBe(finalBytes.finalBytes1 + ' KB')
        expect(formatBytes(bytes.bytes1, decimalCounts.decimalCount2)).toBe(finalBytes.finalBytes2 + ' KB')
    })

    it('transforms the bytes without any decimals when the decimal count is smaller or even 0', () => {
        expect(formatBytes(bytes.bytes1, decimalCounts.decimalCount3)).toBe(finalBytes.finalBytes3 + ' KB')
        expect(formatBytes(bytes.bytes1, decimalCounts.decimalCount4)).toBe(finalBytes.finalBytes3 + ' KB')
    })

    it('transforms a small amount of bytes into Bytes', () => {
        expect(formatBytes(bytes.bytes2, decimalCounts.decimalCount1)).toBe(finalBytes.finalBytes3 + ' Bytes')
    })

    it('transforms a bigger amount of bytes into Megabytes', () => {
        expect(formatBytes(bytes.bytes3, decimalCounts.decimalCount1)).toBe(finalBytes.finalBytes4 + ' MB')
    })

    it('transforms a huge amount of bytes into Gigabytes', () => {
        expect(formatBytes(bytes.bytes4, decimalCounts.decimalCount1)).toBe(finalBytes.finalBytes5 + ' GB')
    })
})