<template>
  <div class="border">
    <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }">
      <div class="editor-menububble__wrapper">
        <button
          v-if="editor.isActive('anonymize')"
          class="editor-menububble__button is-active"
          @click="editor.chain().focus().toggleUnanonymize().run()">
          {{ Translator.trans('statement.anonymize.unmark') }}
        </button>
        <button
          v-else
          class="editor-menububble__button"
          @click="editor.chain().focus().toggleAnonymize().run()">
          {{ Translator.trans('statement.anonymize.mark') }}
        </button>
      </div>
    </bubble-menu>
    <editor-content
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      ref="editorContent"
      class="editor-content"
      :editor="editor" />
  </div>
</template>

<script>
import {
  BubbleMenu,
  Editor, // Wrapper for prosemirror state
  EditorContent, // Renderless content element
} from '@tiptap/vue-2'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import ListItem from '@tiptap/extension-list-item'
import Anonymize from './DpEditor/libs/editorAnonymize'
import Obscure from './DpEditor/libs/editorObscure'
import UnAnonymize from './DpEditor/libs/editorUnAnonymize'
import eventPreventer from './DpEditor/libs/preventEditing'

export default {
  name: 'DpAnonymizeText',

  components: {
    BubbleMenu,
    EditorContent
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      editor: null
    }
  },

  methods: {
    setValue () {
      let currentValue = this.editor.getHTML()

      // 1. look if there are anonymized segements, which are tagged to un-anonymize
      const unanonymize = /<span[^>]*?title="(.*?)"([^>]*?)class="anonymize-me"([^>]*?)>([^<]*?)<span class="unanonymized">([^<]*?)<\/span>([^<]*?)<\/span>/gm
      currentValue = currentValue.replace(unanonymize, (match, p1) => p1.replaceAll('&quot;', '"'))

      // 2. remove unanonymize tags that are left over because the selection was wider than the anonymized element
      const unanonymizeCleaner = /<span class="unanonymized">(.*?)<\/span>/gm
      currentValue = currentValue.replace(unanonymizeCleaner, '$1')

      // 3. anonymize text - leave the text in the title, that it can be restored again.
      const anonymize = /<span class="anonymize-me">(.*?)<\/span>/gm
      currentValue = currentValue.replace(anonymize, (match, p1) => ('<span title="' + p1.replaceAll('"', '&quot;') + '" class="anonymize-me">***</span>'))

      // Update text
      this.editor.commands.setContent(currentValue)
      this.$emit('change', currentValue)
    }
  },

  mounted () {
    this.editor = new Editor({
      content: this.value,
      editable: true,
      enableInputRules: false,
      enablePasteRules: false,
      extensions: [
        Anonymize,
        Bold,
        BulletList,
        Document,
        eventPreventer,
        Heading.configure({ levels: [1,2,3] }),
        HardBreak,
        History,
        Italic,
        Link,
        ListItem,
        Obscure,
        OrderedList,
        Paragraph,
        Text,
        UnAnonymize,
        Underline
      ],
      onUpdate: () => {
        this.setValue()
      }
    })
  }
}
</script>
