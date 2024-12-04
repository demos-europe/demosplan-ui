<template>
  <div class="o-form__control-tiptap">
    <div
      v-if="maxlength !== 0"
      :class="prefixClass('lbl__hint')"
      v-cleanhtml="counterText" />
    <dp-link-modal
      v-if="toolbar.linkButton"
      ref="linkModal"
      @insert="insertUrl" />
    <dp-upload-modal
      v-if="toolbar.imageButton && tusEndpoint"
      :basic-auth="basicAuth"
      ref="uploadModal"
      :get-file-by-hash="routes.getFileByHash"
      :tus-endpoint="tusEndpoint"
      @insert-image="insertImage"
      @add-alt="addAltTextToImage"
      @close="resetEditingImage" />
    <slot
      name="modal"
      :appendText="appendText"
      :handleInsertText="handleInsertText" />
    <div
      v-if="editor"
      :class="prefixClass('row tiptap')">
      <div :class="prefixClass('col')">
        <div :class="[isFullscreen ? 'fullscreen': '', prefixClass('editor')]">
          <div :class="[readonly ? prefixClass('readonly'): '', prefixClass('menubar')]">
            <!-- Cut -->
            <button
              :aria-label="translations.cut"
              :class="prefixClass('menubar__button')"
              data-cy="editor:cut"
              :disabled="readonly"
              type="button"
              @click="cut"
              v-tooltip="translations.cut">
              <i
                :class="prefixClass('fa fa-scissors')"
                aria-hidden="true" />
            </button>
            &#10072;
            <!-- Undo -->
            <button
              :aria-label="translations.undo"
              :class="prefixClass('menubar__button')"
              data-cy="editor:undo"
              :disabled="readonly"
              type="button"
              @click="editor.chain().focus().undo().run()"
              v-tooltip="translations.undo">
              <i
                :class="prefixClass('fa fa-reply')"
                aria-hidden="true" />
            </button>
            <!-- Redo -->
            <button
              :aria-label="translations.redo"
              :class="prefixClass('menubar__button')"
              data-cy="editor:redo"
              :disabled="readonly"
              type="button"
              @click="editor.chain().focus().redo().run()"
              v-tooltip="translations.redo">
              <i
                :class="prefixClass('fa fa-share')"
                aria-hidden="true" />
            </button>
            <template v-if="toolbar.textDecoration">
              &#10072;
              <!-- Bold -->

              <button
                :aria-label="translations.bold"
                :class="[editor.isActive('bold') ? prefixClass('is-active'): '', prefixClass('menubar__button')]"
                data-cy="editor:bold"
                :disabled="readonly"
                type="button"
                @click="editor.chain().focus().toggleBold().run()"
                v-tooltip="translations.bold">
                <i
                  :class="prefixClass('fa fa-bold')"
                  aria-hidden="true" />
              </button>

              <!-- Italic -->
              <button
                :aria-label="translations.italic"
                :class="[editor.isActive('italic') ? prefixClass('is-active') : '', prefixClass('menubar__button') ]"
                data-cy="editor:italic"
                :disabled="readonly"
                type="button"
                @click="editor.chain().focus().toggleItalic().run()"
                v-tooltip="translations.italic">
                <i
                  :class="prefixClass('fa fa-italic')"
                  aria-hidden="true" />
              </button>
              <!-- Underline -->
              <button
                :aria-label="translations.underline"
                :class="[editor.isActive('underline') ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
                data-cy="editor:underline"
                :disabled="readonly"
                type="button"
                @click="editor.chain().focus().toggleUnderline().run()"
                v-tooltip="translations.underline">
                <i
                  :class="prefixClass('fa fa-underline')"
                  aria-hidden="true" />
              </button>
            </template>
            <!-- Strike through -->
            <button
              v-if="toolbar.strikethrough"
              :aria-label="translations.strikethrough"
              :class="[editor.isActive('strike') ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
              data-cy="editor:strikethrough"
              :disabled="readonly"
              type="button"
              @click="editor.chain().focus().toggleStrike().run()"
              v-tooltip="translations.strikethrough">
              <i
                :class="prefixClass('fa fa-strikethrough')"
                aria-hidden="true" />
            </button>
            <div
              v-if="toolbar.insertAndDelete"
              :class="prefixClass('inline-block relative')">
              <button
                :class="[editor.isActive('insert') || editor.isActive('delete') ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
                :disabled="readonly"
                type="button"
                @click.stop="toggleSubMenu('diffMenu', !diffMenu.isOpen)"
                @keydown.tab.shift.exact="toggleSubMenu('diffMenu', false)">
                <dp-icon
                  class="align-text-top inline-block"
                  icon="highlighter" />
                <i :class="prefixClass('fa fa-caret-down')" />
              </button>
              <div
                v-if="diffMenu.isOpen"
                :class="prefixClass('button_submenu')">
                <button
                  v-for="(button, idx) in diffMenu.buttons"
                  :key="`diffMenu_${idx}`"
                  :class="{ 'is-active': editor.isActive(button.name) }"
                  type="button"
                  :disabled="readonly"
                  @keydown.tab.exact="() => { idx === diffMenu.buttons.length -1 ? toggleSubMenu('diffMenu', false) : null }"
                  @keydown.tab.shift.exact="() => { idx === 0 ? toggleSubMenu('diffMenu', false) : null }"
                  @click.stop="executeSubMenuButtonAction(button, 'diffMenu', true)">
                  {{ button.label }}
                </button>
              </div>
              &#10072;
            </div>
            <div
              v-else-if="toolbar.mark /* display the Button without fold out, if ony 'mark' is enabled */"
              :class="prefixClass('inline-block relative')">
              <button
                v-for="(button, idx) in diffMenu.buttons"
                :key="`diffMenu_${idx}`"
                :class="[editor.isActive(button.name) ? prefixClass('is-active') : '' , prefixClass('menubar__button')]"
                type="button"
                :disabled="readonly"
                :aria-label="button.label"
                v-tooltip="button.label"
                @keydown.tab.exact="() => { idx === diffMenu.buttons.length -1 ? toggleSubMenu('diffMenu', false) : null }"
                @keydown.tab.shift.exact="() => { idx === 0 ? toggleSubMenu('diffMenu', false) : null }"
                @click.stop="executeSubMenuButtonAction(button, 'diffMenu', true)">
                <dp-icon
                  class="align-text-top"
                  icon="highlighter" />
              </button>
            </div>
            <!-- lists -->
            <template v-if="toolbar.listButtons">
              <!-- Unordered List -->
              <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="[editor.isActive('bullet_list') ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
                type="button"
                :aria-label="translations.unorderedList"
                v-tooltip="translations.unorderedList"
                :disabled="readonly">
                <i :class="prefixClass('fa fa-list-ul')" />
              </button>
              <!-- Ordered List -->
              <button
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="[editor.isActive('ordered_list') ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
                type="button"
                :aria-label="translations.orderedList"
                v-tooltip="translations.orderedList"
                :disabled="readonly">
                <i :class="prefixClass('fa fa-list-ol')" />
              </button>
              &#10072;
            </template>
            <!--Heading Buttons - for each heading level in props a button will be rendered. We want to keep it
            flexible because the user should not always be able to define e.g. H1. It depends where the text should
            appear.-->
            <template v-if="toolbar.headings.length > 0">
              <button
                v-for="heading in toolbar.headings"
                :key="'heading_' + heading"
                type="button"
                :class="[editor.isActive('heading', { level: heading }) ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
                @click="editor.chain().focus().toggleHeading({ level: heading }).run()"
                v-tooltip="translations.headingLevel"
                :disabled="readonly">
                {{ `H${heading}` }}
              </button>
              &#10072;
            </template>
            <!-- Obscure text -->
            <button
              v-if="obscureEnabled"
              @click="editor.chain().focus().toggleObscure().run()"
              :class="[editor.isActive('obscure') ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
              type="button"
              v-tooltip="translations.obscureTitle"
              :disabled="readonly">
              <i
                :class="prefixClass('fa fa-pencil-square')"
                aria-hidden="true" />
            </button>
            <!--Add links-->
            <button
              v-if="toolbar.linkButton"
              @click.stop="showLinkPrompt(editor.commands.toggleLink, editor.getAttributes('customLink'))"
              :class="prefixClass('menubar__button')"
              type="button"
              v-tooltip="translations.link.editOrInsert">
              <i :class="prefixClass('fa fa-link')" />
            </button>
            <!-- Insert images-->
            <button
              v-if="toolbar.imageButton"
              @click.stop="openUploadModal(null)"
              :class="prefixClass('menubar__button')"
              type="button"
              v-tooltip="translations.insertImage"
              :disabled="readonly">
              <i :class="prefixClass('fa fa-picture-o')" />
            </button>
            <!-- Insert and edit tables -->
            <div
              v-if="toolbar.table"
              :class="prefixClass('inline-block relative')">
              <button
                :class="[tableMenu.isOpen ? prefixClass('is-active') : '', prefixClass('menubar__button')]"
                type="button"
                @click.stop="toggleSubMenu('tableMenu', !tableMenu.isOpen)"
                @keydown.tab.shift.exact="toggleSubMenu('tableMenu', false)"
                :disabled="readonly">
                <i :class="prefixClass('fa fa-table')" />
                <i :class="prefixClass('fa fa-caret-down')" />
              </button>
              <div
                v-if="tableMenu.isOpen"
                :class="prefixClass('button_submenu')">
                <button
                  v-for="(button, idx) in tableMenu.buttons"
                  :key="`tableMenu_${idx}`"
                  type="button"
                  :disabled="readonly"
                  @keydown.tab.exact="() => { idx === tableMenu.buttons.length -1 ? toggleSubMenu('tableMenu', false) : null }"
                  @keydown.tab.shift.exact="() => { idx === 0 ? toggleSubMenu('tableMenu', false) : null }"
                  @click.stop="executeSubMenuButtonAction(button, 'tableMenu')">
                  {{ button.label }}
                </button>
              </div>
            </div>
            <!-- Fullscreen -->
            <button
              v-if="toolbar.fullscreenButton"
              @click="fullscreen"
              :class="[isFullscreen ? prefixClass('is-active') : '', prefixClass('menubar__button float-right')]"
              type="button"
              :aria-label="translations.fullscreen"
              v-tooltip="translations.fullscreen">
              <i
                :class="prefixClass('fa fa-arrows-alt')"
                aria-hidden="true" />
            </button>
            <slot name="button" />
          </div>
          <editor-content
            v-if="editor"
            :data-cy="`editor${editorId}`"
            :editor="editor"
            :class="prefixClass('editor__content overflow-hidden')" />
          <!-- this hidden input is needed if we use this component without the inline-editing-wrapper TiptapEditText.vue,
          so we can save the text entered in the textarea via a form element -->
          <input
            v-if="hiddenInput !== ''"
            :data-dp-validate-if="dataDpValidateIf ? true : null"
            type="hidden"
            :id="hiddenInput"
            :data-dp-validate-error-fieldname="dataDpValidateErrorFieldname || null"
            :name="hiddenInput"
            :class="[required ? prefixClass('is-required') : '', prefixClass('tiptap__input--hidden')]"
            :data-dp-validate-maxlength="maxlength"
            :value="hiddenInputValue">
          <i
            v-if="!isFullscreen"
            aria-hidden="true"
            :class="prefixClass('fa fa-angle-down resizeVertical')"
            @mousedown="resizeVertically"
            draggable="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { de } from '../shared/translations'
