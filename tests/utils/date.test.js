import { formatDate, reformatDateString, toDate } from '~/utils/date'
import dayjs from 'dayjs'

describe('date', () => {
  const currentDate = dayjs().format('DD.MM.YYYY')
  let dateFormat
  const date = {
    day: 25,
    firstDay: '0' + 1,
    month: 12,
    time: {
      opt1: '13:15:40.000000',
      opt2: 'T12:15:40.000Z',
    },
    year: 2019,
  }
  const dateTypes = {
    exactDate: new Date(`${date.year}-${date.month}-${date.day}${date.time.opt2}`),
    timestampDate: 1577276140000,
    IsoDate: `${date.year}-${date.month}-${date.day} ${date.time.opt1}`,
  }
  const transformedDates = {
    long:  `${date.day}.${date.month}.${date.year}, 13:15 Uhr`,
    short1: `${date.day}.${date.month}.${date.year}`,
    short2: `${date.firstDay}.${date.month}.${date.year}`,
  }

  it('sets the short date format as a default value', () => {
    expect(formatDate(dateTypes.IsoDate)).toEqual(transformedDates.short1)
    expect(formatDate(dateTypes.timestampDate)).toEqual(transformedDates.short1)
    expect(formatDate(dateTypes.exactDate)).toEqual(transformedDates.short1)
  })

  it('sets the long date format if the second parameter "long" is provided', () => {
    expect(formatDate(dateTypes.IsoDate, 'long')).toEqual(transformedDates.long)
    expect(formatDate(dateTypes.timestampDate, 'long')).toEqual(transformedDates.long)
    expect(formatDate(dateTypes.exactDate, 'long')).toEqual(transformedDates.long)
  })

  it('transforms number to a string using \'DD.MM.YYYY\' format', () => {
    expect(formatDate(dateTypes.timestampDate)).toEqual(transformedDates.short1)
  })

  it('sets the \'DD.MM.YYYY\' date format if the provided date type is an instanceof Date', () => {
    expect(formatDate(dateTypes.exactDate)).toEqual(transformedDates.short1)
  })

  it('sets the \'DD.MM.YYYY\' date format if the provided date type is a string', () => {
    expect(formatDate(dateTypes.IsoDate)).toEqual(transformedDates.short1)
  })

  it('sets the current date if the provided date type is a null or undefined', () => {
    expect(formatDate(null)).toEqual(currentDate)
    expect(formatDate(undefined)).toEqual(currentDate)
  })

  it('transforms valid ISO 8601 date format types to DD.MM.YYYY format', () => {
    dateFormat = {
      date1: date.year + '-' + date.month + '-' + date.day,
      date2: date.year + '-' + date.month,
      date3: date.year + '/' + date.month,
    }

    expect(formatDate(dateFormat.date1)).toEqual(transformedDates.short1)
    expect(formatDate(dateFormat.date2)).toEqual(transformedDates.short2)
    expect(formatDate(dateFormat.date3)).toEqual(transformedDates.short2)
  })

  it('transforms string to a Date', () => {
    expect(toDate(dateTypes.IsoDate)).toEqual(dateTypes.exactDate)
  })

  it('transforms number to a Date', () => {
    expect(toDate(dateTypes.timestampDate)).toEqual(dateTypes.exactDate)
  })

  it('transforms valid ISO 8601 date format type to a Date', () => {
    dateFormat = {
      date: date.year + '/' + date.month + '/' + date.day + date.time.opt1,
    }

    expect(toDate(dateFormat.date)).toEqual(dateTypes.exactDate)
  })

  it('returns null for invalid Date object', () => {
    const invalidDate = new Date('invalid')

    expect(toDate(invalidDate)).toBeNull()
  })

  it('returns null for null input', () => {
    expect(toDate(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(toDate(undefined)).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(toDate('')).toBeNull()
  })

  it('returns null for invalid date string', () => {
    expect(toDate('not-a-date')).toBeNull()
    expect(toDate('32.13.2019')).toBeNull()
  })

  it('parses string with custom format when format parameter is provided', () => {
    const result = toDate(transformedDates.short1, 'DD.MM.YYYY')

    expect(result.getDate()).toEqual(dateTypes.exactDate.getDate())
    expect(result.getMonth()).toEqual(dateTypes.exactDate.getMonth())
    expect(result.getFullYear()).toEqual(dateTypes.exactDate.getFullYear())
  })

  it('falls back to auto-detection when string does not match provided format', () => {
    const isoFormatDate = `${date.year}-${date.month}-${date.day}`
    const result = toDate(isoFormatDate, 'DD.MM.YYYY')

    expect(result.getDate()).toEqual(dateTypes.exactDate.getDate())
    expect(result.getMonth()).toEqual(dateTypes.exactDate.getMonth())
    expect(result.getFullYear()).toEqual(dateTypes.exactDate.getFullYear())
  })

  it('handles different custom date formats', () => {
    const usFormat = `${date.month}/${date.day}/${date.year}`
    const isoFormat = `${date.year}-${date.month}-${date.day}`

    const result1 = toDate(usFormat, 'MM/DD/YYYY')
    const result2 = toDate(isoFormat, 'YYYY-MM-DD')

    expect(result1.getDate()).toEqual(dateTypes.exactDate.getDate())
    expect(result1.getMonth()).toEqual(dateTypes.exactDate.getMonth())
    expect(result1.getFullYear()).toEqual(dateTypes.exactDate.getFullYear())

    expect(result2.getDate()).toEqual(dateTypes.exactDate.getDate())
    expect(result2.getMonth()).toEqual(dateTypes.exactDate.getMonth())
    expect(result2.getFullYear()).toEqual(dateTypes.exactDate.getFullYear())
  })

  it('handles unix timestamps in milliseconds', () => {
    const result = toDate(dateTypes.timestampDate)

    expect(result).toEqual(dateTypes.exactDate)
  })

  it('reformats date from DD.MM.YYYY to DD.MM.YYYY by default', () => {
    expect(reformatDateString('25.12.2019')).toEqual('25.12.2019')
  })

  it('reformats date from DD.MM.YYYY to custom output format', () => {
    expect(reformatDateString('25.12.2019', 'DD.MM.YYYY', 'YYYY-MM-DD')).toEqual('2019-12-25')
    expect(reformatDateString('25.12.2019', 'DD.MM.YYYY', 'MM/DD/YYYY')).toEqual('12/25/2019')
  })

  it('reformats date from custom input format to DD.MM.YYYY', () => {
    expect(reformatDateString('2019-12-25', 'YYYY-MM-DD')).toEqual('25.12.2019')
    expect(reformatDateString('12/25/2019', 'MM/DD/YYYY')).toEqual('25.12.2019')
  })

  it('reformats date from custom input format to custom output format', () => {
    expect(reformatDateString('2019-12-25', 'YYYY-MM-DD', 'MM/DD/YYYY')).toEqual('12/25/2019')
    expect(reformatDateString('12/25/2019', 'MM/DD/YYYY', 'YYYY-MM-DD')).toEqual('2019-12-25')
  })

  it('returns empty string for null, undefined, or empty date', () => {
    expect(reformatDateString(null)).toEqual('')
    expect(reformatDateString(undefined)).toEqual('')
    expect(reformatDateString('')).toEqual('')
  })

  it('returns empty string for invalid date format', () => {
    expect(reformatDateString('invalid-date')).toEqual('')
    expect(reformatDateString('32.13.2019')).toEqual('')
    expect(reformatDateString('25.12.2019', 'YYYY-MM-DD')).toEqual('')
  })

  it('handles dates with single digit day and month', () => {
    expect(reformatDateString('01.05.2019', 'DD.MM.YYYY', 'YYYY-MM-DD')).toEqual('2019-05-01')
    expect(reformatDateString('5.3.2019', 'D.M.YYYY', 'DD.MM.YYYY')).toEqual('05.03.2019')
  })
})
