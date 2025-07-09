import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
// THIS IS A WORKAROUND.
// In our setup per default the cjs-file is used. That file for some reason has a problem to resolve an internal dependency (Suggestion) properly.
import { Mention } from '../../../../node_modules/@tiptap/extension-mention/dist/index.js'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'

export {
  Bold,
  BulletList,
  Document,
  HardBreak,
  Heading,
  History,
  Italic,
  Link,
  ListItem,
  Mention,
  OrderedList,
  Paragraph,
  Strike,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  Underline
}