import {
  Bold,
  BulletList,
  Document,
  HardBreak,
  Heading,
  History,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  Underline
} from './libs/tiptapExtensions'
import { CleanHtml, Tooltip } from '~/directives'
import {
  Editor, // Wrapper for prosemirror state
  EditorContent, // Renderless content element
} from '@tiptap/vue-3'
import {
  buildSuggestion,
  CustomDelete,
  CustomImage,
  CustomInsert,
  CustomLink,
  CustomMark,
  InsertAtCursorPos,
  Obscure,
  Mention
} from './libs/customExtensions'
import DpIcon from '../DpIcon/DpIcon'
import DpLinkModal from './DpLinkModal'
import DpUploadModal from './DpUploadModal'
import DpResizableImage from './DpResizableImage'
import { handleWordPaste } from './libs/handleWordPaste'
import { maxlengthHint } from '~/utils/'
import { prefixClassMixin } from '~/mixins'
import { v4 as uuid } from 'uuid'

export default {
  name: 'DpEditor',

  components: {
    DpIcon,
    EditorContent,
    DpLinkModal,
    DpResizableImage,
    DpUploadModal
  },

  directives: {
    cleanhtml: CleanHtml,
    tooltip: Tooltip
  },

  mixins: [prefixClassMixin],

  props: {
    /**
     * The Tus endpoint requires basicAuth to be added to the file header.
     */
    basicAuth: {
      type: String,
      required: false,
      default: ''
    },

    dataDpValidateErrorFieldname: {
      type: String,
      required: false,
      default: ''
    },

    dataDpValidateIf: {
      type: String,
      default: '',
      required: false
    },

    /**
     * Only needed for testing purposes with data-cy
     */
    editorId: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Global path for file uploader endpoint.
     */
    tusEndpoint: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * To send data with submit form action we sometimes need to have a hidden input with tiptap's content. If the
     * hidden input should be added, the prop should be a string with input name (e.g. r_name)
     */
    hiddenInput: {
      type: String,
      required: false,
      default: ''
    },

    required: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Defaults will be set in this.toolbar:
     * {
     *    headings: [], # Array of numbers 1-6
     *    imageButton: false,
     *    insertAndDelete: false,
     *    fullscreenButton: true,
     *    linkButton: false,
     *    listButtons: true,
     *    mark: false,
     *    strikethrough: false,
     *    table: false,
     *    textDecoration: true
     * }
     *
     * and can be overwritten
     */
    toolbarItems: {
      required: false,
      type: Object,
      default: () => ({})
    },

    maxlength: {
      type: [Number, null],
      default: null
    },

    /**
     * Set to true if you want to use the 'obscure text' button
     */
    obscure: {
      type: Boolean,
      required: false,
      default: false
    },

    readonly: {
      required: false,
      default: false,
      type: Boolean
    },

    /**
     * getFileByHash: (Optional) function that receives a file hash as parameter
     * and returns a route to that file. Used for displaying images.
     */
    routes: {
      type: Object,
      required: false,
      default: () => ({}),
      validator: (prop) => {
        return Object.keys(prop).every(key => [
          'getFileByHash'
        ].includes(key))
      }
    },

    /**
     * Pass in an Array of suggestions if you would like to use the suggestion plugin in tiptap.
     */
    suggestions: {
      type: Array,
      validator: (value) => {
        const suggestionGroupSchema = {
          matcher: {
            char: '@|$|#', // A single char that should trigger a suggestion
            allowSpaces: true || false,
            startOfLine: true || false
          },
          suggestions: [{ id: 'a unique id', name: 'a string that should be displayed when inserting the suggestion' }]
        }
        return Array.isArray(value) && value.filter(suggestionGroup => {
          let isValid = suggestionGroup.matcher && suggestionGroup.suggestions
          isValid = isValid && typeof suggestionGroup.matcher.char === typeof suggestionGroupSchema.matcher.char
          isValid = isValid && typeof suggestionGroup.matcher.allowSpaces === typeof suggestionGroupSchema.matcher.allowSpaces
          isValid = isValid && typeof suggestionGroup.matcher.startOfLine === typeof suggestionGroupSchema.matcher.startOfLine
          isValid = isValid && suggestionGroup.suggestions.filter(suggestion => {
            return typeof suggestion.id === typeof suggestionGroupSchema.suggestions[0].id && typeof suggestion.name === typeof suggestionGroupSchema.suggestions[0].name
          }).length === suggestionGroup.suggestions.length
          return isValid
        }).length === value.length
      },
      required: false,
      default: () => ([])
    },

    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      currentValue: '',
      diffMenu: {
        isOpen: false,
        buttons: []
      },
      editingImage: null,
      editor: null,
      editorHeight: '',
      isDiffMenuOpen: false,
      isFullscreen: false,
      isTableMenuOpen: false,
      linkUrl: '',
      // We have to check if we have a hidden input and a form, then we have to update the field manually. For Api-requests its not neccessary
      manuallyResetForm: true,
      tableMenu: {
        isOpen: false,
        buttons: [
          {
            label: de.editor.table.create,
            command: () => this.editor.commands.insertTable({ rowsCount: 3, colsCount: 3, withHeaderRow: false }),
            name: 'createTable'
          },
          {
            label: de.editor.table.delete,
            command: () => this.editor.commands.deleteTable(),
            name: 'deleteTable'
          },
          {
            label: de.editor.table.addColumnBefore,
            command: () => this.editor.commands.addColumnBefore(),
            name: 'addColumnBefore'
          },
          {
            label: de.editor.table.addColumnAfter,
            command: () => this.editor.commands.addColumnAfter(),
            name: 'addColumnAfter'

          },
          {
            label: de.editor.table.deleteColumn,
            command: () => this.editor.commands.deleteColumn(),
            name: 'deleteColumn'
          },
          {
            label: de.editor.table.addRowBefore,
            command: () => this.editor.commands.addRowBefore(),
            name: 'addRowBefore'
          },
          {
            label: de.editor.table.addRowAfter,
            command: () => this.editor.commands.addRowAfter(),
            name: 'addRowAfter'
          },
          {
            label: de.editor.table.deleteRow,
            command: () => this.editor.commands.deleteRow(),
            name: 'deleteRow'
          },
          {
            label: de.editor.table.toggleCellMerge,
            command: () => this.editor.commands.mergeOrSplit(),
            name: 'toggleCellMerge'
          }
        ]
      },
      toolbar: Object.assign({
        /**
         * Array with numbers 1-6 defining which heading-buttons we want to show
         */
        headings: [],
        /**
         * If true, the button to add images will be shown and the initial text will be scanned for img placeholders which will be then replaced by actual images.
         */
        imageButton: false,
        /**
         * Enables menu buttons to mark text as deleted and inserted.
         * The buttons will wrap the current text selection with a `del` or `ins` element,
         * enabling users to indicate content changes in relation to a prior content version.
         * This feature is currently only used for planning document paragraphs.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
         */
        insertAndDelete: false,
        fullscreenButton: true,
        /**
         * Define if a button to add links should be visible in menu
         */
        linkButton: false,
        /**
         * Define if a button to add ordered/unordered list should be visible in menu
         */
        listButtons: true,
        /**
         * Enables a menu button to highlight/mark text.
         * This will wrap the current text selection with a `mark` element,
         * enabling users to enrich content with a semantic element to highlight text.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
         */
        mark: false,
        obscure: this.obscure,
        /**
         * Enables a menu button to strike out text.
         * This will wrap the current text selection with a `s` element, enabling users
         * to enrich content with a semantic element to mark text as no longer relevant.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
         */
        strikethrough: false,
        /**
         * Set to true if you want table-insert button
         */
        table: false,
        textDecoration: true
      }, this.toolbarItems),
      translations: {
        ...de.editor,
        headingLevel: de.editor.headingLevel({ level: this.heading }),
        insertImage: de.image.insert,
        obscureTitle: de.obscure.title
      }
    }
  },

  computed: {
    counterText () {
      return maxlengthHint(this.hiddenInputValue.length, this.maxlength)
    },

    hiddenInputValue () {
      // The blank tiptap editor still contains an empty p element, which shall not be passed into hidden input.
      return (this.currentValue.replace('<p></p>', '') === '') ? '' : this.currentValue
    },

    obscureEnabled () {
      return this.toolbar.obscure
    }
  },

  watch: {
    value (newValue) {
      if (!this.editor.focused && this.editor.getHTML() !== newValue) {
        this.currentValue = newValue
        this.editor.commands.setContent(newValue, false)
      }
    },

    /**
     * The readonly watcher provides the dynamic enabling/disabling of the editor.
     * Also mentioned in the GitHub issue: https://github.com/ueberdosis/tiptap/issues/111
     */
    readonly () {
      this.editor.setOptions({ editable: !this.readonly })
    }
  },

  methods: {
    addAltTextToImage (text) {
      this.$root.$emit('update-image:' + this.editingImage, { alt: text })
      this.resetEditingImage()
      this.emitValue()
    },

    appendText (text) {
      let newText

      // Check if any of the two texts is wrapped in a 'p' tag to avoid inserting too many newlines
      const isAnyNodeBlock = this.startsWithTag(this.currentValue, 'p') || this.startsWithTag(text, 'p')

      // If editor is empty, insert only text; if editor contains text, insert empty paragraph + text
      if (this.currentValue === 'k.A.' || this.currentValue === '') {
        newText = text
      } else if (this.currentValue !== 'k.A' && this.currentValue !== '' && isAnyNodeBlock) {
        newText = this.currentValue + text
      } else if (this.currentValue !== 'k.A' && this.currentValue !== '') {
        newText = this.currentValue + '<br>' + text
      }

      this.editor.commands.setContent(newText)
      this.currentValue = newText
      this.$emit('input', this.currentValue)
    },

    collectExtensions () {
      const extensions = [
        Document,
        Paragraph,
        Text,
        History,
        HardBreak,
        Heading.configure({ levels: this.toolbar.headings })
      ]

      extensions.push(InsertAtCursorPos)

      if (this.suggestions.length > 0) {
        this.suggestions.forEach(suggestion => {
          extensions.push(Mention.configure({
            HTMLAttributes: {
              class: 'suggestion__node'
            },
            renderLabel({ node }) {
              return suggestion.matcher.char + node.attrs.label
            },
            suggestion: buildSuggestion(suggestion)
          }))
        })
      }

      if (this.toolbar.headings.length > 0) {
        extensions.push(Heading.configure({ levels: this.toolbar.headings }))
      }

      if (this.toolbar.imageButton) {
        extensions.push(CustomImage)
      }

      if (this.toolbar.linkButton) {
        extensions.push(CustomLink.configure({ openOnClick: false }))
      }

      if (this.toolbar.obscure) {
        extensions.push(Obscure)
      }

      if (this.toolbar.listButtons) {
        extensions.push(BulletList)
        extensions.push(OrderedList)
        extensions.push(ListItem)
      }

      if (this.toolbar.table) {
        extensions.push(Table.configure({
          resizable: true
        }))
        extensions.push(TableHeader)
        extensions.push(TableCell)
        extensions.push(TableRow)
      }

      if (this.toolbar.insertAndDelete) {
        extensions.push(CustomDelete)
        extensions.push(CustomInsert)

        this.diffMenu.buttons = [
          {
            label: de.editor.mark.insert,
            command: () => this.editor.chain().focus().toggleInsert().run(),
            name: 'insert'
          },
          {
            label: de.editor.mark.delete,
            command: () => this.editor.chain().focus().toggleDelete().run(),
            name: 'delete'
          }
        ]
      }

      if (this.toolbar.mark) {
        extensions.push(CustomMark)

        this.diffMenu.buttons.unshift({
          label: de.editor.mark.element,
          command: () => this.editor.chain().focus().toggleMarkText().run(),
          name: 'mark'
        })
      }

      if (this.toolbar.textDecoration) {
        extensions.push(Bold)
        extensions.push(Italic)
        extensions.push(Underline)
      }

      if (this.toolbar.strikethrough) {
        extensions.push(Strike)
      }

      return extensions
    },

    async cut () {
      const selection = window.getSelection()

      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(selection.toString())
          selection.deleteFromDocument()
        } catch (err) {
          console.error(err)
        }
      } else {
        // If Browser don't support Clipboard API.
        try {
          document.execCommand('cut')
          selection.deleteFromDocument()
        } catch (err) {
          console.error(err)
        }
      }
    },

    executeSubMenuButtonAction (button, menu, activateOne = false) {
      // If only one button in submenu can be enabled, deactivate the rest
      if (activateOne) {
        this[menu].buttons.forEach(subMenuButton => {
          if (this.editor.isActive(subMenuButton.name) || subMenuButton === button) {
            subMenuButton.command(this.editor.commands)
          }
        })
      } else {
        // If we just want to activate the clicked button without deactivating the other buttons in the submenu
        button.command(this.editor.commands)
      }

      this[menu].isOpen = false
    },

    fullscreen (e) {
      const editor = e.target.parentElement.parentElement.parentElement.querySelector('.tiptap .editor__content')
      if (this.isFullscreen === false && editor.hasAttribute('style')) {
        this.editorHeight = editor.getAttribute('style')
        editor.removeAttribute('style')
      }

      this.isFullscreen = !this.isFullscreen

      if (this.isFullscreen === false && this.editorHeight !== '') {
        editor.setAttribute('style', this.editorHeight)
      }
    },

    getLinkMark (node) {
      return node.marks && node.marks.find(mark => mark.type.name === 'customLink')
    },

    handleInsertText (text) {
      text = text.replace(/\n/g, '<br>')

      // If user hasn't clicked into tiptap editor yet
      if (this.editor.view.input.lastClick.x === 0 && this.editor.view.input.lastClick.y === 0) {
        this.appendText(text)
      } else { // If user has clicked into tiptap editor at some point, but editor may currently not have focus
        this.insertTextAtCursorPos(text)
      }
    },

    insertTextAtCursorPos (text) {
      // Remove p tags so text is inserted without adding new paragraph
      if (this.startsWithTag(text, 'p')) {
        text = text.slice(3, -4)
      }

      this.editor.commands.insertContent(text)
      this.currentValue = this.editor.getHTML()
    },

    insertImage (url, alt) {
      this.editor.commands.insertImage({ src: url, alt: alt })
    },

    insertUrl (linkUrl, newTab, linkText) {
      if (linkUrl === null || linkUrl === '') {
        this.editor.commands.unsetCustomLink({ extendEmptyMarkRange: true })
      } else  if (linkText !== '') {
        const selection = this.editor.view.state.selection

        this.editor.commands.insertContent({
          type: selection.node ? selection.node.type.name : 'text',
          text: linkText,
          marks: [
            {
              type: 'customLink',
              attrs: {
                href: linkUrl,
                target: newTab ? '_blank' : null
              }
            }
          ]
        })
      }
    },

    openUploadModal (data) {
      this.$refs.uploadModal.toggleModal(data)
    },

    prepareInitText () {
      this.currentValue = this.replaceLinebreaks(this.currentValue)
      this.currentValue = this.replacePlaceholdersWithImages(this.currentValue)
    },

    replaceLinebreaks (text) {
      let returnText = text
      returnText = returnText.replace(/<\/p>[\n\r\s\\n\\r]*?<p>/g, '</p><p>')
      returnText = returnText.replace(/<ul>[\n\r\s\\n\\r]*?<li>/g, '<ul><li>')
      return returnText.replace(/<\/li>[\n\r\s\\n\\r]*?<li>/g, '</li><li>')
    },

    replacePlaceholdersWithImages (text = this.currentValue) {
      const placeholder = de.image.placeholder
      const placeholderText = placeholder.startsWith('[') && placeholder.endsWith(']') ? placeholder.slice(1, -1) : placeholder
      const regex = new RegExp(`(\\[${placeholderText}\\].*?-->)`, 'gm')
      try {
        return text.replace(regex, (match, p1) => {
          const altText = p1.match(/{([^}]*?)}/)[1] === de.image.alt.placeholder ? '' : p1.match(/{([^}]*?)}/)[1]
          const placeholder = p1.match(/<!-- (.*?) -->/)[1]
          const imageHash = placeholder.substr(7, 36)
          const imageWidth = placeholder.match(/width=(\d*?)&/)[1]
          const imageHeight = placeholder.match(/height=(\d*?)$/)[1]
          return `<img src="${this.routes.getFileByHash(imageHash)}" width="${imageWidth}" height="${imageHeight}" alt="${altText}">`
        })
      } catch (e) {
        return text
      }
    },

    resetEditingImage () {
      this.editingImage = null
    },

    resizeVertically (e) {
      const editor = e.target.parentElement.querySelector('.tiptap .editor__content')

      e.preventDefault()
      const originalHeight = parseFloat(getComputedStyle(editor, null).getPropertyValue('height').replace('px', ''))
      const originalMouseY = e.pageY
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)

      function resize (ev) {
        const height = originalHeight + (ev.pageY - originalMouseY)
        editor.style.height = height + 'px'
      }

      function stopResize () {
        window.removeEventListener('mousemove', resize)
      }
    },

    resetEditor () {
      this.editor.commands.setContent('')
    },

    setSelectionByEditor (nodeBefore, nodeAfter, attrs) {
      const tr = this.editor.view.state.tr

      if (nodeBefore) {
        const linkMark = this.getLinkMark(nodeBefore)
        if (linkMark && linkMark.attrs.href === attrs.href) {
          this.editor.commands.setTextSelection({ from: (tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize), to: tr.selection.anchor })
        }
      }

      if (nodeAfter) {
        const linkMark = this.getLinkMark(nodeAfter)
        if (linkMark && linkMark.attrs.href === attrs.href) {
          this.editor.commands.setTextSelection({ from: tr.selection.anchor, to: (tr.selection.anchor + tr.selection.$anchor.nodeAfter.nodeSize) })
        }
      }
    },

    transformObscureTag (value) {
      const regex = new RegExp(`<span class="${this.prefixClass('u-obscure')}">(.*?)<\\/span>`, 'g')

      return value.replace(regex, '<dp-obscure>$1</dp-obscure>')
    },

    emitValue () {
      this.currentValue = this.editor.getHTML()
      const isEmpty = (this.currentValue.split('<p>').join('').split('</p>').join('').trim()) === ''

      this.$emit('input', isEmpty ? '' : this.currentValue)
    },

    showLinkPrompt (_command, attrs) {
      this.linkUrl = attrs.href ? attrs.href : ''
      const selection = this.editor.view.state.tr.selection

      if (attrs.href) {
        // If only a part of existing link text is selected, we want to add the rest of the link to the selection so that the user edits the whole link and not only part of it. To do that we take node before and after selection and check if the href attribute of these nodes is the same as href of the user's selection.
        const selectToLeft = selection.anchor > selection.head

        const selectionBeginning = selectToLeft ? '$head' : '$anchor'
        const selectionEnd = selectToLeft ? '$anchor' : '$head'

        const nodeBefore = selection[selectionBeginning].nodeBefore
        const nodeAfter = selection[selectionEnd].nodeAfter

        this.setSelectionByEditor(nodeBefore, nodeAfter, attrs)
      }
      const selectionText = this.editor.state.doc.textBetween(this.editor.view.state.tr.selection.from, this.editor.view.state.tr.selection.to, ' ')
      this.$refs.linkModal.toggleModal(this.linkUrl, selectionText, attrs.target)
    },

    startsWithTag (htmlString, tag) {
      const el = document.createElement('div')
      el.innerHTML = htmlString
      const firstChild = el.firstChild && el.firstChild.nodeName
      return firstChild === tag.toUpperCase()
    },

    toggleSubMenu (menu, isOpen) {
      this[menu].isOpen = isOpen

      if (isOpen === true) {
        const menuToClose = menu === 'tableMenu' ? 'diffMenu' : 'tableMenu'
        this[menuToClose].isOpen = false
        const closeMenu = () => {
          this[menu].isOpen = false
          document.removeEventListener('click', closeMenu)
        }
        document.addEventListener('click', closeMenu)
      }
    }
  },

  created () {
    this.currentValue = this.value
    this.prepareInitText()
  },

  mounted () {
    this.editor = new Editor({
      id: uuid(),
      editable: !this.readonly,
      extensions: this.collectExtensions(),
      content: this.currentValue,
      disableInputRules: true,
      disablePasteRules: true,
      onUpdate: () => {
        this.emitValue()
      },
      editorProps: {
        attributes: {
          role: 'textbox'
        },

        handleDrop: (_view, _event, _slice, moved) => {
          if (!moved) {
            return true
          }
        },

        transformPastedHTML: (slice) => {
          /*
           * Due to the strange Html format from Word clipbord, lists would not be displayed properly,
           * so we have to handle paste from word manually.
           */
          slice = handleWordPaste(slice)
          // Handle obscure tags - to handle the paste of fully obscured strings we need to overwrite the default paste behaviour and before the content is pasted we replace the obscure-styles with 'u-obscure' class
          const obscureClass = this.prefixClass('u-obscure')
          const obscureColor = getColorFromCSS(obscureClass)
          let returnContent = slice

          if (slice.includes(`span style="color: ${obscureColor}`)) {
            returnContent = slice.replace(/(?:<meta [^>]*>\s*<span [^>]*>\s*)([^<]*?)(?:\s*<\/span>)/g, '$1')
            returnContent = '<span class="' + obscureClass + '">' + returnContent + '</span>'
          }

          // Strip anchor tags if link functionality is not active
          if (this.toolbar.linkButton === false) {
            returnContent = returnContent.replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
          }

          // Strip img tags from pasted and dropped content
          returnContent = returnContent.replace(/<img.*?>/g, '')

          returnContent = this.transformObscureTag(returnContent)

          return returnContent
        }
      },

      onInit: ({ view }) => {
        this.currentValue = this.transformObscureTag(this.editor.getHTML())

        view._props.handleScrollToSelection = customHandleScrollToSelection
      }
    })

    this.$root.$on('open-image-alt-modal', ({ event, imgId, editorId }) => {
      if (this.editor.options.id !== editorId) {
        return
      }

      this.editingImage = imgId
      this.openUploadModal({ editAltOnly: true, currentAlt: event.target.getAttribute('alt'), imgSrc: event.target.getAttribute('src') })
    })
    /*
     * On form-reset the editor has to be cleared manually.
     * the inputs doesn't fire events in this case.
     * in the data methods its to early to get the elements
     */
    this.manuallyResetForm = (this.hiddenInput !== '' && this.$el.closest('form') !== null)
    if (this.manuallyResetForm) {
      this.$el.closest('form').addEventListener('reset', this.resetEditor)
    }

    if (this.toolbar.imageButton ^ !!this.tusEndpoint) {
      console.warn(`DpEditor is called with only one of toolbar.imageButton or tusEndpoint set. Both must be used.`)
    }
  },

  beforeUnmount () {
    if (this.editor) {
      this.editor.destroy()
      if (this.manuallyResetForm) {
        this.$el.closest('form').removeEventListener('reset', this.resetEditor)
      }
    }
  }
}

