<template>
  <dp-modal
    ref="linkModal"
    content-classes="u-1-of-3"
    data-dp-validate="linkModal"
    @modal:toggled="setVisible">
    <template>
      <h3>
        {{ hasLink ? translations.linkEdit : translations.linkInsert }}
      </h3>
      <div class="space-stack-m">
        <dp-input
          id="link_text"
          v-model="text"
          :label="{
            text: translations.linkText
          }"
          :required="isVisible" />
        <dp-input
          id="link_url"
          v-model="url"
          :label="{
            hint: translations.linkHint,
            text: translations.url
          }"
          :pattern="isVisible === true ? '(^https?://.*|^//.*|^mailto:.*)' : null"
          :required="isVisible"
          type="url" />
        <dp-checkbox
          id="newTab"
          v-model="newTab"
          :label="{
            text: translations.newTab
          }" />
        <dp-button-row
          class="u-mt"
          primary
          :primary-text="translations.insert"
          secondary
          :secondary-text="translations.remove"
          @primary-action="dpValidateAction('linkModal', () => emitAndClose('insert'), false)"
          @secondary-action="emitAndClose('remove')" />
      </div>
    </template>
  </dp-modal>
</template>

<script>
import { de } from '../shared/translations'
import DpButtonRow from '~/components/DpButtonRow'
import DpCheckbox from '~/components/DpCheckbox'
import DpInput from '~/components/DpInput'
import DpModal from '~/components/DpModal'
import { dpValidateMixin } from '../../mixins'

export default {
  name: 'DpLinkModal',

  components: {
    DpButtonRow,
    DpCheckbox,
    DpInput,
    DpModal
  },

  mixins: [dpValidateMixin],

  data () {
    return {
      initUrl: '',
      isVisible: false,
      newTab: false,
      text: '',
      translations: {
        insert: de.operations.insert,
        linkEdit: de.editor.link.edit,
        linkHint: de.editor.link.hint,
        linkInsert: de.editor.link.insert,
        linkText: de.link.text,
        remove: de.operations.remove,
        newTab: de.tab.openNew,
        url: de.url
      },
      url: ''
    }
  },

  computed: {
    hasLink () {
      return this.initUrl !== ''
    }
  },

  methods: {
    emitAndClose (value) {
      this.$emit('insert', (value === 'insert' ? this.url : null), this.newTab, this.text)
      this.toggleModal()
    },

    setVisible (isOpenModal) {
      this.isVisible = isOpenModal
    },

    toggleModal (initUrl, textSelection, newTab) {
      this.$refs.linkModal.toggle()
      if (this.isVisible) {
        this.initUrl = initUrl
        this.url = initUrl
        this.text = textSelection
        this.newTab = newTab === '_blank'
      } else {
        this.url = ''
        this.text = ''
        this.newTab = false
      }
    }
  }
}
</script>
