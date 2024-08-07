<template>
  <div>
    <ul
      class="u-mb-0_75"
      v-if="entries.length > 0 || Object.keys(entries).length > 0">
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
          <button
            @click.prevent="showUpdateForm(index)"
            :aria-label="translationKeys.update"
            class="btn-icns u-m-0 u-ml-0_5"
            :data-cy="`${dataCy}:updateEntry`">
            <i
              class="fa fa-pencil"
              aria-hidden="true" />
          </button>
          <button
            @click.prevent="deleteEntry(index)"
            :aria-label="translationKeys.delete"
            class="btn-icns u-m-0 u-pl-0"
            :data-cy="`${dataCy}:deleteEntry`">
            <i
              class="fa fa-trash"
              aria-hidden="true" />
          </button>
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

      <button
        @click.prevent="saveEntry"
        class="btn btn--primary"
        :data-cy="currentlyUpdating !== '' ? `${dataCy}:saveEntry` : `${dataCy}:addEntry`">
        {{ currentlyUpdating !== '' ? translationKeys.update : translationKeys.add }}
      </button>

      <button
        @click.prevent="resetForm"
        class="btn btn--secondary u-ml-0_5"
        :data-cy="`${dataCy}:abort`">
        {{ translationKeys.abort }}
      </button>
    </div>

    <button
      @click.prevent="showNewForm()"
      class="btn btn--primary"
      v-if="false === isFormVisible && true === hasPermissionToEdit"
      :data-cy="`${dataCy}:showInput`">
      {{ translationKeys.new }}
    </button>
  </div>
</template>

<script>
import { de } from '~/components/shared/translations'

export default {
  name: 'DpEditableList',
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
