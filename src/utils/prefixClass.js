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
   * Assume a querySelector is passed when a `.`, `#` or `[` either starts a token (string start or after whitespace,
   * e.g. `.foo`, `#id`, `[data-x]`) or attaches directly to a type selector, i.e. follows a letter (e.g. `div.foo`,
   * `div#main`, `a[href]`). In that case only the class selector parts are prefixed.
   * The "follows a letter" rule is what tells selectors apart from tailwind utility classes: a tailwind utility class
   * never has a letter immediately before `.`/`#`/`[` - it's always a `-` or a digit (`mt-[2px]`, `grid-cols-[1fr]`,
   * `mb-0.5`), or `[` itself for hex colors (`bg-[#fff]`).
   *
   * Known limitation: a token that *starts* with `[` is always treated as a selector, so tailwind arbitrary variants/properties
   * (`[&>svg]:size-4`, `[mask-type:luminance]`) are not prefixed. They are indistinguishable from a real attribute
   * selector by position alone and are currently not supported by prefixClass
   */
  const checkClassList = /(?:^|\s)[.#[]|[a-zA-Z][.#[]/

  if (checkClassList.test(classList)) {
    prefixed = classList.replace(/(\.)(\S+)/gi, (cl, m1, m2) => `.${prefix}${m2}`)
  } else {
    prefixed = classList.replace(/(\S+)/gi, cl => `${prefix}${cl}`)
  }

  return prefixed
}
