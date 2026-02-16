export default function validatePostalCode (postalCode) {
  const postalRegex = /^\d{5}$/

  return postalRegex.test(postalCode)
}