// Custom handling of scrolling after paste
function windowRect (win) {
  return {
    left: 0,
    right: win.innerWidth,
    top: 0,
    bottom: win.innerHeight
  }
}
function getSide (value, side) {
  return typeof value === 'number' ? value : value[side]
}
const parentNode = function (node) {
  const parent = node.parentNode
  return parent && parent.nodeType === 11 ? parent.host : parent
}

function customHandleScrollToSelection (view, rect = view.coordsAtPos(view.state.selection.head), startDOM = view.docView.dom) {
  const scrollThreshold = view.someProp('scrollThreshold') || 0
  const scrollMargin = view.someProp('scrollMargin') || 5
  const doc = view.dom.ownerDocument
  const win = doc.defaultView

  for (let parent = startDOM || view.dom; ; parent = parentNode(parent)) {
    if (!parent) break
    if (parent.nodeType !== 1) continue

    const parentStyle = window.getComputedStyle(parent, null)
    const atTop = (parentStyle['overflow-y'] === 'auto' || parentStyle['overflow-y'] === 'scroll' || parent.nodeType !== 1)
    const bounding = atTop ? windowRect(win) : parent.getBoundingClientRect()
    let moveX = 0
    let moveY = 0

    if (rect.top < bounding.top + getSide(scrollThreshold, 'top')) {
      moveY = -(bounding.top - rect.top + getSide(scrollMargin, 'top'))
    } else if (rect.bottom > bounding.bottom - getSide(scrollThreshold, 'bottom')) {
      moveY = rect.bottom - bounding.bottom + getSide(scrollMargin, 'bottom')
    }

    if (rect.left < bounding.left + getSide(scrollThreshold, 'left')) {
      moveX = -(bounding.left - rect.left + getSide(scrollMargin, 'left'))
    } else if (rect.right > bounding.right - getSide(scrollThreshold, 'right')) {
      moveX = rect.right - bounding.right + getSide(scrollMargin, 'right')
    }

    if (moveY) parent.scrollTop += moveY
    if (moveX) parent.scrollLeft += moveX

    if (atTop) break
  }
}

// The function below is used to get the font color of obscured elements to be able to change the HTML on copy/paste of fully-obscured strings (used above in transformPastedHTML)
function getColorFromCSS (className) {
  const body = document.getElementsByTagName('body')[0]
  const div = document.createElement('div')
  div.className = className
  div.id = 'tmpIdToGetColor'
  body.appendChild(div)

  const tmpDiv = document.getElementById('tmpIdToGetColor')
  const color = window.getComputedStyle(tmpDiv).getPropertyValue('color')

  body.removeChild(tmpDiv)

  return color
}
</script>
