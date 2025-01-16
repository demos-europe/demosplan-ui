<template>
  <div>
    <ul
      v-if="Object.keys(entries).length > 0"
      class="u-mb-0_75">
      <li
        v-for="(entry, index) in entries"
        :key="index"
        :data-cy="`${dataCy}:entryItem`">
        <!--both v-bind below are important and should not be removed (one is for the source data to be passed from parent component, second is for when the source data (entries) is an object)-->
        <slot
          name="list"
          v-bind="entry"
          :entry="entry"
          :index="index" />
        <span
          v-if="true === hasPermissionToEdit">
          <dp-button
            class="ml-1"
            :data-cy="`${dataCy}:updateEntry`"
            hide-text
            icon="edit"
            :text="translationKeys.update"
            variant="subtle"
            @click.prevent="showUpdateForm(index)" />
          <dp-button
            class="-ml-1.5"
            :data-cy="`${dataCy}:deleteEntry`"
            hide-text
            icon="delete"
            :text="translationKeys.delete"
            variant="subtle"
            @click.prevent="deleteEntry(index)" />
        </span>
      </li>
    </ul>
    <div
      v-else
      class="color--grey u-mb-0_5">
      {{ translationKeys.noEntries }}
    </div>

    <div v-if="true === isFormVisible && true === hasPermissionToEdit">
      <div class="u-mb-0_5">
        <slot name="form" />
      </div>

      <dp-button
        class="btn btn--primary"
        :data-cy="currentlyUpdating !== '' ? `${dataCy}:saveEntry` : `${dataCy}:addEntry`"
        :text="currentlyUpdating !== '' ? translationKeys.update : translationKeys.add"
        @click.prevent="saveEntry" />

      <dp-button
        class="btn btn--secondary u-ml-0_5"
        :data-cy="`${dataCy}:abort`"
        :text="translationKeys.abort"
        @click.prevent="resetForm" />
    </div>

    <dp-button
      v-if="false === isFormVisible && true === hasPermissionToEdit"
      class="btn btn--primary"
      :data-cy="`${dataCy}:showInput`"
      :text="translationKeys.new"
      @click.prevent="showNewForm()" />
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'
import DpButton from '~/components/DpButton'

export default {
  name: 'DpEditableList',

  components: {
    DpButton
  },

  props: {
    dataCy: {
      type: String,
      required: false,
      default: 'editableList'
    },

    entries: {
      required: true,
      type: [Array, Object],
      default: () => { return [] }
    },

    translationKeys: {
      required: false,
      type: Object,
      default: () => {
        return {
          new: de.operations.new,
          add: de.operations.add,
          abort: de.operations.abort,
          update: de.operations.update,
          noEntries: de.operations.none,
          delete: de.operations.delete
        }
      }
    },

    hasPermissionToEdit: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isFormVisible: false,
      currentlyUpdating: ''
    }
  },

  methods: {
    toggleFormVisibility (visibility) {
      this.isFormVisible = visibility
    },

    showNewForm () {
      this.toggleFormVisibility(true)
      this.currentlyUpdating = ''
      this.$emit('reset')
    },

    saveEntry () {
      const entryToSave = this.currentlyUpdating !== '' ? this.currentlyUpdating : 'new'
      this.$emit('saveEntry', entryToSave)
    },

    resetForm () {
      this.toggleFormVisibility(false)
      this.currentlyUpdating = ''
      this.$emit('reset')
    },

    showUpdateForm (index) {
      this.toggleFormVisibility(true)
      this.currentlyUpdating = index
      this.$parent.$emit('showUpdateForm', index)
    },

    deleteEntry (index) {
      this.toggleFormVisibility(false)
      this.currentlyUpdating = ''
      this.$parent.$emit('delete', index)
    }
  }
}
</script>
