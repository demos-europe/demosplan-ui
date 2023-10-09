import { de } from '~/components/shared/translations'
/**
 * Return a translated hint on exact matching characters.
 * @param {Number}    currentLength Currently used character count
 * @param {*|String}  requiredLength Expected amount of characters
 * @return {*|string}
 */
const exactlengthHint = (currentLength, requiredLength) => {
  const reqLength = Number(requiredLength)

  return reqLength
    ? de.input.text.exactlength({
      requiredlength: requiredLength,
      cssClass: (currentLength === reqLength) ? 'color-status-progress-text' : 'color-status-failed-text',
      count: currentLength,
    })
    : ''
}

/**
 * Return a translated hint on maximum available characters.
 * @param {Number}    currentLength Currently used character count
 * @param {*|String}  maxlength     Max available characters
 * @return {*|string}
 */
const maxlengthHint = (currentLength, maxlength) => {
  /*
   * In cases with more than 50 characters available, the available characters should be highlighted with a different
   * color when dropping below 15. For less than 50 characters, only the remaining 3 chars are highlighted that way.
   */
  const errorThreshold = maxlength > 50 ? 15 : 3
  const max = Number(maxlength)

  return max
    ? de.input.text.maxlength({
      cssClass: (max - currentLength > errorThreshold) ? 'color-status-progress-text' : 'color-status-failed-text',
      count: max - currentLength,
      max
    })
    : ''
}

/**
 * Return a translated hint on minimum available characters.
 * @param {Number}    currentLength Currently used character count
 * @param {*|String}  minlength     Min available characters
 * @return {*|string}
 */
const minlengthHint = (currentLength, minlength) => {
  const min = Number(minlength)

  return min
    ? de.input.text.minlength({
      cssClass: (min <= currentLength) ? 'color-status-progress-text' : 'color-status-failed-text',
      count: min - currentLength,
      min: min,
    })
    : ''
}

export { exactlengthHint, maxlengthHint, minlengthHint }
