export function buildTextSegments(doc) {
  const segments = []
  let plainText = ''
  let isFirstBlock = true

  doc.descendants(function (node, pos) {
    if (node.isText) {
      const text = node.text || ''
      const length = text.length

      if (length > 0) {
        const plainStart = plainText.length

        segments.push({
          plainStart: plainStart,
          plainEnd: plainStart + length,
          pmFrom: pos,
          pmTo: pos + length,
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

  return { segments, plainText }
}

export function plainOffsetToPmPos(segments, offset) {
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]

    if (offset >= segment.plainStart && offset <= segment.plainEnd) {
      return segment.pmFrom + (offset - segment.plainStart)
    }
  }

  return null
}
