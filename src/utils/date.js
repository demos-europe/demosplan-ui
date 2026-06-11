import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)

const DATE_FORMAT_SHORT = 'DD.MM.YYYY'
const DATE_FORMAT_LONG = 'DD.MM.YYYY, HH:mm [Uhr]'
const DATE_FORMAT_ISO_DATE = 'YYYY-MM-DD'

const formatDate = function (date, format = DATE_FORMAT_SHORT) {
  let d

  if (format === 'long') {
    format = DATE_FORMAT_LONG
  }

  /*
   * This assumes that values of type number are always unix seconds or milliseconds.
   * Stack overflow says unix timestamp in seconds will have 10 digits until 20.11.2286
   * so it is safe to check for > 10 to sort out milliseconds (which must be directly passed to `dayjs()`).
   */
  if (typeof date === 'number') {
    d = date.toString().length > 10 ? dayjs(date) : dayjs.unix(date)
  }

  if (typeof date === 'string' || date instanceof Date) {
    d = dayjs(date)
  }

  if (typeof d === 'undefined' || d === null) {
    return dayjs().format(format)
  }

  return d.format(format)
}

const reformatDateString = function (date, inputFormat = DATE_FORMAT_SHORT, outputFormat = DATE_FORMAT_ISO_DATE) {
  if (!date) {
    return ''
  }

  const parsedDate = dayjs(date, inputFormat, true)

  if (!parsedDate.isValid()) {
    return ''
  }

  return parsedDate.format(outputFormat)
}

const toDate = function (date, format = DATE_FORMAT_SHORT) {
  if (!date) {
    return null
  }

  if (date instanceof Date) {
    return Number.isNaN(date.getTime()) ? null : date
  }

  let parsedDate

  if (typeof date === 'string') {
    // First try strict parsing with the provided format
    parsedDate = dayjs(date, format, true)

    // Fall back to Day.js auto-detection (e.g. ISO dates)
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(date)
    }
  } else {
    // Handle timestamps and other supported input types
    parsedDate = dayjs(date)
  }

  return parsedDate.isValid() ? parsedDate.toDate() : null
}

export {
  DATE_FORMAT_LONG,
  formatDate,
  reformatDateString,
  toDate,
}
