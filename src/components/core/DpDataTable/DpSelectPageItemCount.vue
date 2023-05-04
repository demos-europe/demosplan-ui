<template>
  <div>
    <select
      id="item-count"
      class="o-form__control-select width-auto u-mr-0_25"
      @change="e => $emit('changed-count', parseInt(e.target.value))">
      <option
        v-for="option in pageCountOptions"
        :value="option"
        :selected="option === currentItemCount">
        {{ option }}
      </option>
    </select>
    <label
      for="item-count"
      class="display--inline u-mb-0">
      {{ labelText }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'DpSelectPageItemCount',

  props: {
    currentItemCount: {
      type: Number,
      required: true
    },

    pageCountOptions: {
      type: Array,
      required: true
    },

    labelText: {
      type: String,
      required: true
    }
  }
}
</script>
