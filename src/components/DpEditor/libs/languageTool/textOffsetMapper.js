export function buildTextSegments (doc) {
  const textSegments = []
  let plainText = ''
  let isFirstBlock = true

  doc.descendants(function (node, pos) {
    if (node.isText) {
      const text = node.text || ''

      if (text.length > 0) {
        const plainStart = plainText.length

        textSegments.push({
          // Position in plain text
          plainStart: plainStart,
          plainEnd: plainStart + text.length,
          // Position in ProseMirror
          pmFrom: pos,
          pmTo: pos + text.length,
        })

        plainText += text
      }
    } else if (node.isBlock) {
      // Add newline between block nodes (paragraphs)
      if (!isFirstBlock && node.type.name === 'paragraph' && plainText.length > 0) {
        plainText += '\n'
      }

      if (node.type.name === 'paragraph') {
        isFirstBlock = false
      }
    }
  })

  return { textSegments, plainText }
}

/**
 * Converts a plain text position (from LanguageTool) to a ProseMirror document position.
 *
 * Example: Plain text "Hello\nWorld" position 7 → ProseMirror position 9
 * (Different because ProseMirror includes structural nodes like doc/paragraph in position counting)
 *
 * @param {Array} textSegments - Mapping created by buildTextSegments()
 * @param {number} offset - Position in plain text
 * @param {boolean} isEnd - Whether this offset represents the end of a text range.
 * @returns {number|null} ProseMirror position, or null if not found
 */
export function plainOffsetToPmPos(textSegments, offset, isEnd = false) {
  for (const textSegment of textSegments) {
    const isInRange = isEnd
      ? offset >= textSegment.plainStart && offset <= textSegment.plainEnd
      : offset >= textSegment.plainStart && offset < textSegment.plainEnd

    if (isInRange) {
      return textSegment.pmFrom + (offset - textSegment.plainStart)
    }
  }

  return null
}
