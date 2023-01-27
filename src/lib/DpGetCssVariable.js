/**
 * Get the value of a css custom property, if supported by the browser.
 */
export default function getCssVariable (variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName)
}
