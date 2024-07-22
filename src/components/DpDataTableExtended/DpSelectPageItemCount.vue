<template>
  <div>
    <select
      :id="selectId"
      class="o-form__control-select w-auto u-mr-0_25"
      data-cy="selectPageMenu"
      @change="e => $emit('changed-count', parseInt(e.target.value))">
      <option
        v-for="option in pageCountOptions"
        :data-cy="`selectPageItem:${option}`"
        :value="option"
        :selected="option === currentItemCount">
        {{ option }}
      </option>
    </select>
    <label
      :for="selectId"
      class="inline u-mb-0">
      {{ labelText }}
    </label>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  name: 'DpSelectPageItemCount',

  props: {
    currentItemCount: {
      type: Number,
      required: true
    },

    labelText: {
     type: String,
     required: true
    },

    pageCountOptions: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      selectId: uuid()
    }
  }
}
</script>
