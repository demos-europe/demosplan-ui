/**
 * Prefix css classes with a parameter given from the project settings
 *
 * @param {String}  classList or querySelector
 *
 * @return {String} prefixed classList
 */
export default function prefixClass (classList = '') {
  let prefix = ''
  if (typeof dplan !== 'undefined' && dplan.settings && dplan.settings.publicCSSClassPrefix) {
    prefix = dplan.settings.publicCSSClassPrefix
  }

  let prefixed = ''

  // Don't try to do something if the result should not change
  if (prefix === '') {
    return classList
  }

  // Throw error if the type is wrong
  if (typeof classList !== 'string') {
    throw new Error('classList is an' + typeof classList + '. should be String.', classList)
  }

  /*
   * Assuming that a querySelector is passed when a token *starts* with `.`, `#` or `[`
   * (at the string start or right after whitespace), only the class selector parts are prefixed.
   * Matching these characters only at a token boundary avoids misreading Tailwind utilities that
   * legitimately contain them mid-token (e.g. `mt-[2px]`, `grid-cols-[1fr]`, `mb-0.5`) as selectors,
   * which would otherwise leave them unprefixed in prefixed builds.
   */
  const checkClassList = /(?:^|\s)[.#[]/
  if (checkClassList.test(classList)) {
    prefixed = classList.replace(/(\.)(\S+)/gi, (cl, m1, m2) => `.${prefix}${m2}`)
  } else {
    prefixed = classList.replace(/(\S+)/gi, cl => `${prefix}${cl}`)
  }

  return prefixed
}
