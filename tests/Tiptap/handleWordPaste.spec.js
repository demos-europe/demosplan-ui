import { test300, test365, testMso } from '../__mocks__/wordContentSnippets.mock'
import { handleWordPaste } from '~/components/DpEditor/libs/handleWordPaste'

describe.each([testMso, test365, test300])('handleWordPaste - a util to handle pasting lists from word to tiptap', snippet => {
  test('convert word clipboard to readable and semantic correct html (for lists)', () => {
    expect(handleWordPaste(snippet)).toMatchSnapshot()
  })
})
