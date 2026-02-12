export default function validatePostalCode (postalCode) {
  const postalRegex = /^\d{4,5}$/

  return postalRegex.test(postalCode)
}
