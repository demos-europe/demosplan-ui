/**
 * Tests if "privacy.resistFingerprinting" is enabled.
 *
 * "privacy.resistFingerprinting" is a firefox browser setting which,
 * if enabled, limits some browser APIs including reading the canvas.
 * The callback will receive a param which is true if the setting is enabled.
 *
 * Usage example in a Vue component:
 *    mounted () {
 *      resistFingerprintingDuckTest((isEnabled) => {
 *        if (isEnabled) {
 *          // Warn user about enabled "privacy.resistFingerprinting" setting
 *        }
 *      })
 *   }
 */
export default function resistFingerprintingDuckTest (callback) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Draw something on the canvas
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillRect(0, 0, 10, 10)

  // Convert canvas to data URL
  const dataUrl = canvas.toDataURL()

  // Check if the produced data URL corresponds to the expected black square
  const image = new Image()

  image.onload = function () {
    // Draw the image onto a new canvas to read the pixel values
    const testCanvas = document.createElement('canvas')
    const testCtx = testCanvas.getContext('2d')
    testCanvas.width = image.width
    testCanvas.height = image.height
    testCtx.drawImage(image, 0, 0)

    // Check the first pixel
    const pixelData = testCtx.getImageData(0, 0, 1, 1).data

    // If the pixel is black, we assume that resistFingerprinting is disabled
    const resistFingerprintingEnabled = !(pixelData[0] === 0 && pixelData[1] === 0 && pixelData[2] === 0)

    callback(resistFingerprintingEnabled)
  }

  image.src = dataUrl
}
