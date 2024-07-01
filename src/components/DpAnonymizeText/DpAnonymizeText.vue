<template>
  <div class="border">
    test
<!--    <bubble-menu-->
<!--      v-if="editor"-->
<!--      :editor="editor"-->
<!--      :tippy-options="{ duration: 100 }">-->
<!--      <div class="editor-menububble__wrapper is-active bottom-0">-->
<!--        <button-->
<!--          v-if="editor.isActive('anonymize')"-->
<!--          class="editor-menububble__button whitespace-nowrap"-->
<!--          @click="editor.chain().focus().toggleUnanonymize().run()">-->
<!--          {{ translations.unanonymize }}-->
<!--        </button>-->
<!--        <button-->
<!--          v-else-->
<!--          class="editor-menububble__button whitespace-nowrap"-->
<!--          @click="editor.chain().focus().toggleAnonymize().run()">-->
<!--          {{ translations.anonymize }}-->
<!--        </button>-->
<!--      </div>-->
<!--    </bubble-menu>-->
<!--    <editor-content-->
<!--      autocomplete="off"-->
<!--      autocorrect="off"-->
<!--      autocapitalize="off"-->
<!--      spellcheck="false"-->
<!--      ref="editorContent"-->
<!--      class="editor-content"-->
<!--      :editor="editor" />-->
  </div>
</template>

<script>
import {
  Anonymize,
  PreventEditing,
  Obscure,
  UnAnonymize
} from '../DpEditor/libs/customExtensions'
import {
  Bold,
  BulletList,
  Document,
  HardBreak,
  Heading,
  History,
  Italic,
  Link,
  OrderedList,
  Paragraph,
  Text,
  Underline,
  ListItem
} from '../DpEditor/libs/tiptapExtensions'
import {
  BubbleMenu,
//   Editor, // Wrapper for prosemirror state
//   EditorContent, // Renderless content element
} from '@tiptap/vue-3'
import { de } from '../shared/translations'

export default {
  name: 'DpAnonymizeText',

  // components: {
  //   BubbleMenu,
  //   EditorContent
  // },
  //
  // props: {
  //   value: {
  //     type: String,
  //     required: true
  //   }
  // },
  //
  // data () {
  //   return {
  //     editor: null,
  //     translations: {
  //       anonymize: de.anonymization.mark,
  //       unanonymize: de.anonymization.unmark
  //     }
  //   }
  // },
  //
  // methods: {
  //   setValue () {
  //     let currentValue = this.editor.getHTML()
  //
  //     // 1. look if there are anonymized segements, which are tagged to un-anonymize
  //     const unanonymize = /<span[^>]*?title="(.*?)"([^>]*?)class="anonymize-me"([^>]*?)>([^<]*?)<span class="unanonymized">([^<]*?)<\/span>([^<]*?)<\/span>/gm
  //     currentValue = currentValue.replace(unanonymize, (match, p1) => p1.replaceAll('&quot;', '"'))
  //
  //     // 2. remove unanonymize tags that are left over because the selection was wider than the anonymized element
  //     const unanonymizeCleaner = /<span class="unanonymized">(.*?)<\/span>/gm
  //     currentValue = currentValue.replace(unanonymizeCleaner, '$1')
  //
  //     // 3. anonymize text - leave the text in the title, that it can be restored again.
  //     const anonymize = /<span class="anonymize-me">(.*?)<\/span>/gm
  //     currentValue = currentValue.replace(anonymize, (match, p1) => ('<span title="' + p1.replaceAll('"', '&quot;') + '" class="anonymize-me">***</span>'))
  //
  //     // Update text
  //     this.editor.commands.setContent(currentValue)
  //     this.$emit('change', currentValue)
  //   }
  // },
  //
  // mounted () {
  //   this.editor = new Editor({
  //     content: this.value,
  //     editable: true,
  //     enableInputRules: false,
  //     enablePasteRules: false,
  //     extensions: [
  //       Anonymize,
  //       Bold,
  //       BulletList,
  //       Document,
  //       Heading.configure({ levels: [1,2,3] }),
  //       HardBreak,
  //       History,
  //       Italic,
  //       Link,
  //       ListItem,
  //       Obscure,
  //       OrderedList,
  //       Paragraph,
  //       PreventEditing,
  //       Text,
  //       UnAnonymize,
  //       Underline
  //     ],
  //     onUpdate: () => {
  //       this.setValue()
  //     }
  //   })
  // }
}
</script>
