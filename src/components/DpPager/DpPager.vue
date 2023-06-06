<template>
  <div class="c-pager__dropdown">
    <label
      class="c-pager__dropdown-label u-m-0 u-p-0 weight--normal display--inline-block"
      :aria-label="Translator.trans('pager.amount.multiple.label', { results: totalItems, items: Translator.trans('pager.amount.multiple.items') })">
        <dp-sliding-pagination
          v-if="totalItems > Math.min(...limits)"
          class="display--inline-block"
          :current="currentPage"
          :nonSlidingSize="3"
          :slidingEndingSize="1"
          :slidingWindowSize="1"
          :total="totalPages || 1"
          @page-change="handlePageChange" />
      <div
        class="display--inline-block"
        v-if="totalItems > Math.min(...limits)">
        <dp-multiselect
          v-model="itemsPerPage"
          class="display--inline-block"
          :options="filteredLimits"
          :searchable="false"
          selected-label=""
          @select="handleSizeChange"/>
      </div>
      <span v-else>{{ totalItems }}</span>
      <span aria-hidden="true">
        {{ Translator.trans('pager.amount.multiple.of') }}
        <span data-cy="totalItems">{{ totalItems }}</span>
        {{ Translator.trans('pager.amount.multiple.items') }}
      </span>
    </label>
  </div>
</template>

<script>
import DpMultiselect from '../DpMultiselect/DpMultiselect'
import DpSlidingPagination from '../DpSlidingPagination/DpSlidingPagination'

export default {
  name: 'DpPager',

  components: {
    DpSlidingPagination,
    DpMultiselect
  },

  props: {
    currentPage: {
      required: false,
      type: Number,
      default: 1
    },

    totalItems: {
      required: false,
      type: Number,
      default: 1
    },

    totalPages: {
      required: false,
      type: Number,
      default: 1
    },

    perPage: {
      required: false,
      type: Number,
      default: 1
    },

    limits: {
      required: false,
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      itemsPerPage: this.perPage <= this.totalItems ? this.perPage : this.totalItems
    }
  },

  computed: {
    filteredLimits () {
      const filtered = this.limits.filter(limit => limit <= this.totalItems)

      if (filtered.length < this.limits.length && this.totalItems > filtered[filtered.length - 1]) {
        filtered.push(this.totalItems)
      }

      if (filtered.includes(this.itemsPerPage) === false) {
        filtered.push(this.itemsPerPage)
      }
      filtered.sort((a, b) => a - b)

      return filtered
    }
  },

  methods: {
    handlePageChange (newPage) {
      this.$emit('page-change', newPage)
    },

    handleSizeChange (selectedOption) {
      this.$emit('size-change', parseInt(selectedOption))
    }
  }
}
</script>
