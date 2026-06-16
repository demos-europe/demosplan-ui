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
   * Assume a querySelector is passed when a `.`, `#` or `[` either starts a token
   * (string start or after whitespace, e.g. `.foo`, `#id`, `[data-x]`) or attaches
   * directly to a type selector (a letter, e.g. `div.foo`, `a[href]`). In that case
   * only the class selector parts are prefixed.
   * The letter requirement is what tells these apart from Tailwind utilities, which always
   * have a `-` or a digit before `.`/`[` (e.g. `mt-[2px]`, `grid-cols-[1fr]`, `mb-0.5`) — those
   * must stay in classList mode, otherwise they would be left unprefixed in prefixed builds.
   */
  const checkClassList = /(?:^|\s)[.#[]|[a-zA-Z][.[]/

  if (checkClassList.test(classList)) {
    prefixed = classList.replace(/(\.)(\S+)/gi, (cl, m1, m2) => `.${prefix}${m2}`)
  } else {
    prefixed = classList.replace(/(\S+)/gi, cl => `${prefix}${cl}`)
  }

  return prefixed
}
